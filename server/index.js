const express = require('express')
const pm = express()
const mysql_db = require('mysql')

const connect_db = mysql.createConnection(
    {
        host: us-east.connect.psdb.cloud,
        database: thepassvault,
        user: t6xdrood6l4wk5648qza,
        password: df,
    }
);

pm.get('/', (request, response) =>
{
    response.send
});

pm.listen(3001, () =>
{
    console.log("SERVER IS UP....")
});
