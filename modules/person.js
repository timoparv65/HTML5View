var express = require("express"); // mikä on express ??

var db = require('./queries');

var router = express.Router();

router.get('/',function(req,res){ // mitä '/' tekee ?
    db.getAllPersons(req,res);
});

router.post('/',function(req,res){
    
});

router.put('/',function(req,res){
    
});

router.delete('/',function(req,res){
    
});

module.export = router; // käytetään middlewarena

