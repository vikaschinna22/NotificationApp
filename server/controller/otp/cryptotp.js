// const bcrypt=require('bcrypt')
import bcrypt from 'bcrypt'
export async function hashotp (otp){
    try{
        const hashotp=await bcrypt.hash(otp+"",10);
        console.log(hashotp)
        return hashotp;
    }
    catch(err)
    {
        
        throw err;
    }
}
// module.exports=crypt;