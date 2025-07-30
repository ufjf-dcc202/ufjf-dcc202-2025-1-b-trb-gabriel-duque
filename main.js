// main js


//criando o elemento pai (area de plantio)
let area_plantio = document.querySelector('.area-plantio');



cria_Unidades_Plantio();


// funcao que cria as unidades de plantio de acordo com a quantidade desejada
function cria_Unidades_Plantio(){
    let quantidade_unidade_plantio = 144;

    for(let i = 0; i < quantidade_unidade_plantio ; i++){
    let unidade_plantio = document.createElement('div');
    unidade_plantio.classList.add('unidade-plantio');

    area_plantio.appendChild(unidade_plantio);
    }

}    