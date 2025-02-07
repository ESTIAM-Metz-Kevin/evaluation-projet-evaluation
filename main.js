// import pokemons from "./data/pokemon_4x3.js";

// Liste des Pokémon
const liste_pair_pokemon = [
  'venusaur',
  'venusaur',
  'pikachu',
  'pikachu',
  'charizard',
  'charizard',
  'mew',
  'mew',
  'mewtwo',
  'mewtwo',
  'espeon',
  'espeon',
];

// Variables globales
let firstChoice = null;
let secondChoice = null;
let firstChoiceElement = null;
let secondChoiceElement = null;
let isProcessing = false;

// Fonction pour mélanger les Pokémon
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fonction pour initialiser le jeu
function initGame() {
  shuffle(liste_pair_pokemon);
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box, index) => {
      box.innerHTML = `<img src="./assets/bush.webp" class="bush" />`;
      box.dataset.pokemon = liste_pair_pokemon[index];
      box.addEventListener('click', handleBoxClick);
  });
}

// Fonction pour gérer le clic sur un buisson
function handleBoxClick(event) {
  if (isProcessing) return;

  const box = event.currentTarget;
  const pokemon_du_buisson = box.dataset.pokemon;

  if (pokemon_du_buisson && box.innerHTML.includes('bush')) {
      box.innerHTML = `<img src="https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon_du_buisson}.png" class="pokemon" />`;

      if (!firstChoice) {
          firstChoice = pokemon_du_buisson;
          firstChoiceElement = box;
      } else {
          secondChoice = pokemon_du_buisson;
          secondChoiceElement = box;
          isProcessing = true;

          setTimeout(() => {
              if (firstChoice === secondChoice) {
                  const capturedList = document.querySelector('.liste_pokemons_captures');
                  const newPokemon = document.createElement('img');
                  newPokemon.src = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${firstChoice}.png`;
                  capturedList.appendChild(newPokemon);
                  firstChoiceElement.innerHTML += `<img src="./assets/pokeball.png" class="pokeball" />`;
                  secondChoiceElement.innerHTML += `<img src="./assets/pokeball.png" class="pokeball" />`;
              } else {
                  firstChoiceElement.innerHTML = `<img src="./assets/bush.webp" class="bush" />`;
                  secondChoiceElement.innerHTML = `<img src="./assets/bush.webp" class="bush" />`;
              }

              firstChoice = null;
              secondChoice = null;
              firstChoiceElement = null;
              secondChoiceElement = null;
              isProcessing = false;
          }, 1000);
      }
  }
}

// Événement pour le bouton rejouer
document.querySelector('.btn').addEventListener('click', initGame);

// Initialiser le jeu au chargement de la page
window.onload = initGame;