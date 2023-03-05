import React from 'react';
import funcs, { CanvasArgs } from './canvasFuncs';

interface ICanvas {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  canvasFunc: string;
  canvasFuncArgs: CanvasArgs;
}
export type Ref = HTMLCanvasElement;

function Canvas({
  width,
  height,
  canvasFunc,
  offsetX,
  offsetY,
  canvasFuncArgs,
}: ICanvas) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  funcs[canvasFunc](offsetX, offsetY, canvasRef.current, canvasFuncArgs);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}

export default Canvas;
