//timer.js

let minutos = 6;
let segundos = 0;
let contador = null;


export function get_minuto() {
    return minutos;
  }

export  function set_minuto(valor) {
    minutos = valor;
  }

export  function get_segundo() {
    return segundos;
  }

export  function set_segundo(valor) {
    segundos = valor;
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