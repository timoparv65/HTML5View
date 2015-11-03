var express = require("express"); // luodaan serveri, require lataa
var path = require("path"); // lataa path-moduulin, joka auttaa hakemistopolkujen käsittelyssä. kts nodejs:n AP
var database = require('./modules/database'); // ladataan oma dokuuli
var queries = require('./modules/queries'); // ladataan oma dokuuli
var person = require('./modules/person'); // ladataan oma dokuuli

var app = express(); //instantioi serveri

//============================ Middlewares=============================
app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path); // mihin kontekstiin
    console.log(__dirname); // noden oma muuttuja. sis. lopun siihen hakemistoon mistä node käynnistettiin
    console.log(database.Person);
    database.myFunction();
    next(); //Send request forward in stack
})

// Mitä alla olevat tekee ???
app.use('/',express.static(path.join(__dirname, 'views'))); // '/' = konteksti. Jos '/', sitten hakee views-hakemistosta etsii index.html
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));

app.use('/persons',person); // jos get-pyyntö, kutsuu person.js:stä get-metodia

//============================ Routers ================================

/*
pp.get("persons", function(req,res){
   queries.getAppPersons(req,res);
}); */

app.listen(3000); // mitä porttia serveri alkaa kuuntelemaan (tuotantovaiheessa), numero oltava 3000 tai suurempi
