import {} from "./timer.js"

// Configuração fixa das plantas
const tipo_planta = {
  trigo: {
    preco_compra: 2,
    preco_venda: 5,
    chance_drop_semente: 0.01,
    rendimento: { min: 1, max: 3 }, // pode ser range
    tempo_crescimento: [10, 20, 30], // tempo para cada fase (em segundos/minutos)
    range_colheita: 15 // tempo ideal de colheita
  },
  batata: {
    preco_compra: 3,
    preco_venda: 6,
    chance_drop_semente: 0.05,
    rendimento: { min: 2, max: 5 },
    tempo_crescimento: [15, 30, 45],
    range_colheita: 20
  },
  milho:{
   preco_compra: 4,
   preco_venda: 7,
   chance_drop_semente: 0.1,
   rendimento: {min:3, max:7},
   tempo_crescimento: [20,40,60],
   range_colheita: 25
  }
};

   



export function get_planta(){
   return 
}



export function plantar(planta,unidade_plantio){
  const preparo = unidade_plantio.dataset.preparo_solo;
  const est_solo = unidade_plantio.dataset.estado_solo;
  const est_plantio = unidade_plantio.dataset.estado_plantio;


   if(est_solo === 'vazio' && preparo === 'preparado' && est_plantio === 'sem_planta'){
          if(planta.contain('trigo')){
            unidade_plantio.dataset.estado_plantio = 'com_planta'    
            unidade_plantio.dataset.tipo_planta = planta;   
          

          } else if(tipo_planta.includes(planta)){
            
          } else if(planta.includes('batata')){

          }else console.log('não existe planta ', planta, 'no jogo');
   }
}

function atualiza_estado_plantio(unidade,novo_estado_plantio){
   const chave = 'estado_solo_plantio';
  const antigo_estado_plantio = unidade.dataset[chave];
   
   if (antigo_estado_plantio && unidade.classList.contains(antigo_estado_plantio)) {
    unidade.classList.replace(antigo_estado_plantio, novo_estado_plantio);
  } else {
    unidade.classList.add(novo_estado_plantio);
  }

  unidade.dataset[chave] = novo_estado_plantio;

}




/* export function colher(){

}

function cresc_planta(){

} */

