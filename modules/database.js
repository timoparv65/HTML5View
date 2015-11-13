var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/oma', connectionStatus)


// connection callback for fail and ok cases
function connectionStatus(err,ok){
    if(err){
        console.log(err.message);
    } else{
        console.log("database.js/connectionStatus: We are connected!")
    }
}

var User = mongoose.model('User',{
    username:{type:String,unique:true}, // ei voi tallentaa kahta samannimistä henkilöä
    //email:{type:String,unique:true}, // omassa sovelluksessa voi olla tälläinen kenttä
    password:String, // kryptataan myöhemmin
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'Person'}] // tallenentaan tänne Person:in object id:n eli _id. ref => viitataan Person collectioniin
});

var Person = mongoose.model('Person',{ // collection Person
    name:String, // tai {type:String,default:"John Doe"}
    address:String,
    age:{type:Number} // tai {type:Number,min:0,max:120}
},'person'); // person => tietokannan collection 'person' on jo olemassa. Muuten luo 'person':in.

//using exports object you expose the data to other modules
exports.Person = Person; // käytetään mm. queries-moduulissa
exports.Friends = User;

exports.myFunction = function(){
    console.log("This ")
}