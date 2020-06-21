import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken } from './sendRefreshToken';
import { verifyToken } from '../emailverification/emailverification';
import { verify } from 'jsonwebtoken';
import {Express} from 'express'
import { Users } from '../database';

export const usermanager = (app: Express) => {

    const db = Users;

    app.post('/refresh_token', async (req, res) => { 
        const token = req.cookies.jid

        if(!token){
            return res.send({ ok: false, accessToken: ''})
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch(err){
            console.log(err)
            return res.send({ ok: false, accessToken: ''})
        }

        const result = await db.findByPropValue("id", payload.userId)
        const user = result[0];
        if(!user){
            return res.send({ ok: false, accessToken: ''})  
        }

        if(user.tokenVersion !== payload.tokenVersion){
            return res.send({ ok: false, accessToken: ''})  
        }

        sendRefreshToken(res, createRefreshToken(user))

        return res.send({ok: true, accessToken: createAccessToken(user)})

    })

    app.get('/verify_email', async function(req,res) {
        const token = req.query.token;
        const validEmail = await verifyToken(token);

        if(validEmail){
            const result = await db.findByPropValue("email", validEmail);
            const user = result[0]
            if(user){
                user.email_verified = true;
                db.replace(user);
                res.send("Nutzerkonto aktiviert");
            }  
        } else {
            res.send("Aktivierungscode abgelaufen");
        }       
    });


}