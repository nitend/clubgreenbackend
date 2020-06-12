import crypto from "crypto"

export const getToken = () =>{
    var token = crypto.randomBytes(12).toString('hex')
    console.log(token)
    return token;
}