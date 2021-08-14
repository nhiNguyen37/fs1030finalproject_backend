import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import userRoute from './userRoute'
import resumeRoute from './resumeRoute'
import portfolioRoute from './portfolioRoute'

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'Hi123456',
    database: 'fs1030project'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use('/', userRoute)
app.use('/', resumeRoute)
app.use('/', portfolioRoute)


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})