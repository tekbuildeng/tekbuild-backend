import "dotenv/config";

import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  NAO_RESPONDER_EMAIL,
  NAO_RESPONDER_PASSWORD,
} = process.env;

export async function getMailClient() {
  const port = Number(SMTP_PORT);
  const secure = SMTP_SECURE === "true";

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: secure, // Your custom SMTP with SSL on 587
    auth: {
      user: NAO_RESPONDER_EMAIL,
      pass: NAO_RESPONDER_PASSWORD,
    },
  });

  return transporter;
}
