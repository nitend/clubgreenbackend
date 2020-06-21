import {sendVerificationEmail} from './sendEmail'
import {getToken} from './genToken'
import { Emails } from '../database'

const validation_time = 24 * 60 * 60 * 1000

const db = Emails

export const sendVerification = async (email: string) => {
    const token = getToken();
    sendVerificationEmail(email, token);
    const result = await db.insert({
        id: "",
        creationDate: "",
        deleted: false,
        verified: false,
        email: email,
        verification_token: token,
        verification_date: Date.now()
    })
    if(result){
       return true 
    }
    return false;
}

export const verifyToken = async (token: string) => {
    const email = await db.findByPropValue("verification_token", token)
    const emailver = email[0];

    if(emailver && emailver.verification_date){
        var duedate = emailver.verification_date + validation_time;
        console.log(Date.now() + " now and valid " + duedate);
        if(Date.now() < duedate ){           
            //valid
        } else {
            //invalid
        }
    }
    return emailver.email;
}