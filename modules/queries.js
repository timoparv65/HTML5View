// Backend tiedosto

// tehdään tänne kaikki tietokantaoperaatioihin liittyvät asiat

var db = require('./database') // lataa database moduulin => database.js

// liitetty exports-objektiin funktio getAllPersons (itse keksitty)
// this function gets all documents from person collection
exports.getAllPersons = function(req,res){
    
    db.Person.find(function(err,data){ // haetaan kaikki, koska ei annettu  hakuehtoa
                   
        if (err){
            console.log(err.message);
            res.send("Error in database"); // lähetetään clientille
        } else{
            res.send(data);
        }
    });
}

// This function saves new person information to person collection
exports.saveNewPerson = function(req,res){
    var personTemp = new db.Person(req.body); // luo uuden person objektin. Bodyssa tallessa json-objekti
    // save it to the database
    personTemp.save(function(err,ok){ // save tekee tiedon validoinnin, jos kaikki oikein kutsuu callback-funktiota function(err,ok)
       res.send("Database action done");
    });
}