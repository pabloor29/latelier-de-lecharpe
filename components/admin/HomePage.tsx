import React from 'react'

interface HomePageProps {
  email: string
}

function HomePage({ email }: HomePageProps) {
    return (
        <div className='bg-cream px-48 pt-10'>
            <p>
                Bonjour, {email} — vous êtes administrateur ✅
            </p>
        </div>
    )
}

export default HomePage