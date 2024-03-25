import IEmailApi from "@ports/email/IEmailApi";
import { Resend } from 'resend';

export default class ResendEmailIntegration implements IEmailApi{
    constructor(){}

    send(to: string, subject: string, html: string): void {
        const from = process.env.EMAIL_SENDER_ADDRESS as string
        const resend = new Resend(process.env.RESEND_MAIL_KEY);
        resend.emails.send({ from, to, subject, html });
    }
}