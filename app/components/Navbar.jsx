import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex flex-row gap-4 ml-auto mr-4'>
      <Link href='/o-nas'>O Nás</Link>

      <Link href='/contact'>Kontakt</Link>
    </nav>
  )
}

export default Navbar
