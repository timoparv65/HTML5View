var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/27017/oma', connectionStatus)


// connection callback for fail and ok cases
function connectionStatus(err,ok){
    if(err){
        console.log(err.message);
    } else{
        console.log("We are connected!")
    }
}


var Person = mongoose.model('Person',{ // collection Person
    name:String,
    address:String,
    age:{type:Number} // miksi ?
},'person'); // miksi tuli person loppuun

//using exports object you expose the data to other modules
experts.Person = Person;

exports.myFunction = function(){
    console.log("This ")
}