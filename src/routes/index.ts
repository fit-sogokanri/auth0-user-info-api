import express from "express"
import {auth, requiresAuth} from 'express-openid-connect';
import {Member} from "../models/member";
import { config } from "dotenv-safe";
config();

const debug = require('debug')('auth0-user-info-api:routes:index')

export const router = express.Router();

router.use(auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
}))

router.use('/me/', requiresAuth())

router.get('/me/', (req, res) => { // <4>
    const user: any = req.oidc?.user;
    debug(user)
    if(!user) return res.status(404).json({error: "cannot get user information"})

    try{
        const member = new Member(user.sub, user.email, user.given_name, user.family_name);
        res.status(200).json(member.toJSON())
    }catch (e){
        debug(e);
        res.status(500).json({error: "unknown error!"})
    }
})
