// carrega_img.js 


// mapa_imagens.js
export const mapa_imagens_base = {
  preparado_umido: '/assets/assets_jogo/chao/solo_limpo_umido.png'  ,
  preparado_seco: '/assets/assets_jogo/chao/solo_limpo_seco.png'  ,
  vazio: './assets/assets_jogo/chao/vazio.png'    , // vazio ou grama
};

export const overlay_imagens = {
  pedra: './assets/assets_jogo/chao/pedrinha.png',
  erva_daninha: './assets/assets_jogo/chao/erva_daninha_folha4.png',

  milho: './assets/assets_jogo/plantas/milho.png',
  milho_fase1: './assets/assets_jogo/plantas/milho_broto.png',
  milho_fase2: './assets/assets_jogo/plantas/milho_broto2.png',
  milho_fase3_maduro: './assets/assets_jogo/plantas/milho_maduro.png',
  milho_colhido: './assets/assets_jogo/plantas/milho_colhido.png'
};


  // Aplica o visual da unidade DOM a partir dos datasets
export function aplicar_visual_unidade(unidade) {
  if (!unidade) return;

  // pega tamanho_tile do :root (se existir), senão usa 48px
  const estilo_root = getComputedStyle(document.documentElement);
  const tamanho_tile = (estilo_root.getPropertyValue('--tile_size') || '48px').trim();

  // garante dimensões & posicionamento (mas agora deixamos a maior parte para o CSS)
  unidade.style.width = tamanho_tile;
  unidade.style.height = tamanho_tile;
  unidade.style.position = unidade.style.position || 'relative';
  unidade.style.overflow = 'hidden';
  unidade.style.imageRendering = 'pixelated';

  const estado = unidade.dataset.estado_solo || 'vazio';
  const preparo = unidade.dataset.preparo_solo || 'não_preparado';
  const umidade = unidade.dataset.umidade_solo || 'seco';
  const estado_plantio = unidade.dataset.estado_plantio || 'sem_planta';
 

  // escolhe base
  let chave_base = 'vazio';
  if (preparo === 'preparado') {
    chave_base = (umidade === 'umido') ? 'preparado_umido' : 'preparado_seco';
  } else {
    chave_base = 'vazio';
  }

  const base_url = mapa_imagens_base[chave_base] || mapa_imagens_base.vazio;

  // IMPORTANTe: usar 100% 100% para a base (assim escala com a célula)
  unidade.style.backgroundImage = `url("${base_url}")`;
  unidade.style.backgroundSize = '100% 100%'; // <- aqui: NÃO 32x32
  unidade.style.backgroundRepeat = 'no-repeat';
  unidade.style.backgroundPosition = 'center';

  // remove overlay anterior se existir
  const overlay_anterior = unidade.querySelector('.overlay') || unidade.querySelector('.overlay-planta');
  if (overlay_anterior) overlay_anterior.remove();

  // overlay para pedra / erva (estatico)
  if (estado === 'pedra' || estado === 'erva_daninha') {
    const img = document.createElement('img');
    img.className = 'overlay';
    img.src = overlay_imagens[estado === 'pedra' ? 'pedra' : 'erva_daninha'];
    
    img.style.pointerEvents = 'none';
    unidade.appendChild(img);
  }



// overlay de planta: somente se unidade.dataset.estado_plantio === 'com_planta' e unidade.planta existir
  if (estado_plantio === 'com_planta' && unidade.planta && unidade.planta.tipo) {
    const tipo = unidade.planta.tipo;
    const fase = Number(unidade.planta.fase_crescimento || 1);

    // tenta localizar a imagem por convenção: `${tipo}_fase${n}`
    const chave_possivel = `${tipo}_fase${fase}`;
    const src_planta = overlay_imagens[chave_possivel] || overlay_imagens[tipo];

    if (src_planta) {
      const img_planta = document.createElement('img');
      img_planta.className = 'overlay-planta';
      img_planta.src = src_planta;

      img_planta.style.pointerEvents = 'none';
      unidade.appendChild(img_planta);
    } 
  }




}
