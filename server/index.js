const express = require('express') 
const app = express()
const mysql2 = require('mysql2')
const cors = require('cors')
const PORT = 3001

const { encrypt, decrypt} = require("./Encryption")

app.use(cors())
app.use(express.json())

const db = mysql2.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Veersaibzz77z!',
    database: 'passvault'
});

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