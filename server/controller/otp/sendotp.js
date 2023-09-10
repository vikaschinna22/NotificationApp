// const nodemailer=require('nodemailer')
// require('dotenv').config()
import nodemailer from 'nodemailer'
import 'dotenv/config'

const {AUTH_MAIL,AUTH_PASS}=process.env
let transporter=nodemailer.createTransport({
    host:'smtp-mail.outlook.com',
    auth:{
        user: AUTH_MAIL,
        pass: AUTH_PASS,
    }
})
transporter.verify((error,succes)=>{
    if(error)
    {
        console.log("gi"+error+AUTH_MAIL);
        throw error
    }
    else{
        console.log("scucces"+succes)
    }
});
export async function sendotp (mailoptions){
    try{await transporter.sendMail(mailoptions);
    return;
    }
    catch(error)
    {
        console.log(error);
        throw error;
    }
}
// module.exports = sendotp;