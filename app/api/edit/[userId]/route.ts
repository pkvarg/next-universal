import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

// GET USER BY ID FOR CLIENT EDIT-DISPLAY
export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    const userId = parseInt(params.userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' });
  }
}

// UPDATE USER BY ID
export async function PATCH(req: Request, context: any) {
  try {
    const { params } = context;
    const userId = parseInt(params.userId);
    const { name, email } = await req.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json({ updatedUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' });
  }
}

// DELETE USER BY ID
export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;
    const userId = parseInt(params.userId);

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
