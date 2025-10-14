import { WELCOME_EMAIL_TEMPLATE } from '@/lib/nodemailer/templates';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
    '{{intro}}',
    intro
  );

  const mailOptions: Mail.Options = {
    from: `"Signalist" <${NODEMAILER_EMAIL}>`,
    to: email,
    subject: `Welcome to Signalist - your stock market toolkit is ready!`,
    text: 'Thanks for joining Signalist',
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
