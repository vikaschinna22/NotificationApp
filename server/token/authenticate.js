// const jwt=require('jsonwebtoken');
// require('dotenv').config()

import jwt from 'jsonwebtoken';
import 'dotenv/config'


export const auth=(req,res,next)=>{
    var head=req.headers['authorization'];
    console.log(head)
    console.log('11 from authenticate\n\n\n')
    var token=head
    if(!token)
    {
       return res.status(401).send('unauthorized user');
    
    }
    jwt.verify(token,process.env.AUTH_KEY,(err,user)=>{
        if(err)
        {   
            return res.status(403).send(err.message);
        }
        console.log(user)
        req.user=user
        next()
    })
}
// module.exports=auth