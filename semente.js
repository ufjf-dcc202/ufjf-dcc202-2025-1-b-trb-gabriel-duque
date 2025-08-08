

let semente = {  //parâmetros fixos , os que mudam colocar em outros lugar?

   trigo: {
      
      pesticida: 0, // concentracao de pesticida na planta, 0-100, se chegar a 0 fica sucetivel a pestes, abaixo de 50 a imunidade para pestes some e tem uma chance reduzida de ter as pestes, até zerar a proteção
     
      adubação: 0, // 0 significa que nao está adubado, 1 significa que está adubado  
      hidratação: 50,  // 100 significa que está na capacidade maxima de agua, se está esta em 100 a planta cresce mais rapido, se o solo n esta mais umido, diminui essa hidratacao gradualmente
      fase_crescimento: 1, // 1 - semente , 2 - pequena, 3 - media, 4 - madura  (é a atual), cada fase demora tempo diferente
      maduro: 0,  // 1 se está pronto para colher, 0 se nao está
      vida: 100, // 100 significa vida cheia, abaixo de 50 fica doente, 0 morre, vida abaixa ou aumenta depende de certas condições?
      tempo_plantado: 0, // a quanto tempo está plantado/ em quanto tempo fica bom para colheita ( fazer um timer para mostrar isso)  1 min  (para mostrar para o fazendeiro), modelar em ciclos ou dias/hrs?
      velocidade_crescimento : 1,    // fase_crescimento por dia, hr, min, s
     
      preço_compra: 2, // valor de compra da semente na loja 
      preço_venda: 5,  // valor de venda da planta madura
      chance_drop_semente: 0.01, // chance de dropar semente ao colher e a quantidade é aleatorio, tendo um teto máximo
      rendimento: 2, // quantidade colhida de trigo pro planta, faço fixo ou um range???
      
       
       chance_mutacao: 0.1,  //  probabilidade de gerar uma “variedade” com rendimento ou resistência ligeiramente alterados
      

       range_colheita: 3, //tempo (dias/horas) em que a planta está no estágio ideal para colher; após isso, pode perder rendimento ou vida
       qualidade_colheira: 2 //varia de acordo com condições ao longo do ciclo; pode afetar preço de venda ou chance_drop_semente 0-100  , tem como ver ao passar por cima o mouse a qualidade atual dela
    },
   

    
    




}