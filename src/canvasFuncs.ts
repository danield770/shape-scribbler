export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas?.getContext('2d');
  if (ctx === null) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export interface CanvasArgs {
  radius?: number;
  inset?: number;
  n?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shouldClearRect?: boolean;
}

export function draw(
  x: number,
  y: number,
  canvas: HTMLCanvasElement,
  canvasArgs: CanvasArgs
) {
  if (canvas === null) return;
  const ctx = canvas?.getContext('2d');
  if (ctx === null) return;
  console.log({ x });
  console.log({ y });
  console.log({ canvas });
  console.log({ canvasArgs });
  const {
    radius = 40,
    inset = 36,
    n = 5,
    fillColor = '#54CF8F',
    strokeColor = '000000',
    strokeWidth = 4,
    shadowOffsetX = 4,
    shadowOffsetY = 4,
    shadowBlur = 4,
    shadowColor = '#FF0000',
    shouldClearRect = true,
  } = canvasArgs;
  // ctx.clearRect(0, 0, 200, 200);
  if (shouldClearRect) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  console.log('drawing...');
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowColor = shadowColor;
  ctx.beginPath();
  ctx.save();

  // ctx.translate(canvas.width / 2, canvas.height / 2);
  //   ctx.translate(screenX + x, screenY + y);
  ctx.translate(x, y);
  console.log('canvas dimensions: ', canvas.width, canvas.height);
  console.log('canvas position', x, y);
  ctx.moveTo(0, 0 - radius);

  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - radius);
  }

  ctx.restore();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

const funcs: { [key: string]: Function } = {
  draw,
  clearCanvas,
};

export default funcs;
