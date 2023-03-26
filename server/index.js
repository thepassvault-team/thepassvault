const express = require('express')
require('dotenv').config()
const pm = express()
const mysql = require('mysql')

const connection = mysql.createConnection(process.env.THEPASSVAULTDB)
console.log('Connected to PlanetScale!')

connection.end()


pm.get('/', (request, response) =>
{
    response.send
});

pm.listen(3001, () =>
{
    console.log("SERVER IS UP....")
});
