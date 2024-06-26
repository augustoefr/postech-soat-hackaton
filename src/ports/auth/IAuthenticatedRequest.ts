import Employee from "@entities/Employee";
import { Request } from "express";

export default interface IAuthenticatedRequest extends Request {
    userInfo: {
        user: string,
        iat: number,
        exp: number,
    };
}