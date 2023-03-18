const express = require('express')
const pm = express()

pm.get('/', (request, response) =>
{
    response.send
});

pm.listen(3001, () =>
{
    console.log("SERVER IS UP....")
});