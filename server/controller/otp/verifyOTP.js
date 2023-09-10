// const query=require('../services/extractdata')
// const crypt=require('./cryptotp')
// const bcrypt=require('bcrypt')

import {getquery} from '../../services/extractdata.js'
import bcrypt from 'bcrypt'


export const verify= async({email,otp})=>{
    try{
        console.log('verify')
        let row=await getquery('select * from otpschema where mail=?',email)
        console.log(row,'13 verifyotp')
        if(!row || row.length==0)
        {
            console.log('row error')
            throw Error('could not find a matching mail record')
        }
        otp=otp+""
        console.log(otp)
        //console.log("hashedotp"+row[0].otp+" "+otp);
        let curdate=new Date(Date.now()-3600000*5-1800000).toISOString()
        curdate=new Date(curdate)
        let expdate=row[0].expireAt.toISOString();
        expdate=new Date(expdate)
        //console.log(curdate+" c e "+expdate+" d "+(expdate-curdate))
        if(expdate-curdate<0)
        {
            console.log('expire'+curdate)
            await getquery("delete from OTPSchema where mail=?",email)
            return {accept:false,msg:'otp expired'};
        }
        const ans= await bcrypt.compare(otp,row[0].otp)
        return {accept:ans,msg:ans?'otp matched':'otp mismatch'}
    }
    catch(err)
    {
        console.log('verifyOTP 38');
        throw Error(err.message)
    }   

}
// module.exports =verify