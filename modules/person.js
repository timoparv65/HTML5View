// Backend tiedosto

var express = require("express"); // mikä on express ??

var db = require('./queries');

var router = express.Router();

// Handle GET request for /persons context
router.get('/',function(req,res){ // '/' = root conteksti
    db.getAllPersons(req,res);
});

// 11.11.2015 lisäharj. kts. vihko, kohta 3
router.get('/:nimi',function(req,res){
    //console.log("Get with name router called");
    db.findPersonsByName(req,res); // 11.11.2015 lisäharj. kts. vihko, kohta 4
});


// Handle POST request for /persons context
router.post('/',function(req,res){
    db.saveNewPerson(req,res);
});

router.put('/',function(req,res){
    db.updatePerson(req,res);
});

router.delete('/:id',function(req,res){ // argumenttina tulee id
    //console.log(req.params.id); // params objekti, jolla atribuutti id
    db.deletePerson(req,res);
});

module.exports = router; // käytetään middlewarena
