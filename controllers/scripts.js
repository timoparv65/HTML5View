"use strict"; // jslint antaa varoituksen kaikista koodin osista, jotka ei hyvin
console.log("Here we go!!"); // menee selaiseen logiin. Crome=>lisää tyäkaluja/kehittäjän työkalut. Tulee consoleen debuggerissa


// onload-tapahtuma tehdään jquery-kirjastolla
// wait document ready event
// $ => jquery elementti
// document on jqueryn konstruktori. $ ottaa CSS-objektin/selektorin. Kun $(document) on valmis, palauttaa se jquery-objektin,
// joka trikkaa ready-funktion, joka aiheuttaa callback-funktion suorittamisen
$(document).ready(function(){
    
    console.log("jquery onload triggered");

    $("#head").css("background-color","lightblue").css("padding","20px").css("border-radius","8px");
    
    //$(".about").text("<b>New text</b>"); // tässä näkyy <b> ja </b>
    $(".about").html("<b>New text</b>") // teksti lihavoituna
    
    $("[data-dummy]").html("<p>Hello World</p>"); // hae elementti data-dummy
    
    var settings = { // luodaan objekti ajax:ia varten
        method:"GET", // löytyy jquery API => AJAX
        url:"http://localhost:28017/oma/person/",
        dataType:"jsonp",
        jsonp:"jsonp" // voidaan rikkoa cross domain policya
    };
    
    $.ajax(settings).done(function(data){// lähettään pyynnön url osoitteeseen. Jää odottamaan responsea, joka otetaan kiinni done-funktiolla
        console.log(data);
        
        for(var i = 0; i < data.rows.length; i++){ // käydään taulukko läpi. rows => kts. selaimen debuggerista
            var html = "<tr>" + // luodaan table row
                        "<td>" + data.rows[i].name + "</td>" + // luodaan table data
                        "<td>" + data.rows[i].address + "</td>" +
                        "<td>" + data.rows[i].age + "</td>" +
                        "</tr>";
            
            $(html).appendTo("tbody") // lisätään html-dokumentin <tdody> elementtiin
        }
        
    });
    
    //$.ajax({}); // {} on anonyymi objekti. Objektin voi määrittää myös erikseen
    
});

/* tai
$(document).ready(domReady);

function domReady(){
} */