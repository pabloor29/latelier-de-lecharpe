'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function SetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // La session a ete posee par /auth/confirm. On verifie qu'elle existe.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setError("Lien invalide ou expire. Demande une nouvelle invitation.")
      }
      setReady(true)
    })
  }, [])

  async function handleSetPassword() {
    if (password.length < 8) {
      setError('Mot de passe trop court (8 caracteres minimum).')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({ password })
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
          Definir le mot de passe
        </h1>

        {error && <div style={{ color: 'red' }} className="pb-4">{error}</div>}

        <div className="flex flex-col gap-5 font-specialElite">
          <div className="flex flex-col">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label>Confirmer</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-8 flex justify-center'>
          <button
            onClick={handleSetPassword}
            disabled={loading || !ready}
            className='bg-mustard py-2 px-4 rounded-xl font-specialElite text-blueDark hover:bg-blueDark hover:text-mustard disabled:opacity-50'
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  )
}
