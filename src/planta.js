import { get_tempo_jogo } from "./timer.js"
import { vender } from "./loja.js"
import { aplicar_visual_unidade } from "./carrega_img.js"

// Configuração fixa das plantas
export const tipo_planta = {
  tomate: {
    preco_compra: 2,
    preco_venda: 5,
    tempo_crescimento: [10, 20, 30], // tempo para cada fase (em minutos do relogio do jogo)
  },
  batata: {
    preco_compra: 3,
    preco_venda: 6,
    tempo_crescimento: [15, 30, 45],
  },
  milho: {
    preco_compra: 4,
    preco_venda: 7,
    tempo_crescimento: [20, 40, 60],
  }
};



// parâmetros de ajuste
const HIDRATACAO_INCREMENTO_POR_MIN = 2;   // quando o solo tá 'umido', o quanto aumenta por minuto a hidaratacao da planta
const HIDRATACAO_DECRESCIMO_POR_MIN = 5;   // quando o solo tá 'seco', o quanto diminui por minuto a hidratacao da planta
const HIDRATACAO_MIN = 0;
const HIDRATACAO_MAX = 100;
const DANO_DESIDRATADA = 5;


const TOTAL_MINUTOS = 24 * 60; // 1440, para tratar o circulo do relógio 23-> 00

let tipo_selecionado = null;





function cria_planta(tipo) {
  return {
    tipo,
    hidratacao: 50,
    fase_crescimento: 1,
    maduro: 0,
    vida: 100,
    tempo_plantado: 0,
    inicio_plantado: null // será preenchido ao plantar
  }
}



export function get_plantas() {
  return Object.keys(tipo_planta);
}


export function get_planta_selecionada() {
  return tipo_selecionado;
}


export function plantar(unidade_plantio, tipo) {
  const preparo = unidade_plantio.dataset.preparo_solo;
  const est_solo = unidade_plantio.dataset.estado_solo;
  const est_plantio = unidade_plantio.dataset.estado_plantio;

  if (est_solo === "vazio" && preparo === "preparado" && est_plantio === "sem_planta") {
    if (!tipo_planta[tipo]) {
      console.log("não existe planta ", tipo, "no jogo");
      return;
    }

    unidade_plantio.dataset.estado_plantio = "com_planta";
    unidade_plantio.dataset.tipo_planta = tipo;
    const inst = cria_planta(tipo);
    inst.inicio_plantado = Number(get_tempo_jogo()); //  horario do timer agora
    unidade_plantio.planta = inst;

    aplicar_visual_unidade(unidade_plantio);


    console.log("Plantou:", tipo, "em", inst.inicio_plantado);
  }
}

export function seleciona_planta(tipo) {
  if (tipo === null) {
    tipo_selecionado = null;
    return;
  }
  if (tipo_planta[tipo]) {
    tipo_selecionado = tipo;
  } else {
    console.log('Não existe planta com do tipo', tipo);
  }
}


export function calcula_fase_atual(planta) {
  if (!planta || !planta.tipo || planta.inicio_plantado == null) {
    console.log('calcula_fase_atual: planta inválida ou sem inicio_plantado', planta);
    return null;
  }

  const ficha_planta = tipo_planta[planta.tipo];
  if (!ficha_planta) {
    console.log('calcula_fase_atual: ficha não encontrada para tipo', planta.tipo);
    return null;
  }

  const agora = Number(get_tempo_jogo());
  const inicio = Number(planta.inicio_plantado || 0);
  let tempo_decorrido = agora - inicio;
  if (tempo_decorrido < 0) tempo_decorrido += TOTAL_MINUTOS; // para segunrança, devido ao loop de 23->00

  const tempos = (ficha_planta.tempo_crescimento || []).map(n => Number(n) || 0);

  // conta quantas fases já foram alcançadas
  let fases_avancadas = 0;
  for (let i = 0; i < tempos.length; i++) {
    if (tempo_decorrido >= tempos[i]) fases_avancadas++;
    else break;
  }

  let fase_atual = 1 + fases_avancadas;      // começa na fase 1
  const fase_max = tempos.length;         // total de fases (3 contando com a 1)

  if (fase_atual > fase_max) fase_atual = fase_max;  // garantia que n passe da fase max
  const maduro = fase_atual === fase_max;

  console.log('calcula_fase_atual:', {
    tipo: planta.tipo,
    agora, inicio, agora, tempo_decorrido,
    tempos, fases_avancadas, fase_atual, fase_max, maduro
  });

  return { fase_atual, maduro, tempo_plantado: tempo_decorrido };
}


export function avanca_fase_unidade(unidade) {
  if (!unidade || !unidade.planta) {
    console.log('avanca_fase_unidade: sem planta na unidade', unidade && unidade.dataset.posicao);
    return null;
  }
  const info = calcula_fase_atual(unidade.planta);
  if (!info) return null;

  unidade.planta.fase_crescimento = info.fase_atual;
  unidade.planta.maduro = info.maduro ? 1 : 0;
  unidade.dataset.fase_planta = String(info.fase_atual);
  if (info.maduro) unidade.classList.add("planta-madura");
  else unidade.classList.remove("planta-madura");

  // Debug interessante para ver evol
  console.log('avanca_fase_unidade: aplicado', {
    posicao: unidade.dataset.posicao,
    tipo: unidade.dataset.tipo_planta,
    fase: info.fase_atual,
    maduro: info.maduro
  });

  return info;
}


export function colher(unidade) {
  if (!unidade || !unidade.planta) {
    console.log('colher: sem planta na unidade', unidade && unidade.dataset.posicao);
    return null;
  }

  if (!unidade.planta.maduro) {
    console.log('colher: planta ainda não esta madura', unidade && unidade.dataset.posicao);
    return null;
  }

  const tipo = unidade.planta.tipo;
  const preco = (tipo_planta[tipo] && tipo_planta[tipo].preco_venda) || 0;


  vender(preco);
  // ao colher fica sem planta, e bagunça o solo

  unidade.planta = null;

  unidade.dataset.estado_plantio = 'sem_planta';
  unidade.dataset.preparo_solo = 'não_preparado';
  unidade.dataset.umidade_solo = 'seco';
  unidade.classList.remove('planta-madura', 'preparado', 'umido');
  unidade.removeAttribute('data-tipo_planta');
  unidade.removeAttribute('data-fase_planta');
  unidade.style.borderColor = "";


  const label = unidade.querySelector('.planta-label');
  if (label) label.remove();

  aplicar_visual_unidade(unidade);

  console.log(`colhido ${tipo} por R$${preco} na unidade`, unidade.dataset.posicao);
  return preco;
}


// mata a planta e atualiza visual/dados
export function matar_planta_unidade(unidade) {
  if (!unidade) return;
  console.log('matar_planta_unidade: planta morreu na unidade', unidade.dataset.posicao);

  // limpa dataset e objeto planta
  unidade.dataset.estado_plantio = 'sem_planta';
  unidade.dataset.preparo_solo = 'não_preparado';
  unidade.dataset.umidade_solo = 'seco';
  unidade.planta = null;
  unidade.classList.remove('planta-madura', 'preparado', 'umido');
  unidade.removeAttribute('data-tipo_planta');
  unidade.removeAttribute('data-fase_planta');



  // remove label se houver
  const label = unidade.querySelector('.planta-label');
  if (label) label.remove();


}

// atualiza hidratação da unidade com base no tempo decorrido

export function atualiza_hidratacao_planta_unidade(unidade, minutos = 1) {
  if (!unidade || !unidade.planta) return;
  const planta = unidade.planta;

  const prev = Number(planta.hidratacao ?? 50);
  console.log('[HIDRA DEBUG]', unidade.dataset.posicao || '?', 'prev=', prev,
    'minutos=', minutos, 'inc/min=', HIDRATACAO_INCREMENTO_POR_MIN);


  planta.hidratacao = Number(planta.hidratacao ?? 50);
  planta.vida = Number(planta.vida ?? 100);

  const umidade = unidade.dataset.umidade_solo || 'seco';

  if (umidade === 'umido') {
    // recupera água (capacixadade maxima em 100)
    planta.hidratacao = Math.min(HIDRATACAO_MAX, planta.hidratacao + HIDRATACAO_INCREMENTO_POR_MIN * minutos);
  } else {
    // perde água
    planta.hidratacao = Math.max(HIDRATACAO_MIN, planta.hidratacao - HIDRATACAO_DECRESCIMO_POR_MIN * minutos);
  }

  // DEBUG para acompanhar como está o andamento da hidratacao, umidade, etc
  console.log('calcula_hidratacao_atual:', {
    tipo: planta.tipo, vida: planta.vida, umidade, hidratacao: planta.hidratacao
  });

  //  sem água, começa a perder vida
  if (planta.hidratacao === HIDRATACAO_MIN) {
    planta.vida = planta.vida - DANO_DESIDRATADA * minutos;
    console.log(`atualiza_hidratacao_planta_unidade: planta na pos ${unidade.dataset.posicao} perdeu vida, vida=${planta.vida}`);
  }

  // se a vida zerou, mata a planta
  if (planta.vida === 0) {
    matar_planta_unidade(unidade);

    return;
  }

}