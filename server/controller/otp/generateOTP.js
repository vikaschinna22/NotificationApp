// const query=require('../services/extractdata')
// require('dotenv').config()
// const handlebars= require('handlebars')
// const path=require('path')
// const fs=require('fs')
// const {AUTH_MAIL}=process.env
// const sendotp=require('./sendotp')
// const hashotp=require('./cryptotp')
// const savedb = require('./savetodb')

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import handlebars from 'handlebars'

import {sendotp} from './sendotp.js'
import {savedb} from './savetodb.js'
import { hashotp } from './cryptotp.js'

import { db } from '../../db.js'

const {AUTH_MAIL}=process.env


export async function generateOTP({mail,pin}){
    try{
        
        const row=db.query("delete from OTPSchema where mail=?",mail)
        const otp=Math.floor(1000+Math.random()*9000)
        // const __dirname = new URL('.', import.meta.url).pathname;
        // console.log(__dirname)
        // const filePath = path.join(__dirname, 'temp.html').slice(0);
        const filePath = './controller/otp/temp.html'
        console.log(filePath+'\n\n\n\n\n\n\n')
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            otp: otp
        };
        const htmlToSend = template(replacements);
        console.log(otp)
        const mailoptions={
            from:AUTH_MAIL,
            to:mail,
            subject:"your otp",
            html:htmlToSend
        }
        await sendotp(mailoptions)
        const saveotp=await hashotp(otp)
        await savedb({pin:pin,mail:mail,otp:saveotp})
    }
    catch(err)
    {
        console.log(err+" "+pin+" "+mail)
        throw err;
    }
}
// module.exports={generateOTP};