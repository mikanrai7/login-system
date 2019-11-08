/* brings in express, mysql */
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'

});

//connect
db.connect((err)=>{
    if(err){
        throw err;
    }
console.log('Mysql connected...');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use(function (req, res , next ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, email, authtoken, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.post('/register',(req,res)=>{
    let { name, email, password} = req.body;
    let sql1 = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    let sql = `INSERT INTO users VALUES('${name}', '${email}', '${password}');`;
    console.log(email)
    db.query(sql1,async (err, result)=>{
        if(err) throw err;
        let existUser = result.length ==0? false : true;
        if(existUser){
           
            res.send( {message: "User exists"});
        }
        else{
    
        console.log(sql);
        db.query(sql,(err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send( {message:'User Created.'})
        })
    }})
    });

app.post('/login', (req, res)=>{
    let {name, email, password}= req.body;
    let sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    db.query(sql, (err,result)=>{
        if(err) throw errr;
        let existUser = result.length === 0? false : true;

        if(existUser){
            res.send("logged in");
        }

        else{
            res.send("user doesnot exist");
        }
        
    }) 
})


app.listen('3000',()=>{
    console.log('server started on port 3000');
});