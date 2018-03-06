import { curry, flip } from '../../__internal__/fp';
import { definitions } from '../../../config';

// A dynamic version of the pacakages
// for testing purpose only

export const regular = definitions.reduce((o, [fnName]) => {
  // eslint-disable-next-line
  const fn = require('../../' + fnName).default;
  o[fnName] = fn;
  return o;
}, {});

export const fp = definitions.reduce((o, [fnName, argLength]) => {
  // eslint-disable-next-line
  const fn = require('../../' + fnName).default;
  o[fnName] = curry(flip(fn), argLength);
  return o;
}, {});

