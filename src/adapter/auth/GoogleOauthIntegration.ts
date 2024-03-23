import {Request, Response} from "express";
import { OAuth2Client } from "google-auth-library";


export default class GoogleOauthIntegration{
    readonly redirectUrl:string;

    constructor(redirectUrl: string){
        this.redirectUrl = redirectUrl;
    }

    public async generateAuthUrl():Promise<string>{
        return this.getClient().generateAuthUrl({
            access_type: 'offline',
            scope: process.env.GOOGLE_AUTH_CLIENT_SCOPE,
            prompt: 'consent'
        });
    }

    public async getUserData(code:string){
        const client = this.getClient();
        const tokenResponse = await client.getToken(code);
        await client.setCredentials(tokenResponse.tokens);
        const accessToken = client.credentials.access_token;

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
        const data = await response.json();
        console.log({data})
        return data;
    }

    private getClient(){
        return new OAuth2Client(
            process.env.GOOGLE_AUTH_CLIENT_ID,
            process.env.GOOGLE_AUTH_CLIENT_SECRET,
            this.redirectUrl
        );
    }
}