const { createCanvas, loadImage } = require("canvas");

async function buildFlagImage(backgroundPath, flagCode) {

  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext("2d");

  const background = await loadImage(backgroundPath);
  ctx.drawImage(background, 0, 0, 800, 400);

  const flag = await loadImage(`https://flagcdn.com/w320/${flagCode}.png`);
  ctx.drawImage(flag, 250, 100, 300, 200);

  return canvas.toBuffer();
}

module.exports = buildFlagImage;
