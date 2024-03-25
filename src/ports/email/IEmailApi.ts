export default interface IEmailApi{
    send(to:string, subject:string, html:string): void;
}