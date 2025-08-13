// ferramentas.js
const ferramentas = [
    "picareta",
    "tesoura",
    "enxada",
    "regador"

];

const cores = {
    vazio: 'brown',        // marrom claro / chão
    pedra: 'gray',        // cinza pedra
    erva_daninha: 'lightgreen',   // verde erva
    preparado : 'pink'
  };

let ferramenta_selecionada = null;

export function get_ferramentas() {
    return [...ferramentas];
}

export function get_ferramenta_selecionada(){
  return ferramenta_selecionada;
}

export function seleciona_ferramenta(ferramenta){
  if (ferramenta === null) {
       ferramenta_selecionada = null;
       return;
   }
   if(ferramentas.includes(ferramenta)){
    ferramenta_selecionada = ferramenta;
   } else {
    console.log('Não existe ferramenta com o nome', ferramenta);
   }
}

export function tesoura(unidade_plantio) {
const estado = unidade_plantio.dataset.estado_solo;

   if (estado === 'erva_daninha') {
        atualiza_estado_solo(unidade_plantio,'vazio');
        console.log('usou a tesoura e cortou a erva daninha')
    } else{
        console.log('tesoura nao funciona aqui')
    }
}



export function picareta(unidade_plantio) 
{
    const estado = unidade_plantio.dataset.estado_solo;

    if (estado === 'pedra') {
        atualiza_estado_solo(unidade_plantio,'vazio');
         console.log('usou a picareta para quebra a pedra');
    } else { 

        console.log('picareta nao funciona aqui')

    }
}

export function enxada(unidade_plantio)
{
    const estado = unidade_plantio.dataset.estado_solo;
    const preparo = unidade_plantio.dataset.preparo_solo;

    if(estado === 'vazio' && preparo === 'não_preparado'){
        atualiza_preparo_solo(unidade_plantio,'preparado');
        console.log('usou a enxada na unidade de plantio, esta pronto para plantar');
    } else{ 
        console.log('solo já esta preparado ou não está vazio');
     }
}

export function regador(unidade_plantio) {
  const estado = unidade_plantio.dataset.estado_solo;

    if (estado === 'vazio'){
      atualiza_umidade(unidade_plantio,'umido');
      console.log('usou o regador na unidade de plantio, o solo esta umido');
    } else {
      console.log('solo precisa estar vazio para regar')
    }
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

function atualiza_preparo_solo(unidade, novo_preparo){
    const chave = 'preparo_solo';
      const antigo_preparo = unidade.dataset[chave];

    if (antigo_preparo && unidade.classList.contains(antigo_preparo)) {
    unidade.classList.replace(antigo_preparo, novo_preparo);
  } else {
    unidade.classList.add(novo_preparo);
  }

  unidade.dataset[chave] = novo_preparo;
  
  // aplica transição suave (uma vez)
  unidade.style.transition = 'background-color 180ms ease';
  // aplica a cor (fallback para transparente se não achar)

  unidade.style.backgroundColor = cores[novo_preparo] || 'black';
}