import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
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
