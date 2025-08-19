import { aplicar_visual_unidade } from "./carrega_img.js";


// ferramentas.js
const ferramentas = [
  "picareta",
  "foice",
  "pa",
  "regador"

];


let ferramenta_selecionada = null;

export function get_ferramentas() {
  return [...ferramentas];
}

export function get_ferramenta_selecionada() {
  return ferramenta_selecionada;
}

export function seleciona_ferramenta(ferramenta) {
  if (ferramenta === null) {
    ferramenta_selecionada = null;
    return;
  }
  if (ferramentas.includes(ferramenta)) {
    ferramenta_selecionada = ferramenta;
  } else {
    console.log('Não existe ferramenta com o nome', ferramenta);
  }
}

export function foice(unidade_plantio) {
  const estado = unidade_plantio.dataset.estado_solo;

  if (estado === 'erva_daninha') {
    atualiza_estado_solo(unidade_plantio, 'vazio');
    console.log('usou a foice e cortou a erva daninha')
  } else {
    console.log('foice nao funciona aqui')
  }
}



export function picareta(unidade_plantio) {
  const estado = unidade_plantio.dataset.estado_solo;

  if (estado === 'pedra') {
    atualiza_estado_solo(unidade_plantio, 'vazio');
    console.log('usou a picareta para quebra a pedra');
  } else {

    console.log('picareta nao funciona aqui')

  }
}

export function pa(unidade_plantio) {
  const estado = unidade_plantio.dataset.estado_solo;
  const preparo = unidade_plantio.dataset.preparo_solo;

  if (estado === 'vazio' && preparo === 'não_preparado') {
    atualiza_preparo_solo(unidade_plantio, 'preparado');
    console.log('usou a pa na unidade de plantio, esta pronto para plantar');
  } else {
    console.log('solo já esta preparado ou não está vazio');
  }
}

export function regador(unidade_plantio) {
  const estado = unidade_plantio.dataset.estado_solo;
  const umidade = unidade_plantio.dataset.umidade_solo;
  const preparado = unidade_plantio.dataset.preparo_solo;
  if (preparado === 'não_preparado') {
    console.log('nao da para usar o regador sem preparar o solo');
    return;
  }


  if (estado === 'vazio' && umidade === 'seco') {
    atualiza_umidade(unidade_plantio, 'umido');
    console.log('usou o regador na unidade de plantio, o solo esta umido');


    // depois de 30s, volta pra seco automaticamente
    setTimeout(() => {
      //só muda se ainda estiver úmido
      if (unidade_plantio.dataset.umidade_solo === 'umido') {
        unidade_plantio.dataset.umidade_solo = 'seco';
        aplicar_visual_unidade(unidade_plantio);
        unidade_plantio.classList.remove('umido');
        unidade_plantio.style.borderColor = "";
        console.log('tempo do regador acabou: solo voltou a seco');
      }
    }, 30_000); // 30 segundos


  } else {
    console.log('solo precisa estar vazio para regar e estar seco')
  }
}



// funcao que atualiza o estado do solo
function atualiza_estado_solo(unidade, novo_estado) {
  const chave = 'estado_solo';
  const antigo_estado = unidade.dataset[chave];

  if (antigo_estado && unidade.classList.contains(antigo_estado)) {
    unidade.classList.replace(antigo_estado, novo_estado);
  } else {
    unidade.classList.add(novo_estado);
  }

  unidade.dataset[chave] = novo_estado;

  aplicar_visual_unidade(unidade);

}

function atualiza_preparo_solo(unidade, novo_preparo) {
  const chave = 'preparo_solo';
  const antigo_preparo = unidade.dataset[chave];

  if (antigo_preparo && unidade.classList.contains(antigo_preparo)) {
    unidade.classList.replace(antigo_preparo, novo_preparo);
  } else {
    unidade.classList.add(novo_preparo);
  }

  unidade.dataset[chave] = novo_preparo;


  aplicar_visual_unidade(unidade);
}

function atualiza_umidade(unidade, nova_umidade) {
  const chave = 'umidade_solo';
  const antiga_umidade = unidade.dataset[chave];

  if (antiga_umidade && unidade.classList.contains(antiga_umidade)) {
    unidade.classList.replace(antiga_umidade, nova_umidade);
  } else {
    unidade.classList.add(nova_umidade);
  }

  unidade.dataset[chave] = nova_umidade;

  aplicar_visual_unidade(unidade);

  unidade.style.borderColor = 'blue';
}