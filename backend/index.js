import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();

// middleware that automatically parse JSON formatted request bodies
app.use(express.json());
// middleware that allows our frontend client to make requests 
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123fallout",
    database: "mood_test"
});

app.get("/test", (req, res) => {
    const q = "SELECT * FROM survey_answers"
    db.query(q, (err,data)=> {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
});

app.post('/submit', (req, res) => {
    const q = "INSERT INTO survey_answers (`test_column`) VALUES (?)";
    const values = [
        req.body.test_column
    ];
    
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

app.listen(8800, () => {
    console.log("Connected to backend");
})