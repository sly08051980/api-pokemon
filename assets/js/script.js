
console.log("chargé");
let unPokemon = {};
let dataFetchTer= await getPokemonsList();
const listePokemons=dataFetchTer;
let url ="https://pokebuildapi.fr/api/v1/types";
let dataPokemonAttribut = await getPokemonsAttribut();
const listAttributPokemon= dataPokemonAttribut;
let attributPokemon={};
 const listPokemonByAttr= document.querySelector("#attr");
 const listPokemonByNom= document.querySelector("#liste")
 let selectList= document.querySelector('select');
 let stats = document.querySelector(".stats");


console.log("voici les donnée via fetch avce promesse explicite :",dataFetchTer);


// Génération des options de la Select
let listeDeroulante= document.querySelector('select');

choixOption();
garnirSelectList();
verifListChecked()



function choixOption() {

    listeDeroulante.addEventListener('change', function () {
        if (!listPokemonByAttr.checked){
        document.querySelector(".stats").innerHTML="";
        stats = document.querySelector(".stats");
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
    }else if (listPokemonByAttr.checked){


       
    }
    } 
    );
}


function verifListChecked(){
    
    for (let elem of document.querySelectorAll('input[type="radio"][name="listepokemon"]')) {
        elem.addEventListener("input", (event) => {  

            if (listPokemonByAttr.checked){

               stats.innerHTML="";
                selectList.options.length = 0;
                for (let i = 0; i < listAttributPokemon.length; i++) {
                    attributPokemon= listAttributPokemon[i];
                    let option = document.createElement("option");
                  
                    option.value= attributPokemon.name;
                    option.id = attributPokemon.id;
                    option.innerHTML = attributPokemon.name;
                    listeDeroulante.appendChild(option);
                   console.log(listeDeroulante);
                    
                }

            }else {
                garnirSelectList();

            }
          
        });
    }
}

/**
 * Génère dynamiquement les options de l'élément <select>
 */
function garnirSelectList() {
    selectList.options.length = 0;
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

function attributByPokemon(){


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

function getPokemonsAttribut () {

    return new Promise((resolve) => {
        return resolve(
            fetch(url, {
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


