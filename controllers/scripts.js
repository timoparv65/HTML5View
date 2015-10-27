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
    
    $(".about").text("<b>New text</b>") // tässä näkyy <b> ja </b>
    //$(".about").html("<b>New text</b>") // t
    
    $("[data-dummy]").html("<p>Hello World</p>");
    
});

/* tai
$(document).ready(domReady);

function domReady(){
} */