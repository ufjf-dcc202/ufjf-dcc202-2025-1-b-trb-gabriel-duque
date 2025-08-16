// main js


import { get_ferramentas, get_ferramenta_selecionada, seleciona_ferramenta, enxada, picareta, tesoura, regador } from "./ferramentas.js";
import{ get_minuto, set_minuto, get_segundo, set_segundo, atualizar_visor, tick, timer  } from "./timer.js"  
import {seleciona_planta, plantar, get_plantas} from "./planta.js"

const estado_solo = ["vazio", "pedra", "erva_daninha"];  // FIXME: Mudar estado_solo para estado-solo
const preparo_solo = ["preparado", "não_preparado"]; // usado para gerir o preparo do solo para conseguir plantar
const umidade_solo = ["umido", "seco"];
const estado_plantio = ["com_planta", "sem_planta"];

const quantidade_unidade_plantio = 144;

const tabuleiro_area_plantio = new Array(quantidade_unidade_plantio).fill('vazio');



let selecionado = null;




//funcao que cria a area de plantio
function cria_area_plantio() {
  const nova_area = document.createElement('div');
  nova_area.classList.add('area-plantio');
  return nova_area;
}

//funcao que cria o menu de ferrametnas
function cria_menu_ferramentas() {
  const inventario_ferramenta = document.createElement('div');
  inventario_ferramenta.classList.add('menu-ferramentas');

  const lista_ferramentas = get_ferramentas();
  let botao_selecionado = null;

  for (let i = 0; i < lista_ferramentas.length; i++) {
    const nome_ferramenta = lista_ferramentas[i];

    const btn_ferramenta = document.createElement('button');
    btn_ferramenta.type = "button";
    btn_ferramenta.classList.add('slot-ferramenta');
    btn_ferramenta.dataset.ferramenta = nome_ferramenta;
    btn_ferramenta.dataset.pressionado = 'false';

    btn_ferramenta.textContent = nome_ferramenta;





    inventario_ferramenta.appendChild(btn_ferramenta);
  }

  //listener

  inventario_ferramenta.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.slot-ferramenta');
    if (!botao) return; // não clicou em botão

    if (botao_selecionado) {  //quando ja existe botao selecionado
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
  const preparo_inicial = "não_preparado";
  const umidade_inicial = "seco";
  const estado_plantio_inicial = "sem_planta";   // pegar no vertor de cima v[i]

  for (let i = 0; i < quantidade_unidade_plantio; i++) {
    const unidade_plantio = document.createElement('div');
    const estado_solo_aleatorio = gera_estado_solo_aleatorio();

    unidade_plantio.classList.add('unidade-plantio', estado_solo_aleatorio);

    unidade_plantio.dataset.estado_solo = estado_solo_aleatorio;  // armazena o estado_solo para a logica do funcionamento da ferramenta
    unidade_plantio.dataset.posicao = String(i);  // pega a posicao para eu poder ajustar o click depois

    unidade_plantio.dataset.preparo_solo = preparo_inicial;
    unidade_plantio.dataset.umidade_solo = umidade_inicial;
    unidade_plantio.dataset.estado_plantio = estado_plantio_inicial;


    // guarda no tabuleiro lógico para referência futura
    tabuleiro_area_plantio[i] = estado_solo_aleatorio;

    area_plantio.appendChild(unidade_plantio);
  }

}


//funcao para lidar com o clique na area de plantio

function unidade_plantio_click(unidade_atual) {


  const data = unidade_atual.dataset.estado_solo;
  const preparo = unidade_atual.dataset.preparo_solo;
  const umidade = unidade_atual.dataset.umidade_solo;
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

      if (ferramenta_selecionada === 'regador') {
        if (umidade === 'seco') {
          regador(unidade_atual);
        } else {
          console.log('para deixar o solo úmido, ele precisa estar seco');
        }
      }

      if (ferramenta_selecionada === 'enxada') {
        if (preparo === 'não_preparado') {
          enxada(unidade_atual);
        } else {
          console.log('para preparar o solo, ele precisa estar vazio e não preparado');
        }
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











function cria_btn_timer(texto_botao){
  const btn_timer = document.createElement('button');
  btn_timer.classList.add('btn-timer');
  btn_timer.textContent = texto_botao;
  return btn_timer;
}



function cria_menu_planta(){
   const menu_planta = document.createElement('div');
  menu_planta.classList.add('menu-planta');

  const lista_planta = get_plantas() || [];
  let botao_selecionado = null;
  

  for (let i = 0; i < lista_planta.length; i++) {
    const tipo_planta = lista_planta[i];

    const btn_planta = document.createElement('button');
    btn_planta.type = "button";
    btn_planta.classList.add('slot-planta');
    btn_planta.dataset.tipo_planta = tipo_planta;
    btn_planta.dataset.pressionado = 'false';

    btn_planta.textContent = tipo_planta;





    menu_planta.appendChild(btn_planta);
  }

  //listener

  menu_planta.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.slot-planta');
    if (!botao) return; // não clicou em botão

    // se clicou no mesmo botão, alterna (desmarca)
    if (botao_selecionado === botao) {
      botao.dataset.pressionado = 'false';
      botao.classList.remove('selecionado');
      botao_selecionado = null;
      seleciona_planta(null);
      console.log('Nenhuma planta selecionada');
      return;
    }


    if (botao_selecionado) {  //quando ja existe botao selecionado
      botao_selecionado.dataset.pressionado = "false";
      botao_selecionado.classList.remove('selecionado'); // css
    }

    // Seleciona o botão clicado
    botao.dataset.pressionado = 'true';
    botao.classList.add('selecionado');
    botao_selecionado = botao;

    //atualiza qual planta esta seleliconada
    seleciona_planta(botao.dataset.tipo_planta);
      console.log('Planta selecionada:', botao.dataset.tipo_planta);
});

// clique fora do menu vai desmarcar a selecao do botao da planta
document.addEventListener('click', (evento) => {
    const clicou_menu_planta = evento.target.closest('.menu-planta');
    const clicou_btn_planta = evento.target.closest('.slot-planta');
    const clicou_em_area_plantio = evento.target.closest('.area-plantio');
    const clicou_unidade_plantio = evento.target.closest('.unidade-plantio');

    if (!clicou_menu_planta && !clicou_btn_planta && !clicou_em_area_plantio && !clicou_unidade_plantio && botao_selecionado) {
      botao_selecionado.dataset.pressionado = 'false';
      botao_selecionado.classList.remove('selecionado');
      botao_selecionado = null;
      seleciona_planta(null);
      console.log('deselecionou a planta');
    }});


return menu_planta;

}





  document.addEventListener('click', (evento) => {
  const btn = evento.target.closest('.btn-timer'); // o botão clicado (ou null)
  if (!btn) return; // não era um botão de timer

  // debug: mostra id e tipo/valor de get_minuto antes
  console.log('clicou', btn.id, 'min antes =', get_minuto(), 'tipo=', typeof get_minuto());

  // proteção: garanta que get_minuto retorne número
  const antes = Number(get_minuto()) || 0;

  if (btn.id === 'btn-timer-regride') {
    set_minuto(antes - 1);
  } else if (btn.id === 'btn-timer-progride') {
    set_minuto(antes + 1);
  }

  // debug: mostra valor depois
  console.log('min depois =', get_minuto(), 'tipo=', typeof get_minuto());

  atualizar_visor();
});

















// ate o DOM estar pronto

const areaPlantio = cria_area_plantio();
document.body.appendChild(areaPlantio);
cria_unidades_plantio(areaPlantio);

const menuFerramentas = cria_menu_ferramentas();
document.body.appendChild(menuFerramentas);

document.addEventListener('DOMContentLoaded', () => {
const temporizador = timer();
document.body.appendChild(temporizador);
});

const menuPlanta = cria_menu_planta();
document.body.appendChild(menuPlanta);


for(let i=0; i< 2; i++){
  if(i== 0){
const btn_timer_regride =  cria_btn_timer("<");
  btn_timer_regride.setAttribute('id', 'btn-timer-regride');
//  btn_timer_click();
  document.body.appendChild(btn_timer_regride);
  } else {
    const btn_timer_progride = cria_btn_timer(">")
    btn_timer_progride.setAttribute('id', 'btn-timer-progride');
   //  btn_timer_click();
    document.body.appendChild(btn_timer_progride);
  }
}






areaPlantio.addEventListener('click', (evento) => {
  const cel_plantio = evento.target.closest('.unidade-plantio');
  if (!cel_plantio) return;
  unidade_plantio_click(cel_plantio);




}
);


