import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="ml-auto mr-4 flex flex-row gap-4">
      <Link href="/o-nas">O Nás</Link>

      <Link href="/contact">Kontakt</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
