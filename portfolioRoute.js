import express from 'express' ;
import dotenv from 'dotenv' ;
dotenv.config();

const db = require("./data/DBconnection");

const router = express.Router() ;

router.get("/portfolio", (req, res) => {
    db.query("SELECT * FROM portfolio", function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    });
  });
  
router.get("/portfolio/:id", (req, res) => {
    db.query(
      `SELECT * FROM portfolio WHERE id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
      }
    );
  });
  
router.post("/portfolio", (req, res) => {
    db.query(
      "INSERT INTO portfolio (projectname, image, description) VALUES (?, ?)",
      [req.body.projectname, req.body.image, req.body.description],
      function (error, results, fields) {
        if (error) throw error;
        return res.status(201).send(results);
      }
    );
});

router.delete("/portfolio/:id", (req, res) => {
    db.query(
      `DELETE FROM portfolio WHERE id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        return res.status(200).send(results);
      }
    );
  });

router.put("/portfolio/:id", (req, res) => {
  const { name, image, description } = req.body;
  db.query(
    `UPDATE portfolio SET name="${name}", image="${image}", description="${description}" WHERE id=${req.params.id}`,
    function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send(results);
    }
  );
});

export default router