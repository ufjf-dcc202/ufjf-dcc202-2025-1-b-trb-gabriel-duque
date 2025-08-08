// main js



let ambiente = {
    temperatura: 25,    // ºC
    umidade_ar: 60,    // %
}

/* let unidade_plantio = {    //esse é o solo 
    estado,  // se está limpo, com pedra, com erva daninha
    umidade,   // se está com agua ou não  
    preparo,    // possibilita o plantio
    fertilização  //aumenta a velocidade de crescimento


} */

//funcao que cria a area de plantio
function cria_area_plantio() {
    const nova_area = document.createElement('div');
    nova_area.classList.add('area-plantio');
    return nova_area;
}



// funcao que cria as unidades de plantio de acordo com a quantidade desejada
function cria_unidades_plantio(area_plantio) {
    const quantidade_unidade_plantio = 144;

    for (let i = 0; i < quantidade_unidade_plantio; i++) {
        const unidade_plantio = document.createElement('div');
        unidade_plantio.classList.add('unidade-plantio');
        
        unidade_plantio.addEventListener('click',unidade_plantio_click);

        area_plantio.appendChild(unidade_plantio);
    }

}


//funcao para lidar com o clique na area de plantio

function unidade_plantio_click(evento){
console.log('Click na planta',evento);

 
}







//
  const areaPlantio = cria_area_plantio();
  document.body.appendChild(areaPlantio);
  cria_unidades_plantio(areaPlantio);
