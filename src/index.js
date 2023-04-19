import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
const express = require('express') 
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const PORT = 3001
require('dotenv-webpack').config()

const { encrypt, decrypt} = require("./Encryption")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

console.log('Connected to DB!')

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