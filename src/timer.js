//timer.js


let tempo_jogo = 0; //tempo em minutos reais
let contador = null;



export function get_tempo_jogo() {
    return tempo_jogo;
  }


// Atualiza o visor para mostrar o tempo do dia
export function atualizar_visor() {
  if (!contador) return;
  
  const horas = Math.floor(tempo_jogo / 60) % 24;
  const minutos = tempo_jogo % 60;
  
  contador.textContent = 
    horas.toString().padStart(2, '0') + ':' +
    minutos.toString().padStart(2, '0');
}

// Avança o tempo de jogo
export function tick() {
  tempo_jogo++;
  atualizar_visor();
}

// Inicializa o timer
export function timer() {
  contador = document.createElement('div');
  contador.classList.add('timer');
  atualizar_visor();
  setInterval(tick, 1000); // Avança 1 minuto a cada segundo real
  return contador;
}

// funcao para poder adiantar o tempo com os botoes
export function ajustar_tempo(minutos_adicionais) {
  tempo_jogo += minutos_adicionais;
  atualizar_visor();
}