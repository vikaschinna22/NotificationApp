// const sql=require('mysql2/promise')
// const config=require('../config.js')

import { db } from "../db";

export async function  queryit(query,params){
    try{
    // const connection=await sql.createConnection(config.db);
    const [rows,]=await db.query(query,[params]);
    return rows;
    }
    catch(err)
    {
        throw Error(err.message)
    }
};
// module.exports=queryit;