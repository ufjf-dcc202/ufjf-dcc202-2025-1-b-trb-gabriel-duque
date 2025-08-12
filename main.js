// main js

const estado_solo = ["vazio","pedra","erva_daninha"];  // FIXME: Mudar estado_solo para estado-solo
const preparo_solo = ["preparado","não_preparado"]; // usado para gerir o preparo do solo para conseguir plantar

const quantidade_unidade_plantio = 144;
const tabuleiro_area_plantio = new Array(quantidade_unidade_plantio).fill('vazio');

  const cores = {
    vazio: 'brown',        // marrom claro / chão
    pedra: 'gray',        // cinza pedra
    erva_daninha: 'lightgreen'   // verde erva
  };

let selecionado = null;




//funcao que cria a area de plantio
function cria_area_plantio() {
    const nova_area = document.createElement('div');
    nova_area.classList.add('area-plantio');
    return nova_area;
}



// funcao que cria as unidades de plantio de acordo com a quantidade desejada
function cria_unidades_plantio(area_plantio) {
   

    for (let i = 0; i < quantidade_unidade_plantio; i++) {
        const unidade_plantio = document.createElement('div');
        const estado_solo_aleatorio = gera_estado_solo_aleatorio();

        unidade_plantio.classList.add('unidade-plantio', estado_solo_aleatorio);

        unidade_plantio.dataset.estado_solo = estado_solo_aleatorio;  // armazena o estado_solo para a logica do funcionamento da ferramenta
        unidade_plantio.dataset.posicao = String(i);  // pega a posicao para eu poder ajustar o click depois



        unidade_plantio.addEventListener('click',unidade_plantio_click);
       
      // guarda no tabuleiro lógico para referência futura
       tabuleiro_area_plantio[i] = estado_solo_aleatorio;

        area_plantio.appendChild(unidade_plantio);
    }

}


//funcao para lidar com o clique na area de plantio

function unidade_plantio_click(evento){

   const unidade_atual = evento.currentTarget;
   const data = unidade_atual.dataset.estado_solo;

   switch(data){
    case 'pedra': 
    console.log('quebrou a pedra',evento);
    atualiza_estado_solo(unidade_atual,'pedra') 
    break;

    case 'vazio':
    console.log('ta vazio',evento);
    break;

    case 'erva_daninha':
     console.log('capinou a erva daninha',evento);
     atualiza_estado_solo(unidade_atual,'erva_daninha');
     break;
   }
  

 
}

// funcao que multiplica numero 0 a 1 e o tamanho do vetor para gerar um estado do solo aleatoriamente [pedra,vazio,erva daninha]
function gera_estado_solo_aleatorio(){
  const idx_aleatorio =  Math.floor(Math.random()* estado_solo.length); // floor para n dar problemas, arendonda inteiros

   return estado_solo[idx_aleatorio];
}

// funcao que atualiza o estado do solo
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
  
}

//
  const areaPlantio = cria_area_plantio();
  document.body.appendChild(areaPlantio);
  cria_unidades_plantio(areaPlantio);


 areaPlantio.addEventListener('click', (evento) => {
    const cel_plantio = evento.target.closest('.unidade-plantio');
     if(!cel_plantio) 
        return;
   

 // const estado = cel_plantio.dataset.estado_solo;
  if (cel_plantio.classList.contains('pedra') || cel_plantio.classList.contains('erva_daninha')) {
    atualiza_estado_solo(cel_plantio, 'vazio');
  
}
 })