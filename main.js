// main js


import { get_ferramentas, get_ferramenta_selecionada, seleciona_ferramenta, pa, picareta, foice, regador } from "./src/ferramentas.js";
import { atualizar_visor, timer, get_tempo_jogo, ajustar_tempo } from "./src/timer.js"
import { seleciona_planta, tipo_planta, plantar, get_planta_selecionada, get_plantas, avanca_fase_unidade, atualiza_hidratacao_planta_unidade, colher } from "./src/planta.js"
import { remove_saldo, get_saldo } from "./src/loja.js"
import { aplicar_visual_unidade } from './src/carrega_img.js';

const estado_solo = ["vazio", "pedra", "erva_daninha"];
const quantidade_unidade_plantio = 144;
const tabuleiro_area_plantio = new Array(quantidade_unidade_plantio).fill('vazio');
const todas_unidades = [];

// detecta quando o minuto total muda e atualiza todas unidades
let ultimo_tempo = Number(get_tempo_jogo());



// --------------------------------------------------------  
//      GERECAO DA AREA DE PLANTIO                          
//---------------------------------------------------------


//funcao que cria a area de plantio
function cria_area_plantio() {
  const nova_area = document.createElement('div');
  nova_area.classList.add('area-plantio');
  return nova_area;
}

// funcao que multiplica numero 0 a 1 e o tamanho do vetor para gerar um estado do solo aleatoriamente [pedra,vazio,erva daninha]
function gera_estado_solo_aleatorio() {
  const idx_aleatorio = Math.floor(Math.random() * estado_solo.length); // floor para n dar problemas, arendonda inteiros

  return estado_solo[idx_aleatorio];
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

    todas_unidades.push(unidade_plantio);

    //atualizar o backgroud aqui

    aplicar_visual_unidade(unidade_plantio);
  }

}

//funcao para lidar com o clique na area de plantio

function unidade_plantio_click(unidade_atual) {


  const data = unidade_atual.dataset.estado_solo;
  const preparo = unidade_atual.dataset.preparo_solo;
  const umidade = unidade_atual.dataset.umidade_solo;
  const estado_plantio = unidade_atual.dataset.estado_plantio;
  const ferramenta_selecionada = get_ferramenta_selecionada();
  const planta_selecionada = get_planta_selecionada();

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

      if (preparo === 'preparado' && estado_plantio === 'sem_planta' && planta_selecionada) {
        if (planta_selecionada === 'tomate' || planta_selecionada === 'batata' || planta_selecionada === 'milho') {

          plantar(unidade_atual, planta_selecionada);
          return;
        } else console.log('planta selecionada é invalida, tipo nao existe');
      } else if (estado_plantio === 'com_planta') {
        colher(unidade_atual);
      }

      if (ferramenta_selecionada === 'regador') {
        if (umidade === 'seco') {
          regador(unidade_atual);
        } else {
          console.log('para deixar o solo úmido, ele precisa estar seco');
        }
        return;
      }

      if (ferramenta_selecionada === 'pa') {
        if (preparo === 'não_preparado') {
          pa(unidade_atual);
        } else {
          console.log('para preparar o solo, ele precisa estar vazio e não preparado');
        }
        return;
      }

      console.log('Nenhuma ação válida foi executada (selecione planta ou ferramenta).');
      break;

    case 'erva_daninha':
      console.log('clicou na erva daninha', unidade_atual);
      if (ferramenta_selecionada === 'foice') {


        foice(unidade_atual);
      } else {
        console.log('para cortar a erva daninha use uma foice');
      }
      break;
  }

}

//  cria areaPlantio UMA vez 
const areaPlantio = cria_area_plantio();
document.body.appendChild(areaPlantio);

//  cria unidades 
cria_unidades_plantio(areaPlantio);

areaPlantio.addEventListener('click', (evento) => {
  const cel_plantio = evento.target.closest('.unidade-plantio');
  if (!cel_plantio) return;
  unidade_plantio_click(cel_plantio);

}
);

// --------------------------------------------------------  
//      GERACAO DA MENU FERRAMENTA                      
//---------------------------------------------------------

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

    inventario_ferramenta.appendChild(btn_ferramenta);
  }

  //listener

  inventario_ferramenta.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.slot-ferramenta');
    if (!botao) return; // não clicou em botão


    // se clicou no mesmo botão, alterna (desmarca)
    if (botao_selecionado === botao) {
      botao.dataset.pressionado = 'false';
      botao.classList.remove('selecionado');
      botao_selecionado = null;
      seleciona_ferramenta(null);
      console.log('Nenhuma feramenta selecionada');
      return;
    }

    if (botao_selecionado) {  //quando ja existe botao selecionado
      botao_selecionado.dataset.pressionado = "false";
      botao_selecionado.classList.remove('selecionado'); // css
    }

    // sseleciona o botão clicado
    botao.dataset.pressionado = 'true';
    botao.classList.add('selecionado');
    botao_selecionado = botao;

    //atualiza qual ferramenta esta seleliconada
    seleciona_ferramenta(botao.dataset.ferramenta);
    console.log('Ferramenta selecionada:', botao.dataset.ferramenta);
  });

  //  clique no "vazio" (desmarca seleção)
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


//  menu ferramenta
const menuFerramentas = cria_menu_ferramentas();
document.body.appendChild(menuFerramentas);


// --------------------------------------------------------  
//      CRIACAO DO MENU PLANTA                       
//---------------------------------------------------------

function cria_menu_planta() {
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

    menu_planta.appendChild(btn_planta);
  }

  //listener

  menu_planta.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.slot-planta');
    if (!botao) return; // não clicou em botão



    const tipo = botao.dataset.tipo_planta;
    const planta = tipo_planta[tipo];

    if (!planta) {
      console.log('Planta inválida');
      return;
    }
    // confere se o jogador tem saldo suficiente
    if (get_saldo() >= planta.preco_compra) {
      // remove o dinheiro da compra (valor)
      remove_saldo(planta.preco_compra);

      // seleciona a planta (para o jogador plantar)
      seleciona_planta(tipo);
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
      console.log(`Comprou a semente de ${tipo} por R$${planta.preco_compra.toFixed(2)}!`);
    }
    else {
      console.log(`Saldo insuficiente para comprar ${tipo}.`);
    }
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
    }
  });

  return menu_planta;

}


const menuPlanta = cria_menu_planta();
document.body.appendChild(menuPlanta);

// --------------------------------------------------------  
//      CRIACAO DO TIMER E BOTOES DO TIMER                       
//---------------------------------------------------------


const temporizador = timer();
document.body.appendChild(temporizador);


function cria_btn_timer(texto_botao) {
  const btn_timer = document.createElement('button');
  btn_timer.classList.add('btn-timer');
  btn_timer.textContent = texto_botao;
  return btn_timer;
}

for (let i = 0; i < 2; i++) {
  if (i == 0) {
    const btn_timer_progride_muito = cria_btn_timer(">>");
    btn_timer_progride_muito.setAttribute('id', 'btn-timer-progride-muito'); 

    document.body.appendChild(btn_timer_progride_muito);
  } else {
    const btn_timer_progride = cria_btn_timer(">")
    btn_timer_progride.setAttribute('id', 'btn-timer-progride'); 

    document.body.appendChild(btn_timer_progride);
  }
}




//  Listener dos botões de tempo
document.addEventListener('click', (evento) => {
  const btn = evento.target.closest('.btn-timer'); // o botão clicado (ou null)
  if (!btn) return; // não era um botão de timer

  // debug: mostra id e tipo/valor de get_tempo_jogo antes
  console.log('clicou', btn.id, 'tempo antes =', get_tempo_jogo(), 'tipo=', typeof get_tempo_jogo());


  if (btn.id === 'btn-timer-progride-muito') {
    ajustar_tempo(60); // avança 60 minutos (no jogo label do jogo)
  } else if (btn.id === 'btn-timer-progride') {
    ajustar_tempo(10); //avança 10 minuto (no label do jogo)
  }

  // debug: mostra valor depois
  console.log('tempo depois =', get_tempo_jogo(), 'tipo=', typeof get_tempo_jogo());

  atualizar_visor();
});

// --------------------------------------------------------  
//      SALDO                     
//---------------------------------------------------------


function cria_label_saldo() {
  const label = document.createElement('div');
  label.id = 'dinheiro';
  label.textContent = `SALDO: ${get_saldo()}`;
  return label;
}

const label_saldo = cria_label_saldo();
document.body.appendChild(label_saldo);



// --------------------------------------------------------  
//      ATUALIZADOR  1000ms -> 1s                     
//---------------------------------------------------------

setInterval(() => {
  const agora = Number(get_tempo_jogo());
  if (agora !== ultimo_tempo) {
    // minuto mudou  atualiza fases de todas unidades
    ultimo_tempo = agora;

    // Filtra apenas unidades com plantas
    todas_unidades.forEach(u => {
      if (u.planta) {
        atualiza_hidratacao_planta_unidade(u);
        avanca_fase_unidade(u);
        aplicar_visual_unidade(u);
      }

    });
  }
}, 1000); // checa a cada segundo, só executa o corpo quando o minuto mudar


// --------------------------------------------------------  
//     DEBUG                       
//---------------------------------------------------------


window.DEBUG = {
  todas_unidades,
  avanca_fase_unidade,           // função importada de planta.js
  atualiza_hidratacao_planta_unidade,
  get_tempo_jogo: () => get_tempo_jogo(),
  logPrimeiraUnidade: () => {
    const u = todas_unidades[0];
    console.log('primeira unidade DOM:', u);
    if (u) console.log('dataset', { ...u.dataset }, 'planta', u.planta);
  }
};
console.log('DEBUG pronto: use window.DEBUG');