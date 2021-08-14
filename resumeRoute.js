import express from 'express' ;
import dotenv from 'dotenv' ;
dotenv.config();

const db = require("./data/DBconnection");

const router = express.Router() ;

router.get("/resume", (req, res) => {
    db.query("SELECT * FROM resume", function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    });
  });
  
router.get("/resume/:id", (req, res) => {
    db.query(
      `SELECT * FROM resume WHERE id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
      }
    );
  });
  
router.post("/resume", (req, res) => {
    db.query(
      "INSERT INTO resume (title, description, jobdate, school, schooldate, award, skills) VALUES (?, ?)",
      [
        req.body.title,
        req.body.description, 
        req.body.jobdate,
        req.body.school,
        req.body.schooldate,
        req.body.award,
        req.body.skills
    ],
      function (error, results, fields) {
        if (error) throw error;
        return res.status(201).send(results);
      }
    );
});

router.delete("/resume/:id", (req, res) => {
    db.query(
      `DELETE FROM resume WHERE id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
      }
    );
  });

router.put("/resume/:id", (req, res) => {
  const { title,description, jobdate, school, schooldate, award, skills } = req.body;
  db.query(
    `UPDATE portfolio SET title="${title}",description="${description}", jobdate="${jobdate}", school="${school}", schooldate="${schooldate}", award="${award}, skills="${skills}"}" WHERE id=${req.params.id}`,
    function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    }
  );
});

export default router