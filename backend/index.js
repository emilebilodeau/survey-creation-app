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
// NOTE: once survey creation is implemented, maybe replace this for an initial query to check if atleast
// one survey exists, and pick the first one automatically/some other kind of behaviour?
db.query("SHOW TABLES LIKE 'survey_answers'", (err, result) => {
    if (err) throw err;
    if (result.length === 0){
        // create table if not exists
        const createTableQuery = `
        CREATE TABLE survey_answers (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            timestamp FLOAT,
            mood FLOAT,
            sleep FLOAT,
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

// creates a new survey table and an associated answer table based on the list of questions created
app.post("/createsurvey", (req, res) => {
    // TODO: figure out naming for table
    const createSurveyTable = `
    CREATE TABLE survey_test (
        id INT NOT NULL PRIMARY KEY,
        question VARCHAR(255),
        type VARCHAR(45),
        alias VARCHAR(45)
    )
    `;

    db.query(createSurveyTable, (err) => {
        if (err) throw err;
        console.log('New survey created');
    });

    // inserting multiple rows of data
    const insertQuestions = "INSERT INTO survey_test (id, question, type, alias) VALUES ?";
    const questions = [];
    const columns = [];
    // this will also be used to build the query for the creation of the answers table
    req.body.forEach((element) => {
        // for survey table creation
        questions.push([element['id'], element['question'], element['type'], element['alias']]);
        // for survey answer table creation
        // TODO: change to alias when possible
        if (element.type === "yesNo"){
            columns.push(`${element.question} VARCHAR(45)`);
        } else if (element.type === "text"){
            columns.push(`${element.question} VARCHAR(255)`);
        } else if (element.type === "number" || element.type == "linear"){
            columns.push(`${element.question} FLOAT`);
        };
    });

    db.query(insertQuestions, [questions], (err) => {
        if (err) throw err;
        console.log('Survey questions successfully added');
    });

    // TODO: ensure that there are no duplicate questions; columns need to be unique
    const columnDefinition = columns.join(", ")
    let createAnswerTable = `
    CREATE TABLE survey_test_answers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    timestamp FLOAT,
    ${columnDefinition}
    );
    `;

    db.query(createAnswerTable, (err, data) => {
        if (err) {
            return res.json(err);
        }
        console.log('New survey answer table created')
        return res.json(data);
    });

});

app.get("/getdata", (req, res) => {
    const q = "SELECT * FROM survey_answers ORDER BY timestamp";
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

app.get("/getrow/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM survey_answers WHERE id = ?";
    db.query(q, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const q = "DELETE FROM survey_answers WHERE id = ?";
    db.query(q, [id], (err, data) => {
        if (err){
            return json.son(err);
        }
        return res.json(data)
    });
});

// TODO: find a better way to do this during survey creation implementation
app.post('/submit', (req, res) => {
    const q = `INSERT INTO survey_answers (timestamp, mood, sleep, sleepDisruption, exercise, outside, 
        meditation, breakRoutine, socialInteraction, rumination, drank, extra) VALUES (?)`;
    const values = [
        req.body.timestamp,
        req.body.mood,
        req.body.sleep,
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

// NOTE: also subject to a lot of change during survey creation implementation
app.put('/update/:id', (req, res) => {
    const id = req.params.id
    const q = `UPDATE survey_answers 
                SET 
                    timestamp = ?,
                    mood = ?, 
                    sleep = ?, 
                    sleepDisruption = ?, 
                    exercise = ?, 
                    outside = ?, 
                    meditation = ?, 
                    breakRoutine = ?, 
                    socialInteraction = ?, 
                    rumination = ?, 
                    drank = ?, 
                    extra = ?
                    
                WHERE id = ?`

        const values = [
            req.body.timestamp,
            req.body.mood,
            req.body.sleep,
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
        
        db.query(q, [...values, id], (err, data) => {
            if (err) {
                return res.json(err);
            }
            return res.json(data);
        })
})

app.listen(8800, () => {
    console.log("Connected to backend");
})