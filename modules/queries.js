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