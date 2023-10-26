
console.log("chargé");
let unPokemon = {};
let dataFetchTer= await getPokemonsList();
const listePokemons=dataFetchTer;
console.log("voici les donnée via fetch avce promesse explicite :",dataFetchTer);


// Génération des options de la Select
let listeDeroulante= document.querySelector('select');
garnirSelectList();
choixOption();




function choixOption() {
   
    listeDeroulante.addEventListener('change', function () {
        document.querySelector(".stats").innerHTML="";
        let stats = document.querySelector(".stats");
        const pokemonChoisi = listePokemons.find((pokemon) => pokemon.name == listeDeroulante.value);
        const images = document.querySelector(".stats");
        stats.innerHTML = `<img src="${pokemonChoisi.image}" alt=""/>`

        let statistique = document.createElement("div");
        statistique.setAttribute("class" , "statistique");
        stats.appendChild(statistique);
        for (const [propriete, valeur] of Object.entries(pokemonChoisi.stats)) {
            let  uneStat = document.createElement("p");
            uneStat.textContent = `${propriete} : ${valeur}`;
            statistique.appendChild(uneStat);  
        }
    } 
    );
}

/**
 * Génère dynamiquement les options de l'élément <select>
 */
function garnirSelectList() {
    // document.body.appendChild(listeDeroulante);
    for (let i = 0; i < listePokemons.length; i++) {
        unPokemon = listePokemons[i];
        let option = document.createElement("option");
        option.value= unPokemon.name;
        option.id = unPokemon.id;
        option.innerHTML = unPokemon.name;
        listeDeroulante.appendChild(option);
       
        
    }
  
}

function getPokemonsList () {
    return new Promise((resolve) => {
        return resolve(
            fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/10", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                }
                
            }).then(function(response) {
            
                return response.json();
            })
        );
    });
}