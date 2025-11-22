'use client'

import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createBrowserSupabaseClient()

  async function handleSignIn() {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/admin') // le serveur pourra lire la session via cookie
  }

  async function handleSignUp() {
    const SECRET_INVITE_CODE = process.env.NEXT_PUBLIC_INVITE_CODE
    if (inviteCode !== SECRET_INVITE_CODE) {
      setError("Code d’invitation invalide.")
      return
    }
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    const user = data.user
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        username: user.email
      })
    }
    router.push('/admin')
  }
  
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-cream'>
        <div className="bg-redWine p-8 rounded-xl w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h1 className='font-specialElite text-2xl pb-8'>
                Admin login
            </h1>

            {error && <div style={{color:'red'}}>{error}</div>}

            <div className="flex flex-col gap-5 font-specialElite">
                <div className="flex flex-col">
                    <label>
                        Email
                    </label>
                    <input 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>

                <div className="flex flex-col">
                    <label>
                        Mot de passe
                    </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                </div>

                <div className="flex flex-col">
                    <label>
                        Code d'activation
                    </label>
                    <input
                        value={inviteCode}
                        onChange={e => setInviteCode(e.target.value)}
                    />
                </div>
            </div>

            <div className='mt-8 flex justify-between sm:justify-center sm:gap-20'>
                <button 
                    onClick={handleSignIn} 
                    disabled={loading}
                    className='bg-mustard py-2 px-4 rounded-xl font-specialElite text-blueDark hover:bg-blueDark hover:text-mustard'
                >
                    Se connecter
                </button>
                <button 
                    onClick={handleSignUp} 
                    disabled={loading} 
                    className='bg-mustard py-2 px-4 rounded-xl font-specialElite text-blueDark hover:bg-blueDark hover:text-mustard'
                >
                    S'inscrire
                </button>
                {/* <button onClick={handleSignOut} style={{marginLeft:8}}>Se déconnecter</button> */}
            </div>
        </div>
    </div>
  )
}
