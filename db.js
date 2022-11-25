const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.PASSWORD,
    database:'geofence',
    port:3306
});


connection.connect((err)=>{
    if(err) console.log(err.message);
    else console.log("Database Connected Successfully");
});

module.exports = connection;
