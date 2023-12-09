import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import checkUserExists from '@/app/libs/checkUserExists';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    let hashedPassword;
    // in case Gmail sign in, there is no password
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const existingUser = await checkUserExists(email);

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists!' });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}

export async function GET(req: Request) {
  try {
    // const hashedPassword = await bcrypt.hash(password, 12)

    const users = await prisma.user.findMany();

    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
