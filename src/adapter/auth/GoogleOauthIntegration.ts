import Employee from "@entities/Employee";
import ICredentialHandler from "@ports/auth/ICredentialHandler";
import { OAuth2Client } from "google-auth-library";


export default class GoogleOauthIntegration{
    private readonly redirectUrl:string;
    private readonly credentialHandler: ICredentialHandler;

    constructor(redirectUrl: string, credentialHandler: ICredentialHandler){
        this.redirectUrl = redirectUrl;
        this.credentialHandler = credentialHandler;
    }

    public async generateAuthUrl():Promise<string>{
        return this.getClient().generateAuthUrl({
            access_type: 'offline',
            scope: process.env.GOOGLE_AUTH_CLIENT_SCOPE,
            prompt: 'consent'
        });
    }

    public async setClientCredentials(code:string):Promise<any>{
        try{
            const client = this.getClient();
            const tokenResponse = await client.getToken(code);
            await client.setCredentials(tokenResponse.tokens);
            this.credentialHandler.setCredentials(client.credentials);
        } catch(error){
            console.log('setCredentials error:', error);
        }
    }

    public async getUserData(): Promise<Employee | null> {
        try{
            const credentials = this.credentialHandler.getCredentials();
            if(!credentials) return null;

            const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${credentials.access_token}`);
            const userData = await response.json();

            console.log('getUserData', {userData});

            return this.mapUserDataToEmployee(userData);
        } catch(error){
            console.log('getUserData error:', error);
            return null;
        }
    }

    private mapUserDataToEmployee(userData:any){
        return new Employee(
            userData.sub,
            userData.name,
            userData.email
        );
    }

    private getClient(){
        return new OAuth2Client(
            process.env.GOOGLE_AUTH_CLIENT_ID,
            process.env.GOOGLE_AUTH_CLIENT_SECRET,
            this.redirectUrl
        );
    }
}