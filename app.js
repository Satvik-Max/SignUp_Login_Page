const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2');

const app = express();

app.set('view engine' , 'ejs')
app.use(bodyParser.urlencoded({extended: true}));


const con = mysql.createConnection({
  host: 'localhost',       
  user: 'root',   
  password: '2107067',
  database: 'Project'
});
con.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
    console.log('Connected to MySQL database');
});

app.get("/login", function (request, response) {
  response.sendFile(__dirname + "/login.html");
});

app.get("/register", function (request, response) {
    response.sendFile(__dirname + "/index.html");
  });
  
app.post("/login", function (req, res) 
{
  var user = req.body.username;
  var pass = req.body.password;
  con.query("SELECT * FROM node_db WHERE username = ? AND password = ?",[user,pass],
  function(err,result){
  if (err) throw "Data Not Fetched Error "
  if(result.length===0) res.render('invalid');
  if(result.length > 0) res.render('index2', { user: user , pass : pass});
})
 
});

app.post("/register", function (req, res) 
{
  var user = req.body.username;
  var pass = req.body.password;
  con.query("insert into node_db values(? , ?)",[user,pass],
  function(err){
    if (err) throw "Data Not Inserted Error "
    console.log(" Inserted ");
    res.render('index', { user: user , pass : pass});
  })
});


app.listen(3000, function () {
  console.log("Server is running");
});
