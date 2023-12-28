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
    database: 'taskmaesterdb',
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const authenticateUser = (req, res, next) => {
    if(req.session&&req.session.membername){
        next();
    }
    
}


export let yourTeams = [];
export let yourTasks = [];
export let yourMembers = [];



app.get('/', (req, res) =>{
    app.use(express.static("static"));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '/static/login.html'));

})

app.get('/Projects', (req, res) => {
    app.use(express.static("static"));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '/static/Projects.html'));
})

app.get('/getProjects', (req, res) => {
    const project = req.session.membername;
    const sql = 'SELECT projects.projectname FROM accounts INNER JOIN projects ON accounts.membername=projects.membername WHERE accounts.membername=?'
    pool.query(sql, [project], (err, results) => {
        if(err) throw err;
        if(results.length>0){
            console.log(results);
            res.send(results);
        }
    })
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

app.get('/Index', (req, res) => {
    app.use(express.static("static"));
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname, '/static/index.html'));

})

app.get('/Teams', (req, res) => {
    app.use(express.static("static"));
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   res.sendFile(path.join(__dirname, '/static/Teams.html'));
})

app.get('/getTeams', authenticateUser, (req, res) => {
    const membname = req.session.membername;
    const query = 'SELECT teams.teamname FROM projects INNER JOIN teams ON projects.projectname=teams.projectname WHERE projects.membername=?';
    pool.query(query, [membname], (err, tmresults) => {
        if (err) throw err;
        if(tmresults.length>0){
            res.status(200).send(tmresults);
        }
        console.log(tmresults);
    })   
    })

app.get('/getTeamProjects', (req, res) => {
    const project = req.session.membername;
    const sql = 'SELECT projects.projectname FROM accounts INNER JOIN projects ON accounts.membername=projects.membername WHERE accounts.membername=?'
    pool.query(sql, [project], (err, results) => {
        if(err) throw err;
        if(results.length>0){
            console.log(results);
            res.send(results);
        }
    })
})    

app.get('/Tasks', (req, res) => {
    app.use(express.static("static"));
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.sendFile(path.join(__dirname, '/static/Tasks.html'));
})

app.get('/getTasks', authenticateUser, (req, res) => {
    const task = req.session.membername;
    const query = 'SELECT tasks.taskname, tasks.teamname FROM projects INNER JOIN teams ON projects.projectname=teams.projectname INNER JOIN tasks ON teams.teamname=tasks.teamname WHERE projects.membername=?';
    pool.query(query, [task], (err, tskresults) => {
        if (err) throw err;
        if(tskresults.length>0){
        console.log(tskresults);
        res.send(tskresults);
        }
    })
})

app.get('/getLocation', authenticateUser, (req, res) => {
    const taskloc = req.session.membername;
    const query = 'SELECT tasks.taskname, tasks.teamname, tasks.coordinates, tasks.description FROM projects INNER JOIN teams ON projects.projectname=teams.projectname INNER JOIN tasks ON teams.teamname=tasks.teamname WHERE projects.membername=?';
    pool.query(query, [taskloc], (err, locresults) => {
        if (err) throw err;
        if(locresults.length>0){
        console.log(locresults);
        res.send(locresults);
        }
    })
})

app.get('/Members', (req, res) => {
    app.use(express.static("static"));
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   res.sendFile(path.join(__dirname, '/static/Members.html'));
})

app.get('/getMembers', authenticateUser, (req, res) => {
    const memb = req.session.membername;
    const query = 'SELECT members.membername FROM projects INNER JOIN teams ON projects.projectname=teams.projectname INNER JOIN members ON teams.teamname=members.teamname WHERE projects.membername=?';
    pool.query(query, [memb], (err, results) => {
        if (err) throw err;
        if(results.length>0){
        console.log(results);
        res.send(results);
        }
    })
})

app.get('/getMemberTeams', (req, res) => {
    const memb = req.session.membername;
    const sql = 'SELECT teams.teamname FROM projects INNER JOIN teams ON projects.projectname=teams.projectname WHERE projects.membername=?'
    pool.query(sql, [memb], (err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.send(results);
        }
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
    const membname = newInfo['membername'];
    let sql = "INSERT INTO accounts SET ?"
    pool.query(sql, newInfo, (err, result) => {
        if(err) throw err;
        console.log(result);
        req.session.loggedin=true;
        req.session.membername = membname;
        res.redirect('/Dashboard');
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
    const sql = 'SELECT * FROM accounts WHERE membername = ? AND membemail = ?';
    pool.query(sql, [membername, membemail], (err, result) => {
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

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    })
})

app.post('/Projects', (req, res) => {
    const memb = req.session.membername;
    app.use(express.static("static"));
    const projInput = req.body;
    const fproj = Object.values(projInput);
    const fpInput = {
        projectname: String(fproj),
        membername: String(memb)
    }
console.log(fproj[0]);
console.log(memb);
    const schema = Joi.object({
        projectname : Joi.string().max(20).required(),
        membername : Joi.string().max(50).required()
    });
    const result = schema.validate(fpInput);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    let sql = 'INSERT INTO projects SET ?';
    pool.query(sql, fpInput, (err, results) => {
        if(err) throw err;
        console.log(results);
    })
    res.status(204).json(req.body);
})

app.post('/Teams', (req, res) => {
    app.use(express.static("static"))
    const teamInput = req.body;

    const schema = Joi.object({
        teamname : Joi.string().max(12).required(),
        projectname : Joi.string().max(20).required()
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