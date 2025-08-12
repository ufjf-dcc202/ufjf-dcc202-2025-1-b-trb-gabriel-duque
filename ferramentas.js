
const ferramentas = [
    "limpador",
    "enxada",
    "regador"

];

export function get_ferramentas() {
    return [...ferramentas];
}

export function get_unidade(unidade){
    
}

export function limpar_unidade_plantio(unidade, estado_solo) {
      
    if()
    if (estado_solo === 'pedra') {
        console.log('quebrou a pedra')

    } else if (estado_solo === 'erva_daninha') {
        console.log('cortou a erva daninha')
    }
}



export function picareta(unidade_plantio) 
{
    let ferramenta_selecionada = ferramentas[1];    // a picareta

    if (estado_solo === 'pedra') {
        unidade_plantio.dataset.estado_solo = 'vazio';

    }
}

/* export function regador() {
    if (estado_solo === 'vazio)
}
 */
