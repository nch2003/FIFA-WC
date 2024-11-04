const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Fifa_WC'
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (username, email, password) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json({error: err});
        }
        return res.json(data);
    })
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    console.log(data);
    if(data.length > 0) {
        return res.json("Login successful");
    } else {
        return res.json("Invalid credentials");
    }
  });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});