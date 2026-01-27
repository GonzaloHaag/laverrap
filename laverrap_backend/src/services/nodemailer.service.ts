/**
 * Ethereal es un servicio gratuito que captura los correos electrónicos salientes para las pruebas.
 * En realidad no se entregan correos electrónicos, lo que lo hace perfecto para el desarrollo.
 */
import nodemailer from "nodemailer";
import { clientService } from "./client.service";
import { ClientError } from "../utils/errors";
export const nodemailerService = {
  sendEmail: async (clientId: number, userId: number) => {
    const client = await clientService.getClientById(clientId, userId);
    if (!client.email)
      throw new ClientError("El cliente no tiene un email válido", 400);
    // Implementation for sending email
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const info = await transporter.sendMail({
      from: '"Laverrap" <noreply@laverrap.com>',
      to: client.email,
      subject: "¡Tu lavado ha sido completado!",
      text: `Hola ${client.name || "Cliente"},\n\nTu lavado ha sido completado exitosamente.\n\nGracias por confiar en Laverrap.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>¡Tu lavado ha sido completado!</h2>
          <p>Hola <strong>${client.name || "Cliente"}</strong>,</p>
          <p>Tu lavado ha sido completado exitosamente.</p>
          <p>Gracias por confiar en <strong>Laverrap</strong>.</p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview: %s", nodemailer.getTestMessageUrl(info));
  },
};
