import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken } from './sendRefreshToken';
import { verifyToken } from './emailverification/emailverification';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import {Express} from 'express'

export const usermanager = (app: Express) => {

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

        const user = await User.findOne({id: payload.userId})
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
            const user = await User.findOne({email: validEmail});
            if(user){
                user.email_verified = true;
                user.save
                res.send("Nutzerkonto aktiviert");
            }  
        } else {
            res.send("Aktivierungscode abgelaufen");
        }       
    });


}