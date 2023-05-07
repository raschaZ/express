import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!, 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const resetUrl = `${process.env.APP_URL}/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: 'Reset your password',
    html: `Click <a href="${resetUrl}">here</a> to reset your password`,
  });
};
