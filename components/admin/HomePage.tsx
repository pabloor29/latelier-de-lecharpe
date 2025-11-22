import React from 'react'

interface HomePageProps {
  email: string
}

function HomePage({ email }: HomePageProps) {
    return (
        <div className='bg-cream py-10 w-full'>
            <p>
                Bonjour, {email} — vous êtes connecté en tant qu'administrateur ✅
            </p>
        </div>
    )
}

export default HomePage