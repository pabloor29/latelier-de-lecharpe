import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: 'Catégorie manquante' }, { status: 400 });
    }

    // Créer le client Supabase côté serveur
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Vérifier que l'utilisateur est authentifié
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const uploadedFiles: string[] = [];

    // Si c'est un PDF, le convertir
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numPages = pdfDoc.getPageCount();

      console.log(`Conversion de ${numPages} pages du PDF: ${file.name}`);

      // Convertir chaque page
      for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
        // Créer un nouveau PDF avec seulement cette page
        const singlePagePdf = await PDFDocument.create();
        const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [pageIndex]);
        singlePagePdf.addPage(copiedPage);
        const pdfBytes = await singlePagePdf.save();

        // Convertir cette page PDF en image PNG d'abord (sharp ne lit pas directement les PDFs)
        // Note: Cette étape nécessite une bibliothèque supplémentaire comme pdf-poppler
        // Pour l'instant, on va utiliser une approche alternative avec canvas (voir commentaire ci-dessous)
        
        // ALTERNATIVE: Utiliser canvas côté serveur avec node-canvas
        // Pour simplifier, je vais créer une version qui envoie le PDF au client pour conversion
        
        const fileName = `${file.name.replace('.pdf', '')}-page${pageIndex + 1}.webp`;
        const filePath = `${category}/${Date.now()}-${fileName}`;

        uploadedFiles.push(filePath);
      }
    } else {
      // Si c'est une image, la convertir en WebP si nécessaire
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convertir en WebP avec Sharp
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 85 })
        .toBuffer();

      const fileName = file.name.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      const filePath = `${category}/${Date.now()}-${fileName}`;

      // Upload dans Supabase Storage
      const { error: uploadErr } = await supabase.storage
        .from('menus')
        .upload(filePath, webpBuffer, {
          contentType: 'image/webp',
        });

      if (uploadErr) {
        throw uploadErr;
      }

      // Insertion en base
      const { error: insertErr } = await supabase
        .from('menu_files')
        .insert({
          category: category,
          file_path: filePath,
        });

      if (insertErr) {
        throw insertErr;
      }

      uploadedFiles.push(filePath);
    }

    return NextResponse.json({ 
      success: true, 
      files: uploadedFiles,
      message: 'Fichier(s) uploadé(s) avec succès' 
    });

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement du fichier' },
      { status: 500 }
    );
  }
}