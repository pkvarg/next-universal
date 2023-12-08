'use client';
import React from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';

const Login = () => {
  const { status, data } = useSession();
  const name = data?.user?.name;
  const email = data?.user?.email;
  const uniqueEmail = process.env.NEXT_PUBLIC_UNIQUE_USER_EMAIL;

  // TODO ALLOW UNIQUE EMAIL ONLY

  return (
    <>
      {status === 'authenticated' ? (
        <div>
          <p>{name}</p>
          <p>{email}</p>
          <div
            className="h-[70px] w-[30%] bg-red-800 text-[45px] text-white hover:cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </div>
        </div>
      ) : (
        <div
          className="h-[70px] w-[30%] bg-red-800 text-[45px] text-white hover:cursor-pointer"
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </div>
      )}
    </>
  );
};

export default Login;
