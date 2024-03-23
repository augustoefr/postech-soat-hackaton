import { Router } from "express";
import HttpUtils from '../HttpUtils';
import GoogleOauthIntegration from "src/adapter/auth/GoogleOauthIntegration";


const authRoutes = HttpUtils.asyncRouterHandler(Router());

const redirectUrl = 'http://localhost:3000/getData';
const integration = new GoogleOauthIntegration(redirectUrl);

authRoutes.get('/login', async (req, res)=> res.json({url: await integration.generateAuthUrl()}));
authRoutes.get('/getData', async (req, res)=> res.json({url: await integration.getUserData(req.query.code as string)}));

export default authRoutes;