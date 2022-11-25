const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const db = require('./db');
const mapRoute = require('./Routes/maproute');

db;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api',mapRoute);

app.listen(process.env.PORT,(err)=>{
    if(err)console.log(err.message);
    else console.log(`Server Started at ${process.env.PORT} Port`);
})
