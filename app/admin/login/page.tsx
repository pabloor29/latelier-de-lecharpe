'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: 'latelier_de_lecharpe' } }
  )

  async function handleSignIn() {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
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
            <label>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-8 flex justify-center'>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className='bg-mustard py-2 px-4 rounded-xl font-specialElite text-blueDark hover:bg-blueDark hover:text-mustard'
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  )
}
