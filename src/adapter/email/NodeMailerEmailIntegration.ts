import IEmailApi from "@ports/email/IEmailApi";
import nodemailer from "nodemailer";

export default class NodeMailerEmailIntegration implements IEmailApi {
    constructor() { }

    send(to: string, subject: string, html: string): void {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_SENDER_ADDRESS,
                pass: process.env.EMAIL_SENDER_PASSWORD
            }
        });
        const options = {
            from: process.env.EMAIL_SENDER_ADDRESS,
            to,
            subject,
            html
        }
        transporter.sendMail(options);
    }
}