import { curry, flip } from '../../__internal__/fp';
import { definitions } from '../../../config';

// A dynamic version of the generated FP mode
// for testing purpose only

export default definitions.reduce((o, [fnName, argLength]) => {
  // eslint-disable-next-line
  const fn = require('../../' + fnName).default;
  o[fnName] = curry(flip(fn), argLength);
  return o;
}, {});
