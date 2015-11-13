// client tiedosto

$(document).ready(function(){ // odotetaan, että dokumentaatio object model (DOM) on valmis
    $("#login").click(loginHandler);
    $("#register").click(registerHandler);
});

/**
  * This function is called when login button is pressed.
  * Tällä luetaan tietokannasta
  */
function loginHandler(event){
    
    //console.log("login_scripts.js: loginHandler");
    
    // Selainpäässä tallennetaan käyttäjän salasana. localStorage on permanent storage selaimessa
    localStorage['username'] = $("#username").val();
    sessionStorage['user'] = $("#username").val();
    
    
    // luodaan json objekti
    var requestData = {
        username:$("#username").val(),
        password:$("#password").val()
    };
    
    // send login request to server
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/friends/login', // 'login' itse keksitty, jotta voidaan luoda backendissä sille oma käsittelijä
        data:requestData,
        dataType:'json'
    }).done(loginResponseHandler);
};



/**
  * This function is called when register button is pressed.
  * Tällä kirjoitetaan tietokantaan
  */
function registerHandler(event){
    
    //console.log("login_scripts.js: registerHandler");
    
    // luodaan json objekti
    var requestData = {
        username:$("#username").val(),
        password:$("#password").val()
    };
    
    // send login request to server
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/friends/register', // register itse keksitty, jotta voidaan luoda backendissä sille oma käsittelijä
        data:requestData,
        dataType:'json'
    }).done(registerResponseHandler);
};

/**
  * This function is called when register response arrives in some point of time
  */
function registerResponseHandler(data){
    
    $("#status").text(data.status);
};


/**
  * This function is called when login response arrives in some point of time
  */
function loginResponseHandler(data){
    
    if(data.status === "ok"){// === estää tyyppinuutoksen
        // Load person.html file from server
        /*
        $.ajax({
            method:'GET',
            url:'http://localhost:3000/persons.html'
        }).done(renderPersonView);*/
        
        // Ask browser to load person.html from node server
        window.location.href='http://localhost:3000/persons.html';
        
    } else {
        $("#status").text(data.status);
    }
    
};

/*
function renderPersonView(data){
    console.log(data);
    $(document).html(data);
};
*/
