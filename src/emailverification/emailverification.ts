import {sendVerificationEmail} from './sendEmail'
import {getToken} from './genToken'
import {Email} from '../entity/Email'

const validation_time = 24 * 60 * 60 * 1000

export const sendVerification = (email: string) => {
    const token = getToken();
    sendVerificationEmail(email, token);
    Email.insert({
        email: email,
        verification_token: token,
        verification_date: Date.now()
    })
    return token;
}

export const verifyToken = async (token: string) => {
    const email = await Email.findOne({verification_token: token})

    if(email && email.verification_date){
        var duedate = email.verification_date + validation_time;
        console.log(Date.now() + " now and valid " + duedate);
        if(Date.now() < duedate ){           
            //valid
        } else {
            //invalid
        }
    }
    return email?.email;
}