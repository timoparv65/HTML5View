var db = require('./database') // lataa database moduulin => database.js

// liitetty exports-objektiin funktio getAllPersons
// this function gets all documents from person collection
exports.getAllPersons = function(req,res){
    
    db.Person.find(function(err,data){ // haetaan kaikki
                   
        if (err){
            console.log(err.message);
            res.send("Error in database");
        } else{
            res.send(data);
        }
    });
}