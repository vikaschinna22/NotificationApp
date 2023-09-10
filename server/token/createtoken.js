// const jwt=require('jsonwebtoken');
// require('dotenv').config()

import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const createToken=(user)=>{
    console.log(user)
    const token=jwt.sign(user,process.env.AUTH_KEY)
    return token
}
// module.exports=create
