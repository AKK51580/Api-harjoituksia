var pokemonList = [];
var handledPokemon = null;

document.getElementById("searchBtn").addEventListener("click", function(event) {
  event.preventDefault();
  searchByText();
})

function searchByText() {
  const searchText = document.getElementById("search").value;
  checkLocalStorage(searchText);
}

function checkLocalStorage(searchText) {
  if (localStorage.getItem("pokemonList") == null) {
    getDataFromAPI(searchText);
    return;
  }

  pokemonList = JSON.parse(localStorage.getItem("pokemonList"));

  let matchFound = false;

  for (const pokemon of pokemonList) {
    console.log(pokemon.name);
    if (pokemon.name === searchText) {
      handledPokemon = pokemon;
      matchFound = true;
      break;
    }
  }
  
  if (matchFound) {
    displayPokemon(handledPokemon);
  } else {  
    getDataFromAPI(searchText);
  }
}

async function getDataFromAPI(searchText) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`);
  const jsonData = await response.json();

  pokemonList.push(jsonData);
  localStorage.setItem("pokemonList", JSON.stringify(pokemonList));
}















function displayPokemon(pokemon) {
  const showingPokemon = document.querySelector(".showingPokemon");
  showingPokemon.innerHTML = ""; // Clear the existing content

  const detailsList = {
    name: pokemon.name,
    abilities: getPokemonAbilities(pokemon.abilities),
    base_experience: pokemon.base_experience,
    forms: getPokemonForms(pokemon.forms),
    game_indices: getPokemonGameIndices(pokemon.game_indices),
    height: pokemon.height,
    held_items: getPokemonHeldItems(pokemon.held_items),
    location_area_encounters: pokemon.location_area_encounters,
    moves: getPokemonMoves(pokemon.moves),
    order: pokemon.order,
    past_types: getPokemonPastTypes(pokemon.past_types),
    species: getPokemonSpecies(pokemon.species),
    stats: getPokemonStats(pokemon.stats),
    types: getPokemonTypes(pokemon.types),
    weight: pokemon.weight,
    sprites: getPokemonSprites(pokemon.sprites)
  };

  for (const key in detailsList) {
    const detailElement = document.createElement("p");
    detailElement.innerHTML = `<strong>${key}:</strong> ${detailsList[key]}`;
    showingPokemon.appendChild(detailElement);
  }

  const spriteContainer = document.createElement("div");
  spriteContainer.classList.add("sprites");

  for (const sprite of detailsList.sprites) {
    spriteContainer.appendChild(sprite);
  }

  showingPokemon.appendChild(spriteContainer);
}

function getPokemonAbilities(abilities) {
  return abilities.map((ability) => ability.ability.name).join(", ");
}

function getPokemonForms(forms) {
  return forms.map((form) => form.name).join(", ");
}

function getPokemonGameIndices(gameIndices) {
  return gameIndices.map((index) => index.version.name).join(", ");
}

function getPokemonHeldItems(heldItems) {
  return heldItems.map((item) => item.item.name).join(", ");
}

function getPokemonMoves(moves) {
  return moves.map((move) => move.move.name).join(", ");
}

function getPokemonPastTypes(pastTypes) {
  return pastTypes.map((type) => type.type.name).join(", ");
}

function getPokemonSpecies(species) {
  return species.name;
}

function getPokemonSprites(sprites) {
  const spriteImages = [];

  for (const key in sprites) {
    if (typeof sprites[key] === 'string') {
      const spriteWrapper = document.createElement("div");
      spriteWrapper.classList.add("pokemonSpriteWrapper");
      const spriteElement = document.createElement("img");
      spriteElement.src = sprites[key];
      spriteElement.classList.add("pokemonSprite");
      spriteElement.alt = key;
      spriteImages.push(spriteElement);
      spriteWrapper.appendChild(spriteElement)
    }
  }

  return spriteImages;
}


function getPokemonStats(stats) {
  return stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", ");
}

function getPokemonTypes(types) {
  return types.map((type) => type.type.name).join(", ");
}
