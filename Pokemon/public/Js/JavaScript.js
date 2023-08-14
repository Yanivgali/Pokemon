const pokedex = document.getElementById('pokedex');
const btn = document.getElementById('btnload');
const miniloader = document.getElementById("miniloader");
const search = document.getElementById("search");
let first = 20;
btn.addEventListener(('click'), function () {
    first = first + 40;
    if (first < 1010) {
        fetchpokemon();
    }
    else {
        first = 1010;
        btn.style.display = 'none';
        fetchpokemon();
    }
}); 

const fetchpokemon = async () =>
{
    search.style.display = 'block';
    btn.style.display = 'block';
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=' + first + '';
    let res = await fetch(url);  //code will wait until promise fetch https response 
    let data = await res.json(); //returns a second promise that resolves with the result of parsing the response body text as JSON.
    let pokemon = data.results.map((result, index) =>(
    {
        name: result.name,
        apiURL: result.url,
        id: index + 1,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (index + 1).toString() + '.png'
    }));
    displayPokemon(pokemon);
};

let displayPokemon = (pokemon) => { //insert html values into ol and creating all pokemon in the limit 
    let pokemonHTMLString = pokemon.map((pokemon) => `
            <li class="card" onclick="selectPokemon(${pokemon.id})">
            <img class="card-image" src="${pokemon.image}" />
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
          </li>
        `
          ).join('');
    pokedex.innerHTML = pokemonHTMLString;
}; 

const selectPokemon = async (id) => { // send pokemon info when pokemon was clicked.
        const url = 'https://pokeapi.co/api/v2/pokemon/' + id + '';
        const res = await fetch(url);
        const pokemon = await res.json();
        displayPopup(pokemon);
    miniloader.style.display = "none";
};
function ClosePopup() {
    btn.style.display = 'block';
    search.style.display = 'block';
    fetchpokemon();
}
function favoritePokemon(pokemon) {
    search.style.display = 'none';
    btn.style.display = 'none';
    if (localStorage.getItem('pokemonData')) {
        const storedData = JSON.parse(localStorage.getItem('pokemonData'));
        const pokemonList = Array.isArray(storedData) ? storedData : [storedData]; // Handle case when there's a single Pokémon
        const pokemonHTMLString = pokemonList.map(pokemon => `
    <li class="card" onclick="selectPokemon(${pokemon.id})">
      <img class="card-image" src="${pokemon.image}" />
      <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
    </li>
  `).join('');
        const pokemonListContainer = document.getElementById('pokedex');
        pokemonListContainer.innerHTML = pokemonHTMLString;
    }
    else {
        const htmlStrings = `<center><p style="color:white;">you need to select favorite pokemon first!</p><center>`;      
        pokedex.innerHTML = htmlStrings;
    }
}

const searchpokemon = async (event) => {
    if (event) {
        event.preventDefault();
    }
    const searchInput = document.getElementById('searchbar').value.toLowerCase().trim();
    if (!searchInput) {
            return;
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${searchInput}`;
        const res = await fetch(url);
        if (res.status === 200) {
            const pokemon = await res.json();
            displayPopup(pokemon);
        } else {
            const htmlString = `<center><p style="color:white;">Pokémon ${searchInput} not found.</p></center>`;
            btn.style.display = 'none';
            pokedex.innerHTML = htmlString;
        }
}
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('Enter key pressed');
        searchpokemon();
        console.log('Enter key pressed');
    }
};
        
  const displayPopup = (pokemon) => {
            miniloader.style.display = "none";
            btn.style.display = 'none';
            const type = pokemon.types.map((type) => type.type.name);
            const image = pokemon.sprites['front_default'];
            const types = type;
      if (types[1] != null)
      {
                const htmlString = `
             <div id="dispopup" class="popup">
            <div class="card">
            <img class="card-image" src="${image}" />
            <h3>#${pokemon.id}</h3>
            <h2 class="card-title">${pokemon.name}</h2>
            <div class="background-color">
            <span class="background-color-${types[0]}">${types[0]}</span>
            <span class="background-color-${types[1]}">${types[1]}</span>
            </div>
            <p><small>Height:</small>${pokemon.height} |<small>Weight:</small>${pokemon.weight}.</p>
           <div class="wrapper">
           <input type="checkbox" class="heart-checkbox" id="heart-checkbox">
           <label class="heart" for="heart-checkbox"></label>
               </div>
               </div>
               <button id="closebtn" type="button" onclick="ClosePopup()">Close</button>
                </div>
                    `;
                pokedex.innerHTML = htmlString;
            }
            else {
                const htmlString = `
    <div class="popup">
    <div class="card">
            <img class="card-image" src="${image}" />
            <h3>#${pokemon.id}</h3>
            <h2 class="card-title">${pokemon.name}</h2>
            <div class="background-color">
            <span class="background-color-${type}">${type}</span>
            </div>
            <p><small>Height:</small>${pokemon.height} |<small>Weight:</small>${pokemon.weight}.</p>
            <div class="wrapper">
  <input type="checkbox" class="heart-checkbox" id="heart-checkbox">
  <label class="heart" for="heart-checkbox"></label>
</div>
           </div>
               <button id="closebtn" type="button" onclick="ClosePopup()">Close</button>

          </div>
        `;
          pokedex.innerHTML = htmlString;

            }
            const checkbox = document.getElementById("heart-checkbox");
            if (localStorage.getItem('pokemonData')) {
                const storedData = JSON.parse(localStorage.getItem('pokemonData'));
                const foundPokemon = storedData.find(item => item.id === pokemon.id);

                if (foundPokemon && foundPokemon.isFavorite) {
                    checkbox.checked = true;
                }
            }

            checkbox.addEventListener("click", function () {

                const isChecked = checkbox.checked;

                if (isChecked) {
                    const pokemonData = {
                        image: image,
                        id: pokemon.id,
                        name: pokemon.name,
                        type: type,
                        height: pokemon.height,
                        weight: pokemon.weight,
                        isFavorite: true // Add a property to store checkbox status
                    };
                    let storedData = [];

                    if (localStorage.getItem('pokemonData')) {
                        storedData = JSON.parse(localStorage.getItem('pokemonData'));
                    }

                    storedData.push(pokemonData);
                    localStorage.setItem('pokemonData', JSON.stringify(storedData));
                }
                else {
                    let storedData = [];
                    if (localStorage.getItem('pokemonData')) {
                        storedData = JSON.parse(localStorage.getItem('pokemonData'));
                        const updatedData = storedData.filter(item => item.id !== pokemon.id);
                        localStorage.setItem('pokemonData', JSON.stringify(updatedData));
                    }
                    if (localStorage.getItem('pokemonData') === '[]') {
                        localStorage.clear();
                    }
                }
            });
};
fetchpokemon();