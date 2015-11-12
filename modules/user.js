// USER-moduulille oma moduuli
// Backend tiedosto

var query = require('./queries');

/**
  * This file is a router for User resourse.
  * Version 0.0.1
  * Author: Timo Parviainen
  * Description: Created this new file
  */

var express = require("express");
//var db = require(./queries);

var router = express.Router();

// 12.11.2015
router.get('/:username',function(req,res){
    query.getFriendByUsername(req,res);
});


// This router handles a request to url http://localhost:3000/friends/login
router.post('/login',function(req,res){
    
    query.loginFriend(req,res);
});

// This router handles a request to url http://localhost:3000/friends/register
router.post('/register',function(req,res){
    
    query.registerFriend(req,res);
});


module.exports = router;