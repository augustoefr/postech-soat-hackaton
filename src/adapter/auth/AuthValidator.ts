import Employee from "@entities/Employee";
import jsonwebtoken from "jsonwebtoken";

export class AuthValidator {
    static validateToken(token: string, secret: string) {
        return jsonwebtoken.verify(token as string, secret) as {
            user: string,
            iat: number,
            exp: number,
        };
    }
}