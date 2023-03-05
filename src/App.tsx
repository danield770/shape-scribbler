import React from 'react';
import './App.css';
import classes from './app.module.css';
import { CanvasArgs } from './canvasFuncs';
import Form from './Form';
import { InputState } from './types';
import Canvas from './Canvas';
import PaintCanvas from './PaintCanvas';

function App() {
  const [inputs, setInputs] = React.useState<InputState>({
    shape: 'polygon',
    size: 50,
    numEdges: 5,
    numSpikes: 5,
    inset: 36,
    fillColor: '#54CF8F',
    strokeColor: '#000000',
    strokeWidth: 4,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    shadowBlur: 4,
    shadowColor: '#FF0000',
  });

  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const deferredDimensions = React.useDeferredValue(dimensions);

  const breakpointWidth = 600;
  const formWidth = dimensions.width > breakpointWidth ? 350 : dimensions.width;
  const formHeight = 300;
  const actionsHeight = 60;
  const mainHeadingHeight = 83;

  const canvasWidth =
    dimensions.width > breakpointWidth
      ? dimensions.width - formWidth
      : dimensions.width - 15;
  const canvasHeight =
    dimensions.width > breakpointWidth
      ? dimensions.height - (actionsHeight + mainHeadingHeight)
      : dimensions.height - (formHeight + actionsHeight + mainHeadingHeight);

  const brushCanvasWidth =
    dimensions.width > breakpointWidth ? (formWidth * 3) / 4 : formWidth / 2.3;
  const offsetX = dimensions.width > breakpointWidth ? formWidth : 0;

  const numEdgesOrSpikes =
    inputs.shape === 'polygon' ? inputs.numEdges / 2 : inputs.numSpikes;
  const inset = inputs.shape === 'polygon' ? 1 : 1 - inputs.inset / 100;
  const brushCanvasArgs: CanvasArgs = {
    radius: inputs.size,
    inset: inset,
    n: numEdgesOrSpikes,
    fillColor: inputs.fillColor,
    strokeColor: inputs.strokeColor,
    strokeWidth: inputs.strokeWidth,
    shadowOffsetX: inputs.shadowOffsetX,
    shadowOffsetY: inputs.shadowOffsetY,
    shadowBlur: inputs.shadowBlur,
    shadowColor: inputs.shadowColor,
    shouldClearRect: true,
  };
  console.log(brushCanvasArgs);
  const paintCanvasArgs = { ...brushCanvasArgs, shouldClearRect: false };

  function updateInput(name: string, value: number | string) {
    const newInputs = { ...inputs, [name]: value };

    setInputs(newInputs);
  }

  React.useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
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
    >
      {' '}
      <div className={classes.form}>
        <h2 className={classes.heading}>Brush Preview</h2>
        <Canvas
          width={brushCanvasWidth}
          height={brushCanvasWidth}
          canvasFunc='draw'
          offsetX={brushCanvasWidth / 2}
          offsetY={brushCanvasWidth / 2}
          canvasFuncArgs={brushCanvasArgs}
        />
        <Form inputs={inputs} updateInput={updateInput} />
      </div>
      <div className={classes.canvasWpr}>
        <h1 className={classes.mainHeading}>Shape Scribbler</h1>
        <PaintCanvas
          width={canvasWidth}
          height={canvasHeight}
          offsetX={offsetX}
          offsetY={mainHeadingHeight}
          canvasFuncArgs={paintCanvasArgs}
        />
      </div>
    </div>
  );
}

export default App;
