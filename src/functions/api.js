const express = require('express') 
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv-webpack').config()
const serverless = require('serverless-http')
const server = require('server')
const router = express.Router();
const { encrypt, decrypt} = require("./src/Encryption")



const connection = mysql.createConnection(process.env.DATABASE_URL)

console.log('Connected to DB!')

connection.end()


router.post('/addpassword', (req,res) => {
    const {platform_name, url, username, user_password, iv} = req.body;
    const hashedPassword = encrypt(user_password);
    

    db.query("INSERT INTO passwords (platform_name, url, username, user_password, iv) VALUES (?, ?, ?, ?, ?)", [platform_name, url, username, hashedPassword.user_password, hashedPassword.iv], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Success");
        }
    })
})

router.get("/showpasswords", (req, res) => {
    db.query("SELECT * FROM passwords;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

router.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
  });

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);