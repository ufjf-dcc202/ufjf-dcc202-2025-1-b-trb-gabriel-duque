const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tileSize = 32; // tamanho de cada tile (ajuste se não for 32x32)

// carrega a spritesheet
const tileset = new Image();
tileset.src = "./assest/farm_tiles.png"; // precisa estar na mesma pasta do index.html

tileset.onload = () => {
  // exemplo: desenhar os 4 primeiros tiles

  // tile (0,0)
  ctx.drawImage(tileset, 0, 0, tileSize, tileSize, 0, 0, tileSize, tileSize);

  // tile (1,0)
  ctx.drawImage(tileset, tileSize, 0, tileSize, tileSize, 32, 0, tileSize, tileSize);

  // tile (2,0)
  ctx.drawImage(tileset, tileSize*2, 0, tileSize, tileSize, 64, 0, tileSize, tileSize);

  // tile (3,0)
  ctx.drawImage(tileset, tileSize*3, 0, tileSize, tileSize, 96, 0, tileSize, tileSize);
};
