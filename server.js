import Joi from 'joi';
import express from 'express';
import session from 'express-session';
const app = express();
import path from 'path';
import cheerio from 'cheerio'
import jsdom from 'jsdom';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';
import { Session } from 'inspector';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Watchdogsroot#3',
    database: 'finaltrackerdb',
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


export let yourTeams = [];
export let yourTasks = [];
export let yourMembers = [];



app.get('/', (req, res) =>{
    app.use(express.static("static"));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '/static/login.html'));

})

app.get('/Dashboard', (req, res) =>{
    app.use(express.static("static"));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '/static/tracker.html'));

})

app.get('/login', (req, res) => {
    app.use(express.static("static"));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '/static/login.html'));

})

app.get('/Teams', (req, res) => {
    app.use(express.static("static"));
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   res.sendFile(path.join(__dirname, '/static/Teams.html'));
})

app.get('/getTeams', (req, res) => {
    const query = 'SELECT DISTINCT teamname FROM teams'
    pool.query(query, (err, tmresults) => {
        if (err) throw err;
        console.log(tmresults);
        res.send(tmresults);
    })   
    })

app.get('/Tasks', (req, res) => {
    app.use(express.static("static"));
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.sendFile(path.join(__dirname, '/static/Tasks.html'));
})

app.get('/getTasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    pool.query(query, (err, tskresults) => {
        if (err) throw err;
        console.log(tskresults);
        res.send(tskresults);
    })
})

app.get('/getLocation', (req, res) => {
    const query = 'SELECT * FROM tasks';
    pool.query(query, (err, locresults) => {
        if (err) throw err;
        console.log(locresults);
        res.send(locresults);
    })
})

app.get('/Members', (req, res) => {
    app.use(express.static("static"));
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   res.sendFile(path.join(__dirname, '/static/Members.html'));
})

app.get('/getMembers', (req, res) => {
    const query = 'SELECT DISTINCT membername FROM members';
    pool.query(query, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})

app.get('/Guide', (req, res) => {
    app.use(express.static("static"));
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   res.sendFile(path.join(__dirname, '/static/Guide.html'));
})

app.post('/signup',  (req,res) => {
    app.use(express.static("static"))
    const newInfo = req.body;

    const schema = Joi.object({
        membername : Joi.string().max(40).required(),
        membemail : Joi.string().trim().email().required(),
    });

    const result = schema.validate(newInfo);
    console.log(result);
    if(result.error){
    return res.status(400).send(result.error.details[0].message);
    }
    let sql = "INSERT INTO accounts SET ?"
    pool.query(sql, newInfo, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.redirect('/login')
    })
   
})

app.post('/login', (req, res) => {
    app.use(express.static("static"))
    const newInfo = req.body;

    const schema = Joi.object({
        membername : Joi.string().max(40).required(),
        membemail : Joi.string().trim().email().required(),
    });

    const result = schema.validate(newInfo);
    console.log(result);
    if(result.error){
    return res.status(400).send(result.error.details[0].message);
    }
    const membername = newInfo['membername'];
    const membemail = newInfo['membemail']
    pool.query('SELECT * FROM accounts WHERE membername = ? AND membemail = ?', [membername, membemail], (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            req.session.loggedin = true;
            req.session.membername = membername;
            res.redirect('/Dashboard')
        }
        else{
            res.status(400).send("This account does not exist");
        }
    })

})

app.post('/Teams', (req, res) => {
    app.use(express.static("static"))
    const teamInput = req.body;

    const schema = Joi.object({
        teamname : Joi.string().max(12).required()
    });

    const result = schema.validate(teamInput);
    console.log(result);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const myTeam = JSON.stringify(teamInput);
    let sql = "INSERT INTO teams SET ?";
    yourTeams.push(teamInput);
    pool.query(sql, teamInput, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
    console.log(yourTeams);
    res.status(204).json(req.body);
})

app.post('/Tasks', (req, res) => {
    const taskInput = req.body;
    const schema = Joi.object({
        taskname : Joi.string().max(10).required(),
        teamname : Joi.string().max(20).required(),
        coordinates: Joi.required(),
        description: Joi.string().max(300).required()
    })

    const result = schema.validate(taskInput);
    console.log(result);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    let sql = "INSERT INTO tasks SET ?";
    yourTasks.push(taskInput);
    pool.query(sql, taskInput, (err, result) => {
        if(err) throw err;
        console.log(result);
    })
    console.log(yourTasks);
    res.status(204).json(req.body);
})

app.post('/Members', (req, res) => {
    const memberInput = req.body;
    const schema = Joi.object({
        membername : Joi.string().max(20).required(),
        membemail : Joi.string().trim().email().required(),
        teamname : Joi.string().max(20).required()
    });

    const result = schema.validate(memberInput);
    console.log(result);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    
    let sql = 'INSERT INTO members SET ?'
    yourMembers.push(memberInput);
    pool.query(sql, memberInput, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
    console.log(yourMembers);
    res.status(204).json(req.body);
})

const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log("Port "+port+" is doing just fine!")
})