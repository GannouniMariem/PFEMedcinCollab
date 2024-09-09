// email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Replace with your SMTP host
      port: 587, // Replace with your SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com', // Replace with your SMTP username
        pass: 'your-email-password', // Replace with your SMTP password
      },
    });
  }

  async sendPassword(email: string, password: string) {
    const mailOptions = {
      from: '"Your Company" <your-email@example.com>', // sender address
      to: email, // list of receivers
      subject: 'Your Account Password', // Subject line
      text: `Welcome! Your account has been created. Your password is: ${password}`, // plain text body
      html: `<p>Welcome!</p><p>Your account has been created.</p><p>Your password is: <strong>${password}</strong></p>`, // html body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Password email sent successfully');
    } catch (error) {
      console.error('Error sending password email:', error);
    }
  }
}
