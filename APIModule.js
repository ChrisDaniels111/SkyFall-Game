// starter pokemons [bulbasaur, charmander, squirtle]
// starter pokemon images


var individualPokeURL = "https://pokeapi.co/api/v2/pokemon/";       //response.sprites.front_default
var imagePokeURL = "https://pokeapi.co/media/sprites/pokemon/"


var pokemonNames = ["bulbasaur", "charmander", "squirtle"];

var pokemonFront;
var pokemonType;

function getPokemonIMG() {
    $.ajax({
        url: individualPokeURL + $("input").val().toLowerCase(),
        method: "GET",
        statusCode: {
            404: function() {
                alert('invalid pokemon');
            }
        }
    })
    .done(function(response) {
        var pokemonData = response;
        var $button = $("<button>", {"class": "btn btn-danger", "type": "button", "text": "Lets Play!!", "id":"start-game"});
        imagePokeURL= `${imagePokeURL}${pokemonData.id}.png`;
        pokemonFront = `<img src=${imagePokeURL} id="pokemonFrontPage">`;

        $button.click(function() {
            $("#pokemon").empty();
            startGame();                    // START GAME
            createSpecialMoveButton();
        });

        $("#pokemon").empty(); // clear div
        $("#pokemon").append(pokemonFront);
        $("#pokemon").append(listPokemonType(pokemonData));
        $("#pokemon").append($button);
        
    });
}



function listPokemonType(pokemonData) {
    var message = 'Type: ';
    var types = pokemonData.types;
    for (var i = 0; i < types.length; i++) {
        var typeName = types[i]['type']['name'];
        message += capitalizeFirstLetter(typeName) + ' ';
    }
    return `<p>${message}</p>`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// append an to page for pokemon
// load screen
// show selected pokemon



// build function to append a box to div with input

function createPokemonInputBox() {
    var $label = $("<label>", {"for": "pokemon-input"});
    var $div = $("<div>", {"class": "input-group"});
    var $input = $("<input>", {"type": "text", "class": "form-control",
                   "placeholder": "Search for a pokemon..."});
    var $span = $("<span>", {"class": "input-group-btn"});
    var $button = $("<button>", {"class": "btn btn-primary", "type": "button", "text": "Go!"});

    

    // click event brings up pokemon img and pokemon types
    $button.click(getPokemonIMG)

    $span.append($button);
    $div.append($input);
    $div.append($span);

    // <div class="input-group">
    //   <input type="text" class="form-control" placeholder="Search for...">
    //   <span class="input-group-btn">
    //     <button class="btn btn-secondary" type="button">Go!</button>
    //   </span>
    // </div>

    $("#pokemon").append($label);
    $("#pokemon").append($div);
};

createPokemonInputBox();