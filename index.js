var express = require("express"); // express ?
var path = require("path"); // mitä tarkoittaa ?
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');

var app = express(); // mitä tekee ??
//============================ Middlewares=============================
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(database.Person);
    database.myFunction();
    next(); //Send request forward in stack
})

// Mitä alla olevat tekee ???
app.use('/',express.static(path.join(__dirname, 'views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));

app.use('/persons',person); // jos get-pyyntö, kutsuu person.js:stä get-metodia

//============================ Routers ================================

/*
pp.get("persons", function(req,res){
   queries.getAppPersons(req,res);
}); */

app.listen(3000); // mitä tekee
