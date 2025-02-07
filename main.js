// main.js

// Liste des Pokémon
const pokemons = [
    'venusaur',
    'pikachu',
    'charizard',
    'venusaur',
    'pikachu',
    'charizard',
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
    shuffle(pokemons);
    const boxes = document.querySelectorAll('.box');
  
    boxes.forEach((box, index) => {
      box.innerHTML = `<img src="./assets/bush.webp" class="bush" />`;
      box.dataset.pokemon = pokemons[index]; // Stocke le Pokémon sous le buisson
      box.addEventListener('click', handleBoxClick);
    });
  
    document.getElementById('rejouer').style.display = 'none'; // Cacher le bouton rejouer
  }
  
  // Fonction pour gérer le clic sur un buisson
  function handleBoxClick(event) {
    if (isProcessing) return; 
  
    const box = event.currentTarget;
    const pokemon = box.dataset.pokemon;
  
    // Afficher le Pokémon
    box.innerHTML = `<img src="https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon}.png" class="pokemon" />`;
  
    if (!firstChoice) {
      firstChoice = pokemon;
      firstChoiceElement = box;
    } else {
      secondChoice = pokemon;
      secondChoiceElement = box;
      isProcessing = true; // Indiquer qu'une comparaison est en cours
  
      // Comparer les Pokémon
      setTimeout(() => {
        if (firstChoice === secondChoice) {
          // Capturer le Pokémon
          const capturedList = document.querySelector('.liste_pokemons_captures');
          const newPokemon = document.createElement('img');
          newPokemon.src = `https://img.pokemondb.net/sprites/scarlet-violet/normal/${firstChoice}.png`;
          capturedList.appendChild(newPokemon);
          // Afficher la pokeball
          firstChoiceElement.innerHTML += `<img src="./assets/pokeball.png" class="pokeball" />`;
          secondChoiceElement.innerHTML += `<img src="./assets/pokeball.png" class="pokeball" />`;
        } else {
          // Cacher les Pokémon après un délai
          firstChoiceElement.innerHTML = `<img src="./assets/bush.webp" class="bush" />`;
          secondChoiceElement.innerHTML = `<img src="./assets/bush.webp" class="bush" />`;
        }
  
        // Réinitialiser les choix
        firstChoice = null;
        secondChoice = null;
        firstChoiceElement = null;
        secondChoiceElement = null;
        isProcessing = false; // Fin de la comparaison
      }, 1000); // Délai de 1 seconde pour afficher les résultats
    }
  }
  
  // Événement pour le bouton rejouer
  document.querySelector('.btn').addEventListener('click', initGame);
  
  // Initialiser le jeu au chargement de la page
  window.onload = initGame; 
  