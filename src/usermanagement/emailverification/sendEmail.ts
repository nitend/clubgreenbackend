import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY='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'


export const sendVerificationEmail = (sendto: any, verification_token: any) => {
    sgMail.setApiKey(SENDGRID_API_KEY);

    const link = "http://localhost:4000/verify_email?token="+verification_token+""

    const msg = {
        to: sendto,
        from: 'no-repley@club-gruen.de',
        subject: 'Email bestätigen',
        text: 'Bitte bestätige uns noch deinen Account. Danke.',
        html: '<strong> Bitte bestätige uns noch deine Email-Adresse um deinen Account zu aktivieren jetzt den Account aktivieren </strong>'+' <a href="'+link+'">Hier klicken zum aktivieren</a>'
    }
    console.log("email send to " + sendto);
    sgMail.send(msg)
    return null;
}

export const isExpired = (timestamp: number) => {
    const now = Date.now();
    const expireDate = timestamp + (24 * 60 * 60 * 1000) // 24 hours valid 
    if(expireDate > now){
        return true;
    } else{
        return false;
    }
} 
