import React from 'react';
import { CanvasArgs, draw, clearCanvas } from './canvasFuncs';
import useDeviceDetect from './hooks/useDeviceDetect';
import classes from './paintCanvas.module.css';

function PaintCanvas({
  width,
  height,
  offsetX,
  offsetY,
  canvasFuncArgs,
}: {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  canvasFuncArgs: CanvasArgs;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [moveTo, setMoveTo] = React.useState({ x: 0, y: 0 });
  const isTouchDevice = useDeviceDetect();
  console.log({ moveTo });
  React.useEffect(() => {
    const canvasElem = canvasRef.current;
    if (!canvasElem) return;

    function mousePaint(e: MouseEvent) {
      setMoveTo({ x: e.x - offsetX, y: e.y - offsetY });
    }
    function touchPaint(e: TouchEvent) {
      e.preventDefault();
      console.log('touch: e: ', e);
      let x = 0,
        y = 0;
      if (e.targetTouches.length === 1) {
        var touch = e.targetTouches[0];
        // Place element where the finger is
        x = touch.pageX;
        y = touch.pageY;
        setMoveTo({ x: x - offsetX, y: y - offsetY });
      }
    }

    if (isTouchDevice) {
      console.log('add touchmove');
      canvasElem.addEventListener('touchmove', touchPaint);
    } else {
      console.log('add mousemove');
      canvasElem.addEventListener('mousemove', mousePaint);
    }

    return () => {
      if (isTouchDevice) {
        console.log('remove touchmove');
        canvasElem.removeEventListener('touchmove', touchPaint);
      } else {
        console.log('remove mousemove');
        canvasElem.removeEventListener('mousemove', mousePaint);
      }
    };
  }, [isTouchDevice, offsetX, offsetY]);

  const [dataURL, setDataURL] = React.useState('');

  React.useEffect(() => {
    if (!canvasRef.current || !dataURL) return;
    const link = document.createElement('a');
    link.download = 'scribbble.png';
    link.href = dataURL;
    link.click();
  }, [dataURL]);

  function saveCanvas() {
    if (!canvasRef.current) return;
    const canvasData = canvasRef.current.toDataURL('image/png');
    setDataURL(canvasData);
  }

  canvasRef.current &&
    draw(moveTo.x, moveTo.y, canvasRef.current, canvasFuncArgs);

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <div className={classes.actions}>
        <button
          type='button'
          className={classes.btn}
          onClick={() => {
            canvasRef.current && clearCanvas(canvasRef.current);
          }}
        >
          Clear Canvas
        </button>
        <button type='button' className={classes.btn} onClick={saveCanvas}>
          Save Scribbble
        </button>
      </div>
    </>
  );
}

export default PaintCanvas;
