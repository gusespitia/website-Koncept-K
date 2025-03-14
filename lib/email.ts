"use server";
import 'dotenv/config';
import { z } from "zod";
import { formSchema } from "./schemas";

import { EmailTemplate } from './email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    // Enviar email al usuario
    const { error: userError } = await resend.emails.send({
      from: `Acme <${process.env.RESEND_FROM_EMAIL}>`,
      to: [emailFormData.email],
      subject: 'Kconcept contact form',
      react:await EmailTemplate({ firstName: emailFormData.firstName }),
    });

    if (userError) {
      console.error("Error sending email to user:", userError);
      throw new Error(`Email send failed: ${userError.message}`);
    }

    // Enviar una copia a tu correo con el mensaje original
    const { error: adminError } = await resend.emails.send({
      from: `Acme <${process.env.RESEND_FROM_EMAIL}>`,
      to: ["gustavespitia@gmail.com"],
      subject: `New Contact Form Submission from ${emailFormData.firstName}`,
      text: `You received a new message from ${emailFormData.firstName} ${emailFormData.lastName} (${emailFormData.email}):\n\n"${emailFormData.message}"`,
    });

    if (adminError) {
      console.error("Error sending email to admin:", adminError);
      throw new Error(`Email send failed: ${adminError.message}`);
    }

    console.log("Emails sent successfully");
  } catch (e) {
    throw e;
  }
};


