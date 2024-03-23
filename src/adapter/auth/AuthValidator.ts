import jwt from "jsonwebtoken";

export class AuthValidator{
    static validateToken(token: string, secret: string):EmployeeAuthInfo{
        //mock 
        return {id: '12345678910', name: 'José'} as EmployeeAuthInfo;
        return jwt.verify(token as string, secret) as  EmployeeAuthInfo;
    }
}