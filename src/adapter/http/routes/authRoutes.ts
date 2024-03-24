import { Router } from "express";
import HttpUtils from '../HttpUtils';
import AuthApiController from "@http/controllers/AuthApiController";


const authRoutes = HttpUtils.asyncRouterHandler(Router());

authRoutes.post('/login', AuthApiController.login);
authRoutes.post('/register', AuthApiController.register);

export default authRoutes;