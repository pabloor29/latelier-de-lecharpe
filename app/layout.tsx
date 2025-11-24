import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L'atelier de l'écharpe",
  description: "Ben & Gilles sont ravis de vous accueillir à l'Atelier de l'Echarpe, nouveau lieu de fiesta à Toulouse, 8 rue de l'écharpe 31000 Toulouse, tout près de la place Esquirol, de l'hotel d'Assezat et du Pont-Neuf.",
  icons: "/img/logo/logo-red.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
        <title>L'atelier de l'écharpe</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="keywords" content="Bar, Bar à cocktails, Cocktails, Vin, Bar à vin, Restaurant Toulouse, Restaurant, Toulouse, Cocktails Toulouse, Bar à cocktails Toulouse, Bar à vin Toulouse" />
        <meta name="description" content="Ben & Gilles sont ravis de vous accueillir à l'Atelier de l'Echarpe, nouveau lieu de fiesta à Toulouse, 8 rue de l'écharpe 31000 Toulouse, tout près de la place Esquirol, de l'hotel d'Assezat et du Pont-Neuf." />
        <meta property="og:title" content="L'atelier de l'écharpe" />
        <meta property="og:image" content="/img/info/resume-page-cream.jpg" />
        <meta property="og:url" content="http://www.latelierdelecharpe.fr/" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/img/logo/logo-red.png"></link>
      </Head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}