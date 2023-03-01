import React from 'react';
import './App.css';
import classes from './app.module.css';
import { draw, clearCanvas } from './canvas';
import Form from './Form';
import { InputState } from './types';

function App() {
  const brushCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const paintCanvasRef = React.useRef<HTMLCanvasElement>(null);

  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const deferredDimensions = React.useDeferredValue(dimensions);

  const breakpointWidth = 600;
  const formWidth = dimensions.width > breakpointWidth ? 350 : dimensions.width;
  const formHeight = 300;
  const actionsHeight = 60;
  const mainHeadingHeight = 90;

  const canvasWidth =
    dimensions.width > breakpointWidth
      ? dimensions.width - formWidth
      : dimensions.width - 15;
  const canvasHeight =
    dimensions.width > breakpointWidth
      ? dimensions.height - (actionsHeight + mainHeadingHeight)
      : dimensions.height - (formHeight + actionsHeight + mainHeadingHeight);

  const brushCanvasWidth =
    dimensions.width > breakpointWidth ? (formWidth * 3) / 4 : formWidth / 2;

  const [dataURL, setDataURL] = React.useState('');

  React.useEffect(() => {
    if (!paintCanvasRef.current || !dataURL) return;
    const link = document.createElement('a');
    link.download = 'scribbble.png';
    link.href = dataURL;
    link.click();
  }, [dataURL]);

  function saveCanvas() {
    if (!paintCanvasRef.current) return;
    const canvasData = paintCanvasRef.current.toDataURL('image/png');
    setDataURL(canvasData);
  }

  const [inputs, setInputs] = React.useState<InputState>({
    shape: 'polygon',
    size: 100,
    numEdges: 5,
    numSpikes: 5,
    inset: 50,
    fillColor: '#ff0000',
    strokeColor: '#000000',
    strokeWidth: 10,
  });

  React.useEffect(() => {
    if (!brushCanvasRef.current) return;
    const numEdgesOrSpikes =
      inputs.shape === 'polygon' ? inputs.numEdges / 2 : inputs.numSpikes;
    const inset = inputs.shape === 'polygon' ? 1 : 1 - inputs.inset / 100;
    draw(
      brushCanvasWidth / 2,
      brushCanvasWidth / 2,
      brushCanvasRef.current,
      inputs.size,
      inset,
      numEdgesOrSpikes,
      inputs.fillColor,
      inputs.strokeColor,
      inputs.strokeWidth
    );
  }, [inputs]);

  function updateInput(name: string, value: number | string) {
    setInputs({ ...inputs, [name]: value });
  }

  // TODO: I wanted to use useCallback, but there is a bug

  // const updateInput = React.useCallback(
  //   (name: string, value: number | string) => {
  //     setInputs({ ...inputs, [name]: value });
  //   },
  //   []
  // );

  React.useEffect(() => {
    if (!paintCanvasRef.current) return;
    const offsetX = dimensions.width > breakpointWidth ? formWidth : 0;
    const canvas = paintCanvasRef.current;
    const numEdgesOrSpikes =
      inputs.shape === 'polygon' ? inputs.numEdges / 2 : inputs.numSpikes;
    const inset = inputs.shape === 'polygon' ? 1 : 1 - inputs.inset / 100;
    // const canvanRect = canvas.getBoundingClientRect();

    function paint(e: MouseEvent) {
      draw(
        e.x - offsetX,
        e.y,
        canvas,
        inputs.size,
        inset,
        numEdgesOrSpikes,
        inputs.fillColor,
        inputs.strokeColor,
        inputs.strokeWidth,
        false
      );
    }

    canvas.addEventListener('mousemove', paint);
    // draw(250, 250, canvas, 100, 0.8, 7, inputs.fillColor);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [inputs]);

  React.useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      // canvasRef.current && draw(250, 250, canvasRef.current, 100, 0.8, 7);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [deferredDimensions]);

  const styles = {
    '--form-width': `${formWidth}px`,
    '--form-height': `${formHeight}px`,
    '--actions-height': `${actionsHeight}px`,
  } as React.CSSProperties;

  return (
    <div
      style={styles}
      className={
        dimensions.width > breakpointWidth
          ? [classes.app, classes.large].join(' ')
          : [classes.app, classes.small].join(' ')
      }
      // className={
      //   dimensions.width > breakpointWidth
      //     ? `${classes.app} ${classes.large}`
      //     : `${classes.app} ${classes.small}`
      // }
    >
      {' '}
      <div className={classes.form}>
        <h2 className={classes.heading}>Brush Preview</h2>
        <canvas
          ref={brushCanvasRef}
          width={brushCanvasWidth}
          height={brushCanvasWidth}
        ></canvas>
        <Form inputs={inputs} updateInput={updateInput} />
      </div>
      <div className={classes.canvasWpr}>
        <h1 className={classes.mainHeading}>Shape Scribbler</h1>
        <canvas
          width={canvasWidth}
          height={canvasHeight}
          ref={paintCanvasRef}
        ></canvas>
      </div>
      <div className={classes.actions}>
        <button
          type='button'
          className={classes.btn}
          onClick={() => {
            paintCanvasRef.current && clearCanvas(paintCanvasRef.current);
          }}
        >
          Clear Canvas
        </button>
        <button type='button' className={classes.btn} onClick={saveCanvas}>
          Save Scribbble
        </button>
      </div>
    </div>
  );
}

export default App;
