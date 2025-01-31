import pokemon from "./data/pokemon_4x3.js";

console.log(pokemon);

// Boucle principale du jeu
const pokemons = ["pikachu.png", "bulbasaur.png", "charmander.png", "squirtle.png"];
const bushes = document.querySelectorAll(".bush");
const capturedList = document.getElementById("captured-list");

let selectedPokemons = [];
let canClick = true;

bushes.forEach(bush => {
bush.addEventListener("click", () => {
    if (!canClick || bush.classList.contains("revealed")) return;

    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        
    bush.classList.add("revealed");
    bush.dataset.pokemon = randomPokemon; 
    });
});

function checkMatch() {
const [first, second] = selectedPokemons;

if (first.pokemon === second.pokemon) {
    showCaptureAnimation(second.bush);
    addCapturedPokemon(first.pokemon);
} 
else {
setTimeout(resetBushes, 1000);
}
}

function showCaptureAnimation(bush) {
    const pokeball = document.createElement("div");
    pokeball.classList.add("pokeball")
    bush.appendChild(pokeball);

    setTimeout(() => {
    pokeball.remove();
    resetBushes();
    }, 1000);
}

function addCapturedPokemon(pokemon) {
    const listItem = document.createElement("li");
    const img = document.createElement("img");
    img.src = pokemon;
    img.classList.add("pokemon");
    listItem.appendChild(img);
    capturedList.appendChild(listItem);
}

function resetBushes() {
    selectedPokemons.forEach(({ bush }) => {
    bush.style.backgroundImage = "url('bush.png')";
    bush.classList.remove("revealed");
    });
    selectedPokemons = [];
    canClick = true;
}
