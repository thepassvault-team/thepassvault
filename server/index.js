const express = require('express') 
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const PORT = 3001
require('dotenv').config()

const { encrypt, decrypt} = require("./Encryption")

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

console.log('Connected to PlanetScale!')

connection.end()


app.post('/addpassword', (req,res) => {
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

app.get("/showpasswords", (req, res) => {
    db.query("SELECT * FROM passwords;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.post("/decryptpassword", (req, res) => {
    res.send(decrypt(req.body));
  });


app.listen(PORT, () => {
    console.log('Server is running')
});