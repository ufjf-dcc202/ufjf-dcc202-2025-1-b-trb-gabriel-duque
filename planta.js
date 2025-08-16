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

   
function cria_planta(tipo){
  return{
   tipo,
   hidratacao: 50,
   fase_crescimento: 1,
   maduro: 0,
   vida: 100,
   tempo_plantado: 0,
   velocidade_crescimento: 1, //multiplica para
   estado: "crescendo" // ver se é necessario
  }
}


export function get_planta(){
   return 
}



export function plantar(tipo,unidade_plantio){
  const preparo = unidade_plantio.dataset.preparo_solo;
  const est_solo = unidade_plantio.dataset.estado_solo;
  const est_plantio = unidade_plantio.dataset.estado_plantio;


   if(est_solo === 'vazio' && preparo === 'preparado' && est_plantio === 'sem_planta'){
          if(tipo_planta[tipo]) // verifica se existe o tipo no tipo planta
            {
            unidade_plantio.dataset.estado_plantio = "com_planta" ;  
            unidade_plantio.dataset.tipo_planta = tipo;   
            unidade_plantio.planta = cria_planta(tipo);  //guarda a inst da planta


          }else console.log('não existe planta ', tipo, 'no jogo');
   }
}




function atualiza_estado_planta(unidade,novo_estado_planta){
   const chave = 'estado_planta';
  const antigo_estado_planta = unidade.dataset[chave];
   
   if (antigo_estado_planta && unidade.classList.contains(antigo_estado_planta)) {
    unidade.classList.replace(antigo_estado_planta, novo_estado_planta);
  } else {
    unidade.classList.add(novo_estado_planta);
  }

  unidade.dataset[chave] = novo_estado_planta;

}




/* export function colher(){

}

function cresc_planta(){

} */

