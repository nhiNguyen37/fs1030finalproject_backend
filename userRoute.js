
import express from 'express' ;
import jwt from 'jsonwebtoken' ;
import dotenv from 'dotenv' ;
dotenv.config();

import { verifyHash} from './util/hasher.js' ;

const db = require("./data/DBconnection");

const router = express.Router() ;

router.post('/auth', async (req, res) => {
    db.query(
        `SELECT * FROM users WHERE Username = '${req.body.username}'`,
        function (error, results, fields) {
            if (error) throw error;
            const user = results[0];


            if (!user) {
                return res.status(401).json({message: "incorrect credentials provided"});
            };  
            let password = req.body.password;
            let storedHash = user.password;
            verifyHash(password, storedHash).then(valid => {
                if (!valid) {
                    return res.status(401).json({message: "incorrect credentials provided"});
                };

                //Upon successful login: 
                const username = req.body.username;
                const token = jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "2h"});      
                return res.json({token});
            });
        }
    );
});


export default router