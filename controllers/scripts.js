"use strict"; // jslint antaa varoituksen kaikista koodin osista, jotka ei hyvin
console.log("Here we go!!"); // menee selaiseen logiin. Crome=>lisää tyäkaluja/kehittäjän työkalut. Tulee consoleen debuggerissa

// selain luo window-ohjektin, luo myäs navigator (selainhistoria) ja document-objektit
// onload on tapahtuma(event)/callback-funktio, niihin liitetään funtoi JavaScriptissä => onload välittää event-objektion funktiolle
/*
window.onload = function(event){
    console.log(event);
    para1.innerHTML = "Changed from JS";
    para1.style.backgroundColor = "yellow"
};
*/
//window.onload = domReady(); // funktion kutsu
//window.onload = domReady; // funktion sijoittaminen
/*
function domReady(event) {
    return 2;
}

function someFunction(nimi){
    console.log(nimi)
}

someFunction(); => toimii. Ei tulosta mitään, tai undefined
someFunction("Markus"); => toimii
someFunction(21); => toimii

*/

// onload-tapahtuma tehdään jquery-kirjastolla
// wait document ready event
// $ => jquery elementti
// document on jqueryn konstruktori. $ ottaa CSS-objektin/selektorin. Kun $(document) on valmis, palauttaa se jquery-objektin,
// joka trikkaa ready-funktion, joka aiheuttaa callback-funktion suorittamisen
$(document).ready(function(){
    
    console.log("jquery onload triggered");
    //$("nav").css("background-color","lightblue") // hae html-dokumentista kaikki nav-elementit, muutat niiden tyylit
    /* sama homma kuin yllä
    var data = document.getElementsByTagName("nav")
    for(i=0; i < data.length;i++){
        data[i].style.backgroundColor = "lightblue"
    }
    */
    
    //$("nav,p").css("background-color","lightblue") // myös kaksi määritelty yhtäaikaa
    //$("[class]").css("background-color","lightblue") //
    $("#head").css("background-color","lightblue").css("padding","20px").css("border-radius","8px");
    
    $(".about").text("<b>New text</b>"); // tässä näkyy <b> ja </b>
    //$(".about").html("<b>New text</b>") // t
    
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