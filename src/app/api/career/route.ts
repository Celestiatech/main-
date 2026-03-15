import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { addMessage } from '@/lib/messages';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, position, experience, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !position || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save message to storage
    const savedMessage = addMessage({
      type: 'career',
      name,
      email,
      phone,
      message,
      status: 'new',
      extra: {
        position,
        experience,
      },
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: '75ce2b001@smtp-brevo.com',
        pass: 'pFz25Iy7D8UZgfNm',
      },
    });

    // Email content
    const mailOptions = {
      from: 'vishal.sadyal@xcelance.com',
      to: 'vishal.sadyal@xcelance.com',
      subject: `New Career Application from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Career Application</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Applicant Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Position Applied:</strong> ${position}</p>
            <p><strong>Years of Experience:</strong> ${experience}</p>
          </div>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Cover Letter:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This application was submitted through the Celestiatech career page.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: savedMessage.id });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
