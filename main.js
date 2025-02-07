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
let nbCoup = 0;
let recordNbCoup = localStorage.getItem("recordNbCoup") ? parseInt(localStorage.getItem("recordNbCoup")) : 0;

// Affichage du record au chargement
document.querySelector('#stat_record_nombre_de_coups').textContent = recordNbCoup;

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

  // Réinitialisation des compteurs
  nbCoup = 0;
  document.querySelector('#stat_nombre_de_coups').textContent = nbCoup;
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
          nbCoup++; // le compteur de coups
          document.querySelector('#stat_nombre_de_coups').textContent = nbCoup;

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

              // Vérifie si toutes les paires ont été trouvées
              if (document.querySelectorAll('.pokeball').length === liste_pair_pokemon.length) 
              {
                  finDePartie();
              }
          }, 1000);
      }
  }
}

// Fonction pour gérer la fin de partie
function finDePartie() {
  if (recordNbCoup === 0 || nbCoup < recordNbCoup) {
      recordNbCoup = nbCoup;
      localStorage.setItem("recordNbCoup", recordNbCoup);
  }
  document.querySelector('#stat_record_nombre_de_coups').textContent = recordNbCoup;
}

// Événement pour le bouton rejouer
document.querySelector('.btn').addEventListener('click', initGame);

// Initialiser le jeu au chargement de la page
window.onload = initGame;

// 