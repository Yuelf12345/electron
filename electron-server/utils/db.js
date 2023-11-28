const mysql = require('mysql2/promise');

let db;

~async function(){
    db = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'yChats',
    })
}()

console.log('db',db);

module.exports = db