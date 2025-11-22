// app/admin/page.tsx  (server component)
import HolidaysChange from '@/components/admin/HolidaysChange';
import HomePage from '@/components/admin/HomePage';
import MenuChange from '@/components/admin/MenuChange';
import RubanAdmin from '@/components/admin/RubanAdmin';
import ScheduleChange from '@/components/admin/ScheduleChange';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const revalidate = 0 // selon besoin

export default async function AdminPage() {

    console.log("Admin page loaded!");

  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    // pas connecté -> redirection vers login
    redirect('/admin/login')
  }

  // Recuperer le profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_admin, email, username')
    .eq('id', session.user.id)
    .single()

  if (error || !profile) {
    // pas de profil -> redirection
    console.log("Profile not found...")
    redirect('/admin/login')
  }

  if (!profile.is_admin) {
    // connecté mais pas admin -> redirection vers racine (ou 403)
    console.log("User admin connected");
    redirect('/amdin')
  }
  else {
    console.log("User not admin");
  }

  // OK : c'est un admin -> afficher la page admin
    return (
        <div className='bg-cream flex flex-col items-center'>
                
            <RubanAdmin />
            
            <div className="w-2/3">
                <HomePage email={profile.email} />
            </div>

            <section className='flex flex-col gap-20 w-2/3'>
                <MenuChange />
                <ScheduleChange />
                <HolidaysChange />
            </section>
        </div>
    )
}
