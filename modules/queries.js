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
       //res.send("Database action done");
        res.redirect('/'); // make a redirect to the root context...palaa aloitussivulle, joka oli root context
    });
}

// This function deletes one person from our collection
exports.deletePerson = function(req,res){
    
    // what happens here is that req.params.id return string "id=535345785fsdfsd".
    // split() function splits the string form "=" and creates an array where [0] contains
    // "id" and [1] contains "535345785fsdfsd"
    var id = req.params.id.split("=")[1];
    console.log(id);

    db.Person.remove({_id:id},function(err){ // kts db.person.find. => _id on avain, id on arvo
        if(err){
            res.send(err.message);
        } else {
            res.send("Delete ok")
        }
    });

}

// this method updates one person info
// kts. Google: mongoose update document
exports.updatePerson = function(req,res){

    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age
    };

    db.Person.update({_id:req.body.id}, updateData, function(err){
       //res.send("updated") ;
        res.send({data:"ok"});
    });
     
}

// 11.11.2015 lisäharj. kts. vihko, kohta 4
// This function searches database by name or by begin letters of name
exports.findPersonsByName = function(req,res){
    var name = req.params.nimi.split("=")[1];
    console.log("name:" + name);

    db.Person.find({name: {'$regex':'^' + name,'$options':'i'}},function(err,data){
       if (err)  {
           res.send('error');
       } else {
           res.send(data); // 11.11.2015 lisäharj. kts. vihko, kohta 5
       }
    });
}