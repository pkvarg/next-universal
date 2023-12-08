import { NextResponse } from 'next/server';
import EmailViaNodemailer from '@/app/libs/emailViaNodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  messageType: string;
}

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Bad request' }, { status: 405 });
  }

  try {
    const { name, email, phone, message, url, messageType } =
      await request.json();
    console.log(name, email, phone, message, url, messageType);
    if (messageType === 'contact-message') {
      await new EmailViaNodemailer(
        email,
        name,
        phone,
        message,
        url,
        messageType,
      ).send();
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
