// Client tiedosto

"use strict"; // jslint antaa varoituksen kaikista koodin osista, jotka ei hyvin
console.log("Here we go!!"); // menee selaiseen logiin. Crome=>lisää tyäkaluja/kehittäjän työkalut. Tulee consoleen debuggerissa

// this variable is shown to every function
//var g_person_data;


// onload-tapahtuma tehdään jquery-kirjastolla
// wait document ready event
// $ => jquery elementti
// document on jqueryn konstruktori. $ ottaa CSS-objektin/selektorin. Kun $(document) on valmis, palauttaa se jquery-objektin,
// joka trikkaa ready-funktion, joka aiheuttaa callback-funktion suorittamisen
$(document).ready(function(){ // ready() ajetaan kun tärmötöään </body> elementtiin index.html:ssä
    
    console.log("jquery onload triggered");
    
    // 11.11.2015 lisäharj. kts. vihko
    // tällä reagoi Search-buttonin painallukseen => kohta 1
    $("#search").click(function(){
        // kohta 2.
        var text = $("#search_text").val(); // text on JavaScriptin string-objekti
        $.ajax({
            method:"GET",
            url:"http://localhost:3000/persons/nimi=" + text, // nimi on itse keksitty attribuutti, nimi:n sisältö on text. Toteutus ei tarkista onko text tyhjä
        //}); // luetaan input-fieldin tieto, kohta 1
        }).done(function(data){ // kohta 6. Kuuntelee responsea, serveri palauttaa objektin, joka otetaan kiinni done:lla
            console.log(data);
            
            // 11.11.2015 lisäharj. kts. vihko. Kohta 6
            $("tbody").children().remove(); // poistetaan alla oleva taulukko
            // luo taulukon sisältö dynaamisesti
            for(var i = 0; i < data.length; i++){ // käydään taulukko läpi. rows => kts. selaimen debuggerista

                var html = "<tr>" + // luodaan table row
                            "<td>" + data[i].name + "</td>" + // luodaan table data
                            "<td>" + data[i].address + "</td>" +
                            "<td>" + data[i].age + "</td>" +
                            "<td><input type='button' id=" + data[i]._id + " value='Modify'/></td>" + // Modify-napin luonti. Buttonille atribuutti id
                            "</tr>";

                $(html).appendTo("tbody") // lisätään html-dokumentin <tdody> elementtiin
            }
            
        });
    });
        

    $("#head").css("background-color","lightblue").css("padding","20px").css("border-radius","8px");
    
    //$(".about").text("<b>New text</b>"); // tässä näkyy <b> ja </b>
    $(".about").html("<b>New text</b>") // teksti lihavoituna
    
    $("[data-dummy]").html("<p>Hello World</p>"); // hae elementti data-dummy
    
    var settings = { // luodaan objekti ajax:ia varten
        method:"GET", // löytyy jquery API => AJAX. Tämä attribuutti on oletusarvoisesti GET
        url:"http://localhost:3000/friends/username=" + localStorage['username'], // backend on portissa 3000, konteksti friends. Luetaan username localStoragesta (kts. login_script.js)
        dataType:"json",
    };
    
    // kts. jQuery.ajax()
    $.ajax(settings).done(function(data){// lähettään pyynnön url osoitteeseen. Jää odottamaan responsea, joka otetaan kiinni done-funktiolla
        console.log(data);
        console.log(Object.keys(data)); // tulostetaan artibuuttien nimet (kutsutaan myös avaimiksi/keys) json objektista. Miksi muuttui edelliseen verrattuna ???
        
        // luodaan otsikot dynaamisesti
        if (data.length > 0) { // tarkista onko tietokannassa dataa. Miksi rows lähti pois ? ennen data.rows.length
            var headers = Object.keys(data[0]);
            
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
                        "<td><input type='button' id=" + data[i]._id + " value='Modify'/></td>" + // Modify-napin luonti. Buttonille atribuutti id
                        "</tr>";
            
            $(html).appendTo("tbody") // lisätään html-dokumentin <tdody> elementtiin
        }
        
        // lisätty tähän, koska alla oleva toteutus ei toimi
        $("[type=button]").click(function(click_data){
            
            for(var i=0; i < data.length; i++) {
                // check if id from button matches one of person id
                if(click_data.currentTarget.id == data[i]._id) {
                    buildModifyUI(data[i]);
                    break;
                }
            }
            
            console.log(click_data);
        });
        
    });
    
    /*
    // Get all elements from DOM where element has attribute 'type' with value 'button'. Then add event handler
    // for click event for each of them
    // kts jquery.com => API => events => mouse event => click()
    // ei toimi, koska yllä oleva koodi on asynkrooninen ja done()-funktioon ei ole tullut vastausta enne kuin alla oleva koodi ajetaan
    $("[type=button]").click(function(data){
        console.log(data);
    });
    */
    
});


function buildModifyUI(person_data){ // korvaa muistissa olevan dokumentin tällä. Ei toimi backward, koska vanha ei ole muistissa
    
    var html = "<input id ='name' type='text' value='" + person_data.name + "'/>";
    html += "<p></p>";
    html += "<input id='address' type='text' value='" + person_data.address + "'/>";
    html += "<p></p>";
    html += "<input id='age' type='text' value='" + person_data.age + "'/>";
    html += "<p></p>";
    html += "<input type='button' value='Update' id='update'/>";
    html += "<input type='button' value='Delete' id='delete'/>";
    
    $("body").html(html); // ylikirjoittaa html-metodilla body elementissä olevat tiedot
    
    // tapahtumankäsittelijä DELETElle
    $("#delete").click(function(){ // id-selektori vaatii # eteensä
        // tehdään HTTP-pyyntö front-endiltä back-endiin Ajax:ia käyttäen
        $.ajax({
            method:'DELETE',
            url:'http://localhost:3000/persons/id=' + person_data._id // persons-konteksti. Liitetään URL-osoitteeseen tieto mitä halutaan tuhota. Atribuutti id (voi olla mikä tahansa)
        }).done(function(data){location.reload(true)}); // location.reload(true) tekee sivulle refreshin
        
    });
    
    // tapahtumankäsitteljä UPDATE:lle
    $("#update").click(function(){
        
        var temp = {
            id: person_data._id,
            name:$("#name").val(),
            address:$("#address").val(),
            age:$("#age").val()
        }
        
        // tehdään HTTP-pyyntö front-endiltä back-endiin Ajax:ia käyttäen
        $.ajax({
            method:'PUT',
            url:'http://localhost:3000/persons',
            dataType:'json',
            data:temp
        }).done(function(data){location.reload(true)}); // location.reload(true) tekee sivulle refreshin
    });

}
