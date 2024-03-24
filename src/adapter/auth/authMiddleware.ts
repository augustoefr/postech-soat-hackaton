import { Request, Response, NextFunction } from "express";
import SessionCredentialHandler from "./SessionCredentialHandler";
import GoogleOauthIntegration from "./GoogleOauthIntegration";
import IAuthenticatedRequest from "@ports/auth/IAuthenticatedRequest";

export default async function(req: Request, res: Response, next: NextFunction){
    const credentialHandler = new SessionCredentialHandler(req.session);
    const oauthIntegration = new GoogleOauthIntegration(process.env.LOGIN_REDIRECT_URL as string, credentialHandler);

    try {
        const userData = await oauthIntegration.getUserData();
        if(!userData) throw 'Cannot retrieve user data';

        (req as IAuthenticatedRequest).userInfo = userData;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).send('Authentication failed');
    }
}