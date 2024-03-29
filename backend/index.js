import express from "express";
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123fallout",
    database: "mood_test"
})

// NOTE: probably delete this, just for testing
app.get('/', (req, res) => {
    res.json('from backend')
})

app.listen(8800, () => {
    console.log('Connected to backend')
})