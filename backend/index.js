import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mood_test"
});

// NOTE: creating the table survey_answers by default, since all the questions are 
// hard coded in the client. this will need to change when i implement the survey
// creation feature - there will be one table per survey, and each survey will have
// its own corresponding table for the answers
db.query("SHOW TABLES LIKE 'survey_answers'", (err, result) => {
    if (err) throw err;
    if (result.length === 0){
        // create table if not exists
        const createTableQuery = `
        CREATE TABLE survey_answers (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            timestamp FLOAT,
            mood FLOAT,
            sleepDisruption VARCHAR(45),
            exercise FLOAT,
            outside VARCHAR(45),
            meditation VARCHAR(45),
            breakRoutine VARCHAR(45),
            socialInteraction VARCHAR (45),
            rumination FLOAT,
            drank VARCHAR(45),
            extra VARCHAR(255)
        )
        `;
        db.query(createTableQuery, (err, data) => {
            if (err) throw err;
            console.log('Table created');
        });
    } else {
        console.log('Table already exists')
    }
})

app.get("/getdata", (req, res) => {
    const q = "SELECT * FROM survey_answers";
    db.query(q, (err,data)=> {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get("/getcol", (req, res) => {
    const q = "DESCRIBE survey_answers";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

// NOTE: might not be appropriate to use post for a delete operation, use delete?
app.post('/delete', (req, res) => {
    const q = `DELETE FROM survey_answers WHERE id = ${req.body.id}`;
    db.query(q, (err, data) => {
        if (err){
            return json.son(err);
        }
        return res.json(data)
    })
})


// TODO: find a better way to do this during survey creation implementation
app.post('/submit', (req, res) => {
    const q = `INSERT INTO survey_answers (timestamp, mood, sleepDisruption, exercise, outside, meditation, 
        breakRoutine, socialInteraction, rumination, drank, extra) VALUES (?)`;
    const values = [
        req.body.timestamp,
        req.body.mood,
        req.body.sleepDisruption,
        req.body.exercise,
        req.body.outside,
        req.body.meditation,
        req.body.breakRoutine,
        req.body.socialInteraction,
        req.body.rumination,
        req.body.drank,
        req.body.extra
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