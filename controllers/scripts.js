"use strict"; // jslint antaa varoituksen kaikista koodin osista, jotka ei hyvin
console.log("Here we go!!"); // menee selaiseen logiin. Crome=>lisää tyäkaluja/kehittäjän työkalut. Tulee consoleen debuggerissa


// onload-tapahtuma tehdään jquery-kirjastolla
// wait document ready event
// $ => jquery elementti
// document on jqueryn konstruktori. $ ottaa CSS-objektin/selektorin. Kun $(document) on valmis, palauttaa se jquery-objektin,
// joka trikkaa ready-funktion, joka aiheuttaa callback-funktion suorittamisen
$(document).ready(function(){ // ready() ajetaan kun tärmötöään </body> elementtiin index.html:ssä
    
    console.log("jquery onload triggered");

    $("#head").css("background-color","lightblue").css("padding","20px").css("border-radius","8px");
    
    //$(".about").text("<b>New text</b>"); // tässä näkyy <b> ja </b>
    $(".about").html("<b>New text</b>") // teksti lihavoituna
    
    $("[data-dummy]").html("<p>Hello World</p>"); // hae elementti data-dummy
    
    var settings = { // luodaan objekti ajax:ia varten
        method:"GET", // löytyy jquery API => AJAX. Tämä attribuutti on oletusarvoisesti GET
        url:"http://localhost:3000/persons", // miksi ???
        dataType:"json",
    };
    
    // kts. jQuery.ajax()
    $.ajax(settings).done(function(data){// lähettään pyynnön url osoitteeseen. Jää odottamaan responsea, joka otetaan kiinni done-funktiolla
        console.log(data);
        console.log(Object.keys(data)); // tulostetaan artibuuttien nimet (kutsutaan myös avaimiksi/keys) json objektista. Miksi muuttui edelliseen verrattuna ???
        
        // luodaan otsikot dynaamisesti
        if (data.length > 0) { // tarkista onko tietokannassa dataa. Miksi rows lähti pois ? ennen data.rows.length
            var headers = Object.keys(data);
            
            var row = $("<tr></tr>")
            for(var i = 1; i < headers.length; i++){
                // luo otsikko ja lisää se riviin
                $("<th>" + headers[i] + "</th>").appendTo(row) // appendTo lisää childiksi
            }
            $(row).appendTo("thead") // lisää rivi thead osioon
        }
        
        
        
        // luo taulukon sisältö dynaamisesti
        for(var i = 0; i < data.length; i++){ // käydään taulukko läpi. rows => kts. selaimen debuggerista
            
            var html = "<tr>" + // luodaan table row
                        "<td>" + data[i].name + "</td>" + // luodaan table data
                        "<td>" + data[i].address + "</td>" +
                        "<td>" + data[i].age + "</td>" +
                        "<td>" + data[i].email + "</td>" +
                        "</tr>";
            
            $(html).appendTo("tbody") // lisätään html-dokumentin <tdody> elementtiin
        }
        
    });
    
});
