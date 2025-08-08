// main js



let ambiente = {
    temperatura: 25,    // ºC
    umidade_ar:   60,    // %
}

 let unidade_plantio ={    //esse é o solo 
    estado ,  // se está limpo, com pedra, com erva daninha
    umidade,   // se está com agua ou não  
    preparo,    // possibilita o plantio
    fertilização  //aumenta a velocidade de crescimento
    

} 



//criando o elemento pai (area de plantio)
let area_plantio = document.querySelector('.area-plantio');


cria_area_plantio();
cria_unidades_plantio();


// funcao que cria as unidades de plantio de acordo com a quantidade desejada
function cria_unidades_plantio(){
    let quantidade_unidade_plantio = 144;

    for(let i = 0; i < quantidade_unidade_plantio ; i++){
    let unidade_plantio = document.createElement('div');
    unidade_plantio.classList.add('unidade-plantio');

    area_plantio.appendChild(unidade_plantio);
    }

}    


//funcao que cria a area de plantio

function cria_area_plantio(){
let nova_area_plantio = document.createElement('div');
nova_area_plantio.classList.add('area-plantio');
 return nova_area_plantio;
}