import IAuthenticatedRequest from "@ports/auth/IAuthenticatedRequest";
import { Request, Response, NextFunction } from "express";
import { AuthValidator } from "./AuthValidator";

export default function(req: Request, res: Response, next: NextFunction){
    const token = (req.headers["authorization"] || '').replace('Bearer ', '');
    const secret = process.env.JWT_SECRET;

    console.log(secret, token);

    try {
        (req as IAuthenticatedRequest).userInfo = AuthValidator.validateToken(token as string, secret as string);
        next();

    } catch (err) {
        console.error(err);
        res.status(401).send('Authentication failed');
    }
}