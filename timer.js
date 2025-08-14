//timer.js

let minutos = 6;
let segundos = 0;
let contador = null;
const qtd_minutos = 24;
const max_limite_tempo = qtd_minutos * 60;  // 1440
const min_limite_tempo = 0;


export function get_minuto() {
    return minutos;
  }

export  function get_segundo() {
    
        return segundos;
    }
  

export  function set_minuto(valor) {
   const aux = valor*60 + segundos;
   if (aux > min_limite_tempo && aux < max_limite_tempo){
          minutos = valor;
    } else if (aux > max_limite_tempo) {
       minutos = 0;
    }else {
      minutos = 23;
    }
  }


export  function set_segundo(valor) {
   const aux = valor + minutos*60;
   if (aux > min_limite_tempo && aux < max_limite_tempo){
          segundos = valor;
    } else if(aux > max_limite_tempo-1 && minutos == 23) {
       segundos = 0;
       minutos = 0;
    }
}

export function atualizar_visor() {
    if (!contador) return;
    contador.textContent =
      get_minuto().toString().padStart(2, '0') + ':' +
      get_segundo().toString().padStart(2, '0');
  }


export function tick() {
    set_segundo(get_segundo() + 1);
    if (get_segundo() === 60) {
      set_segundo(0);
      set_minuto(get_minuto() + 1);
    }
    if (get_minuto() === 24 && get_segundo() === 0) {
      set_minuto(0);
    }
    atualizar_visor();
  }


export function timer() {   //transformar em classe depois, vai comepansar
 contador = document.createElement('div');
  contador.classList.add('timer');


  atualizar_visor();
  setInterval(tick, 1000);

  return contador;
}