console.log("chargé");

let dataFetchTer= await getDataAvecPromesseExplicite();
console.log("voici les donnée via fetch avce promesse explicite :",dataFetchTer);


function getDataAvecPromesseExplicite () {
    return new Promise((resolve) => {
        return resolve(
            fetch("https://pokebuildapi.fr/api/v1/pokemon?limit=50", {
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

let recupererResultat=[];
let resultat;
recupererResultat= dataFetchTer;
let option;


// let listeDeroulante = document.createElement("select");
let listeDeroulante= document.querySelector('#poke');
for (let i = 0; i < 10; i++) {
   resultat= recupererResultat[i];
  
   console.log("pokemon" ,resultat.name);


   option = document.createElement("option");
   option.value= resultat.name;
   option.id = resultat.id;
   option.innerHTML= resultat.name;
   listeDeroulante.appendChild(option);



}

	document.body.appendChild(listeDeroulante);


listeDeroulante.addEventListener('change',function(){
   let caracteristique= document.querySelector("#caract");
caracteristique.innerHTML=this.value;


let images = document.createElement('img');

document.body.appendChild(images);




   
})









