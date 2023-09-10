// const express=require('express')
// var router=express.Router();
// const query=require('../services/extractdata')
// const generateOTP=require('./generateOTP')
import { db } from '../../db.js';
import {generateOTP} from './generateOTP.js';

export async function otpRouter(req,res){
    console.log('hello')
    // try{
        const {pin,email}=req.body;
        console.log(pin,email)
        if(!(pin  && email)){
            throw Error("Invalid credentials");
        }
        const row = db.query("select * from person where pin=?",[pin],(err,result)=>{
            if(err){
                res.status(401).send({data:err.message})
                return;
            }
            console.log(result)
            if(result.length<1){
                throw Error("Invalid Credentials")
            }
            if(result[0].mail!==email){
                throw Error("Wrong mail")
            }
            generateOTP({mail:email,pin:pin})
            res.send({data:result});

        })
    //     console.log(row);
    //     console.log('hello')
    //     if(row.length<1)
    //     {
    //         throw Error("Invalid Credentials")
    //     }
    //     if(row[0].mail!==email)
    //     {
    //         throw Error("Wrong mail")
    //     }
    //     generateOTP({mail:email,pin:pin})
    //     res.send({data:row});
    // }
    // catch(err)
    // {
    //     res.status(401).send({data:err.message})
    // }
}
// module.exports=router
