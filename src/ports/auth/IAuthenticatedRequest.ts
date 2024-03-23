import { Request } from "express";

export default interface IAuthenticatedRequest extends Request{
    userInfo: EmployeeAuthInfo;
}