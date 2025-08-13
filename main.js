// main js


import { get_ferramentas, get_ferramenta_selecionada, seleciona_ferramenta, enxada, picareta, tesoura } from "./ferramentas.js";

const estado_solo = ["vazio", "pedra", "erva_daninha"];  // FIXME: Mudar estado_solo para estado-solo
const preparo_solo = ["preparado", "não_preparado"]; // usado para gerir o preparo do solo para conseguir plantar
const humidade_solo = ["umido", "seco"];
const quantidade_unidade_plantio = 144;
const QTD_FERRAMENTA = 4;  // apagar, mas lembrar de colocar em maiusclo as constantes
const tabuleiro_area_plantio = new Array(quantidade_unidade_plantio).fill('vazio');



let selecionado = null;




//funcao que cria a area de plantio
function cria_area_plantio() {
  const nova_area = document.createElement('div');
  nova_area.classList.add('area-plantio');
  return nova_area;
}

//funcao que cria o menu de ferrametnas
function cria_menu_ferramentas(){
  const inventario_ferramenta = document.createElement('div');
   inventario_ferramenta.classList.add('menu-ferramentas');
   
   const lista_ferramentas = get_ferramentas();
   let botao_selecionado = null;

   for(let i=0;i< lista_ferramentas.length; i++){
    const nome_ferramenta = lista_ferramentas[i];
    
    const btn_ferramenta = document.createElement('button');
    btn_ferramenta.type ="button";
    btn_ferramenta.classList.add('slot-ferramenta');
    btn_ferramenta.dataset.ferramenta = nome_ferramenta;
    btn_ferramenta.dataset.pressionado = 'false';
    
    btn_ferramenta.textContent = nome_ferramenta;
   
     

   

  inventario_ferramenta.appendChild(btn_ferramenta);
   }

//listener
   
    inventario_ferramenta.addEventListener('click', (evento)=>{
    const botao = evento.target.closest('.slot-ferramenta');  
    if (!botao) return; // não clicou em botão

    if(botao_selecionado){  //quando ja existe botao selecionado
     botao_selecionado.dataset.pressionado = "false";
     botao_selecionado.classList.remove('selecionado'); // css
    }
    
    // Seleciona o botão clicado
    botao.dataset.pressionado = 'true';
    botao.classList.add('selecionado');
    botao_selecionado = botao;
    
    //atualiza qual ferramenta esta seleliconada
    seleciona_ferramenta(botao.dataset.ferramenta);
      console.log('Ferramenta selecionada:', botao.dataset.ferramenta);
   });



    
  // ver e modificar essa parte antes de dar commit
  
  // Detectar clique no "vazio" (desmarca seleção)
  document.addEventListener('click', (evento) => {
    const clicou_em_ferramenta = evento.target.closest('.slot-ferramenta');
    const clicou_em_area_plantio = evento.target.closest('.area-plantio');

    if (!clicou_em_area_plantio && !clicou_em_ferramenta) {
      if (botao_selecionado) {
        botao_selecionado.dataset.pressionado = "false";
        botao_selecionado.classList.remove('selecionado');
        botao_selecionado = null;
        seleciona_ferramenta(null); // Nenhuma ferramenta
         console.log('Nenhuma ferramenta selecionada');
      }
    }
  });
  


  
   return inventario_ferramenta;

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

function unidade_plantio_click(unidade_atual) {

  //const unidade_atual = evento.currentTarget;    // mudar evento para click?
  const data = unidade_atual.dataset.estado_solo;
  const preparo = unidade_atual.dataset.preparo_solo;
  const ferramenta_selecionada = get_ferramenta_selecionada();

  switch (data) {
    case 'pedra':
      console.log('clicou na pedra', unidade_atual);
      if (ferramenta_selecionada === 'picareta') {
        picareta(unidade_atual);
      } else {
        console.log('para quebrar a pedra use uma picareta');
      }

      break;

    case 'vazio':
      console.log('clicou na unidade vazia', unidade_atual);
      if (preparo === 'não_preparado' && ferramenta_selecionada === 'enxada') {   // mudar o getferramenta para seleciona_ferramenta
        enxada(unidade_atual);
      } else {
        console.log('para preparar o solo, ele precisa estar vazio e precisa usar uma enxada');
      }
      break;

    case 'erva_daninha':
      console.log('clicou na erva daninha', unidade_atual);
      if (ferramenta_selecionada === 'tesoura') {


        tesoura(unidade_atual);
      } else {
        console.log('para cortar a erva daninha use uma tesoura');
      }
      break;
  }



}

// funcao que multiplica numero 0 a 1 e o tamanho do vetor para gerar um estado do solo aleatoriamente [pedra,vazio,erva daninha]
function gera_estado_solo_aleatorio() {
  const idx_aleatorio = Math.floor(Math.random() * estado_solo.length); // floor para n dar problemas, arendonda inteiros

  return estado_solo[idx_aleatorio];
}








 // ate o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  const areaPlantio = cria_area_plantio();
  document.body.appendChild(areaPlantio);
  cria_unidades_plantio(areaPlantio);

  const menuFerramentas = cria_menu_ferramentas();
  document.body.appendChild(menuFerramentas);
});





areaPlantio.addEventListener('click', (evento) => {
  const cel_plantio = evento.target.closest('.unidade-plantio');
  if (!cel_plantio) return;
 unidade_plantio_click(unidade_atual);
  

  

}
)