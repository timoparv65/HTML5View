var express = require("express"); // mikä on express ??

var db = require('./queries');

var router = express.Router();

// Handle GET request for /persons context
router.get('/',function(req,res){ // mitä '/' tekee ?
    db.getAllPersons(req,res);
});

// Handle POST request for /persons context
router.post('/',function(req,res){
    db.saveNewPerson(req,res);
});

router.put('/',function(req,res){
    
});

router.delete('/',function(req,res){
    
});

module.exports = router; // käytetään middlewarena

