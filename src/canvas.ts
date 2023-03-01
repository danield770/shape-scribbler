export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function draw(
  x: number,
  y: number,
  //   screenX: number,
  //   screenY: number,
  canvas: HTMLCanvasElement,
  radius: number,
  inset: number,
  n: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
  shouldClearRect = true
) {
  const ctx = canvas.getContext('2d');
  if (ctx === null) return;
  // ctx.clearRect(0, 0, 200, 200);
  if (shouldClearRect) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  console.log('drawing...');
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
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

function drawShape() {}
