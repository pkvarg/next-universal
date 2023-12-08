'use client';
import { SessionProvider } from 'next-auth/react';

export interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
