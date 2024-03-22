import jwt from "jsonwebtoken";

export class AuthValidator{
    static validateToken(token: string, secret: string):CustomerAuthInfo{
        //mock 
        //return {id: '12345678910', name: 'José'} as CustomerAuthInfo;
        return jwt.verify(token as string, secret) as  CustomerAuthInfo;
    }
}