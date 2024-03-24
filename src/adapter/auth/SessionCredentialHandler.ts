import ICredentialHandler from "@ports/auth/ICredentialHandler";

export default class SessionCredentialHandler implements ICredentialHandler{
    readonly session;

    constructor(session:any){
        this.session = session;
    }

    setCredentials(credentials: any): void {
        console.log('setCredentials', {credentials});
        this.session.credentials = credentials;
    }

    getCredentials() {
        console.log('getCredentials', {sessionCredentials: this.session.credentials});
        return this.session.credentials;
    }
    
}