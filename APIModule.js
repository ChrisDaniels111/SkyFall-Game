// starter pokemons [bulbasaur, charmander, squirtle]
// starter pokemon images

var individualPokeURL = "https://pokeapi.co/api/v2/pokemon/";
var imagePokeURL = "https://pokeapi.co/api/v2/pokemon-form/";       //response.sprites.front_default

var pokemonNames = ["bulbasaur", "charmander", "squirtle"];

var pokemonsIMG = {}


function getPokemonIMG(name) {
    $.ajax({
        url: imagePokeURL + name,
        method: "GET"
    })
    .done(function(response) {
        console.log(response);
    });
}

console.log(individualPokeURL + pokemonNames[1]);
getPokemon(pokemonNames[1]);




// need an append items to page button 