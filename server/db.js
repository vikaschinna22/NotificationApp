import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "22vikas",
    database:"var"
});

export const config = {
    host: "localhost",
    user: "root",
    password: "22vikas",
    database:"var"
}
