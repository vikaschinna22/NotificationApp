// const sql=require('mysql2/promise')
// const config=require('../config.js')

import { db,config } from "../db.js";

import mysql from 'mysql2/promise';


export async function  getquery(query,params){
    try{
    //console.log("hi query")
    const connection=await mysql.createConnection(config);

    const [rows,]=await connection.execute(query,[params]);
    // console.log(db.execute(query,[params],'15'));
    // console.log(rows,'16')
    return rows;
    }
    catch(err)
    {
        console.log(err)
        // throw Error(err.message)
    }
};
// module.exports={getquery};
