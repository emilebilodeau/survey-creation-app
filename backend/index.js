import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mood_test",
});

// NOTE: creating the table survey_answers by default, since all the questions are
// hard coded in the client. this will need to change when i implement the survey
// creation feature - there will be one table per survey, and each survey will have
// its own corresponding table for the answers
// NOTE: once survey creation is implemented, maybe replace this for an initial query to check if atleast
// one survey exists, and pick the first one automatically/some other kind of behaviour?
db.query("SHOW TABLES LIKE 'survey_answers'", (err, result) => {
  if (err) throw err;
  if (result.length === 0) {
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
      console.log("Table created");
    });
  } else {
    console.log("Table already exists");
  }
});

// creates a new survey table and an associated answer table based on the list of questions created
app.post("/createsurvey", (req, res) => {
  // first query: checking how many surveys exists
  db.query("SHOW TABLES LIKE 'test_survey%'", (err, result) => {
    if (err) throw err;
    // the survey name is created automatically by incrementing a number at the end of the name
    // using the length of the list of existing surveys
    const tableNumber = result.length + 1;
    const createSurveyTable = `
    CREATE TABLE test_survey${tableNumber} (
      id INT NOT NULL PRIMARY KEY,
      question VARCHAR(255),
      type VARCHAR(45),
      alias VARCHAR(45)
    )
    `;

    // second query: create the survey table
    db.query(createSurveyTable, (err) => {
      if (err) throw err;
      console.log("New survey created");
      // inserting multiple rows of data
      const insertQuestions = `INSERT INTO test_survey${tableNumber} (id, question, type, alias) VALUES ?`;
      const questions = [];
      const columns = [];
      // this will also be used to build the query for the creation of the answers table
      req.body.forEach((element) => {
        // for survey table creation
        questions.push([
          element["id"],
          element["question"],
          element["type"],
          element["alias"],
        ]);
        // for survey answer table creation
        if (element.type === "yesNo") {
          columns.push(`${element.alias} VARCHAR(45)`);
        } else if (element.type === "text") {
          columns.push(`${element.alias} VARCHAR(255)`);
        } else if (element.type === "number" || element.type == "linear") {
          columns.push(`${element.alias} FLOAT`);
        }
      });

      // third query: insert the questions into survey table
      db.query(insertQuestions, [questions], (err) => {
        if (err) throw err;
        console.log("Survey questions successfully added");
      });

      const columnDefinition = columns.join(", ");
      const createAnswerTable = `
      CREATE TABLE answers_test_survey${tableNumber} (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        timestamp FLOAT,
        ${columnDefinition}
      )
    `;

      // fourth query: create survey answer table
      db.query(createAnswerTable, (err, data) => {
        if (err) {
          return res.json(err);
        }
        console.log("New survey answer table created");
        return res.json(data);
      });
    });
  });
});

// Home.tsx endpoints
app.get("/tables", (req, res) => {
  db.query("SHOW TABLES LIKE 'test_survey%'", (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
});

// TODO: for all the endpoints going forward, look into "Preparing Queries" in the mysql github page
// specifically how to use this syntax: "SELECT * FROM ?? WHERE ?? = ?"

// Data.tsx endpoints
app.get("/getdata", (req, res) => {
  const q = "SELECT * FROM survey_answers ORDER BY timestamp";
  db.query(q, (err, data) => {
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

// Table.tsx endpoints
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM survey_answers WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      return json.son(err);
    }
    return res.json(data);
  });
});

// Update.tsx endpoints
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

// NOTE: subject to a lot of change during survey creation implementation
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
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
                    
                WHERE id = ?`;

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
    req.body.extra,
  ];

  db.query(q, [...values, id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

// Form.tsx endpoints
app.get("/questions/:table", (req, res) => {
  const q = "SELECT * FROM ??";
  const table = req.params.table;
  db.query(q, [table], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/submit/:table", (req, res) => {
  const q = `INSERT INTO ?? (??) VALUES (?)`;
  const table = `answers_${req.params.table}`;
  const columns = [];
  const values = [];

  // need to extract the timestamp from the body, and set it a the top of the values list
  const { timestamp, ...body } = req.body;

  // key-value order is guaranteed to remain intact when iterating using Object.entries as of ES6
  for (const [k, v] of Object.entries(body)) {
    columns.push(k);
    values.push(v);
  }

  columns.unshift("timestamp");
  values.unshift(timestamp);

  db.query(q, [table, columns, values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
