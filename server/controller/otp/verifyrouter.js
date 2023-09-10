// var express=require('express');
//const { request } = require('../app');
// var router=express.Router();
// const tokenize=require('../token/createtoken')
// const verify=require('./verifyOTP')

import {createToken} from '../../token/createtoken.js'
import { verify} from './verifyOTP.js'

export async function verifyRoute(req,res){
    try{
        console.log('verifyOTP')
        const access=await verify(req.body);
        //console.log("i"+access)
        if(access['msg']=='otp expired'){
            return res.send({data:access['msg']})
        }
        else if(!access['accept']){
            console.log(19,'verifyroute');
            return res.status(401).send({data:access['msg']})
        }
        var token=createToken(req.body);
        res.status(200).send({token:token})
    }
    catch(err){
        console.log(25,'verifyroute',err);
        res.status(401).send({data:err.message})
    }
}
// module.exports =router
