'use client';
import React from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import axios from 'axios';

const Login = () => {
  const { status, data } = useSession();
  const name = data?.user?.name;
  const email = data?.user?.email;
  const uniqueEmail = process.env.NEXT_PUBLIC_UNIQUE_USER_EMAIL;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('submitting');
    const data = await axios.get('/api/register');
    // const data = await axios.post('/api/register', {
    //   email: 'pkvarg@yahoo.se',
    //   name: 'Peter',
    //   password: 'sveter',
    // });
    console.log(data);
  };

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
          <form
            onSubmit={handleSubmit}
            className="ml-4 mt-4 flex flex-col gap-2"
          >
            <input type="text" placeholder="meno" />
            <input type="text" placeholder="heslo" />
            <button type="submit" className="w-[100px] bg-green-400">
              OK
            </button>
          </form>
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
