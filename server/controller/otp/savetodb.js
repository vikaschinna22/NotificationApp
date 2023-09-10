
// const query=require('../services/extractdata')
// const queryit=require('../services/insert')

import { db } from "../../db.js"

export async function savedb ({pin:pin,mail:mail,otp:otp}){
    try{
        
        let expireAt=new Date(Date.now()+3600000)
        let expireAt1=expireAt.toISOString()
        let expireAt2=new Date(expireAt1)
        let createAt=new Date(Date.now())
        let createAt1=createAt.toISOString()
        createAt1=createAt1.slice(0,19).replace('T', ' ');
        expireAt1=expireAt1.slice(0,19)
        db.query("insert into otpschema values (?,?,?,?,?)",[pin,mail,otp,createAt1,expireAt1],(err)=>{
            if(err){
                console.log(err);
                return;
            }
        })
    }
    catch(err){
    
        throw err;
    }
}
// module.exports=savedb;