import { marked } from 'marked';
import nodemailer from 'nodemailer'
import fs from 'fs';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

export const notify = async (emails, title, content) => {
  try {
    const template = fs.readFileSync('./src/misc/email_template.html').toString()
    let info = await transporter.sendMail({
      from: `"HackHub Announcements" <${process.env.SMTP_MAIL}>`,
      to: emails.join(', '),
      subject: title, 
      html: template
        .replace('{{HACKHUB_SUBJECT}}', title)
        .replace('{{HACKHUB_CONTENT}}', content)
        .replace('{{HACKHUB_ORGANIZER}}', 'Hackathon Organizers')
    });
  
    console.log(info)
  } catch (error) {
    console.log(error)
  }
}
