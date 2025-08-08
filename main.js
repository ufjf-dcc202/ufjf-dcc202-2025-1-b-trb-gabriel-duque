// main js

const estado_solo = ["vazio","pedra","erva_daninha"];


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
        const estado_solo_aleatorio = gera_estado_solo_aleatorio();

        unidade_plantio.classList.add('unidade-plantio', estado_solo_aleatorio);

        unidade_plantio.dataset.estado_solo = estado_solo_aleatorio;  // armazena o estado_solo para a logica do funcionamento da ferramenta



        unidade_plantio.addEventListener('click',unidade_plantio_click);
       
     
        area_plantio.appendChild(unidade_plantio);
    }

}


//funcao para lidar com o clique na area de plantio

function unidade_plantio_click(evento){
console.log('Click na planta',evento);


 
}

// funcao que multiplica numero 0 a 1 e o tamanho do vetor para gerar um estado do solo aleatoriamente [pedra,vazio,erva daninha]
function gera_estado_solo_aleatorio(){
  const idx_aleatorio =  Math.floor(Math.random()* estado_solo.length); // floor para n dar problemas, arendonda inteiros

   return estado_solo[idx_aleatorio];
}




//
  const areaPlantio = cria_area_plantio();
  document.body.appendChild(areaPlantio);
  cria_unidades_plantio(areaPlantio);
