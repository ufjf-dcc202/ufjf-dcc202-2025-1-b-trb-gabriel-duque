// main js

import { get_ferramentas, get_ferramenta_selecionada, seleciona_ferramenta, enxada, picareta, tesoura } from "./ferramentas";

const estado_solo = ["vazio","pedra","erva_daninha"];  // FIXME: Mudar estado_solo para estado-solo
const preparo_solo = ["preparado","não_preparado"]; // usado para gerir o preparo do solo para conseguir plantar

const quantidade_unidade_plantio = 144;
const tabuleiro_area_plantio = new Array(quantidade_unidade_plantio).fill('vazio');

 

let selecionado = null;




//funcao que cria a area de plantio
function cria_area_plantio() {
    const nova_area = document.createElement('div');
    nova_area.classList.add('area-plantio');
    return nova_area;
}



// funcao que cria as unidades de plantio de acordo com a quantidade desejada
function cria_unidades_plantio(area_plantio) {
   const preparado_inicial = "não_preparado";

    for (let i = 0; i < quantidade_unidade_plantio; i++) {
        const unidade_plantio = document.createElement('div');
        const estado_solo_aleatorio = gera_estado_solo_aleatorio();

        unidade_plantio.classList.add('unidade-plantio', estado_solo_aleatorio);

        unidade_plantio.dataset.estado_solo = estado_solo_aleatorio;  // armazena o estado_solo para a logica do funcionamento da ferramenta
        unidade_plantio.dataset.posicao = String(i);  // pega a posicao para eu poder ajustar o click depois

        unidade_plantio.dataset.preparado_solo = preparado_inicial;

     //   unidade_plantio.addEventListener('click',unidade_plantio_click);
       
      // guarda no tabuleiro lógico para referência futura
       tabuleiro_area_plantio[i] = estado_solo_aleatorio;

        area_plantio.appendChild(unidade_plantio);
    }

}


//funcao para lidar com o clique na area de plantio

function unidade_plantio_click(evento){

   const unidade_atual = evento.currentTarget;    // mudar evento para click?
   const data = unidade_atual.dataset.estado_solo;
   const preparo = unidade_atual.dataset.preparo_solo;
   const ferramenta_selecionada = get_ferramenta_selecionada();

   switch(data){
    case 'pedra': 
    console.log('clicou na pedra',evento);
    if(ferramenta_selecionada === 'picareta'){
    picareta(unidade_atual);
  }else{
    console.log('para quebrar a pedra use uma picareta');
  }
   
    break;

    case 'vazio':
    console.log('clicou na unidade vazia',evento);
    if(preparo === 'não_preparado' && ferramenta_selecionada === 'enxada'){   // mudar o getferramenta para seleciona_ferramenta
    enxada(unidade_atual);
    } else {
      console.log('para preparar o solo, ele precisa estar vazio e precisa usar uma enxada');
    }
    break;

    case 'erva_daninha':
     console.log('clicou na erva daninha',evento);
     if(ferramenta_selecionada === 'tesoura'){
    
     
     tesoura(unidade_atual);
     } else {
      console.log('para cortar a erva daninha use uma tesoura');
     }    
     break;
   }
  

 
}

// funcao que multiplica numero 0 a 1 e o tamanho do vetor para gerar um estado do solo aleatoriamente [pedra,vazio,erva daninha]
function gera_estado_solo_aleatorio(){
  const idx_aleatorio =  Math.floor(Math.random()* estado_solo.length); // floor para n dar problemas, arendonda inteiros

   return estado_solo[idx_aleatorio];
}

/* // funcao que atualiza o estado do solo
function atualiza_estado_solo(unidade, novo_estado){
   const chave = 'estado_solo';
   const antigo_estado = unidade.dataset[chave];

    if (antigo_estado && unidade.classList.contains(antigo_estado)) {
    unidade.classList.replace(antigo_estado, novo_estado);
  } else {
    unidade.classList.add(novo_estado);
  }

  unidade.dataset[chave] = novo_estado;
  
  // aplica transição suave (uma vez)
  unidade.style.transition = 'background-color 180ms ease';
  // aplica a cor (fallback para transparente se não achar)
  unidade.style.backgroundColor = cores[novo_estado] || 'transparent';
  
} */

//
  const areaPlantio = cria_area_plantio();
  document.body.appendChild(areaPlantio);
  cria_unidades_plantio(areaPlantio);

 
 areaPlantio.addEventListener('click', (evento) => {
    const cel_plantio = evento.target.closest('.unidade-plantio');
     if(!cel_plantio) 
        return;
   
  unidade_plantio_click(evento);
 // const estado = cel_plantio.dataset.estado_solo;
  if (cel_plantio.classList.contains('pedra') || cel_plantio.classList.contains('erva_daninha') || cel_plantio.classList.contains('vazio')) {
   // atualiza_estado_solo(cel_plantio, 'vazio');
   unidade_plantio_click(evento);
}
 })