var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/oma', connectionStatus)


// connection callback for fail and ok cases
function connectionStatus(err,ok){
    if(err){
        console.log(err.message);
    } else{
        console.log("We are connected!")
    }
}


var Person = mongoose.model('Person',{ // collection Person
    name:String, // tai {typa:String,default:"John Doe"}
    address:String,
    age:{type:Number} // tai {type:Number,min:0,max:120}
},'person'); // person => tietokannan collection 'person' on jo olemassa. Muuten luo 'person':in.

//using exports object you expose the data to other modules
exports.Person = Person; // käytetään mm. queries-moduulissa

exports.myFunction = function(){
    console.log("This ")
}