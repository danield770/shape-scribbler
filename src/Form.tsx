import React from 'react';
import classes from './form.module.css';
import { InputState } from './types';

function Form({
  inputs,
  updateInput,
}: {
  inputs: InputState;
  updateInput: Function;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Controls</legend>

        <div className={classes.inputWpr}>
          <div className='shape'>
            <div className='control-heading'>Shape:</div>
            <input
              id='radio-polygon'
              type='radio'
              name='shape'
              checked={inputs.shape === 'polygon'}
              value='polygon'
              onChange={(e) => updateInput(e.target.name, e.target.value)}
            />
            <label htmlFor='radio-polygon'>Polygon</label>
            <input
              id='radio-star'
              type='radio'
              name='shape'
              checked={inputs.shape === 'star'}
              value='star'
              onChange={(e) => updateInput(e.target.name, e.target.value)}
            />
            <label htmlFor='radio-star'>Star</label>
          </div>
          <div className={classes.row}>
            <label htmlFor='edge-size' className='control-heading'>
              Edge Size: ({inputs.size})
            </label>
            <input
              id='edge-size'
              name='size'
              type='range'
              min='10'
              max='100'
              value={inputs.size}
              onChange={(e) => updateInput(e.target.name, e.target.value)}
            />
          </div>
          {inputs.shape === 'polygon' && (
            <div className={classes.row}>
              <label htmlFor='num-edges' className='control-heading'>
                Number of Edges: {inputs.numEdges}
              </label>
              <input
                id='num-edges'
                name='numEdges'
                type='range'
                min='3'
                max='16'
                value={inputs.numEdges}
                onChange={(e) => updateInput(e.target.name, e.target.value)}
              />
            </div>
          )}
          {inputs.shape === 'star' && (
            <>
              <div className={classes.row}>
                <label htmlFor='num-spikes' className='control-heading'>
                  Number of Spikes: {inputs.numSpikes}
                </label>
                <input
                  id='num-spikes'
                  name='numSpikes'
                  type='range'
                  min='1'
                  max='30'
                  value={inputs.numSpikes}
                  onChange={(e) => updateInput(e.target.name, e.target.value)}
                />
              </div>
              <div className={classes.row}>
                <label htmlFor='inset' className='control-heading'>
                  Inset ({inputs.inset}%):
                </label>
                <input
                  id='inset'
                  name='inset'
                  type='range'
                  min='-100'
                  max='100'
                  value={inputs.inset}
                  onChange={(e) => updateInput(e.target.name, e.target.value)}
                />
              </div>
            </>
          )}
          <div className={classes.row}>
            <label htmlFor='fill-color' className='control-heading'>
              Fill Color:
            </label>
            <input
              id='fill-color'
              name='fillColor'
              type='color'
              value={inputs.fillColor}
              onChange={(e) => updateInput(e.target.name, e.target.value)}
            />
          </div>
          <div className={classes.row}>
            <label htmlFor='stroke-color' className='control-heading'>
              Stroke Color:
            </label>
            <input
              id='stroke-color'
              name='strokeColor'
              type='color'
              value={inputs.strokeColor}
              onChange={(e) => updateInput(e.target.name, e.target.value)}
            />
          </div>
          <div className={classes.row}>
            <label htmlFor='stroke-width' className='control-heading'>
              Stroke Thickness: ({inputs.strokeWidth})
            </label>
            <input
              id='stroke-width'
              name='strokeWidth'
              type='range'
              min='1'
              max='15'
              value={inputs.strokeWidth}
              onChange={(e) => updateInput(e.target.name, e.target.value)}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}

export default React.memo(Form);
