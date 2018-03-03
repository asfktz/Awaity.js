const join = (arr, sep) => arr.join(sep);
const trim = str => str.replace(/^\s{0,8}/gm, '').trim();

function createIndexFile(definitions) {
  return join(definitions.map(([name]) => trim(`
    export { default as ${name} } from './${name}'
  `)), '\n');
}

function createFPModule(name, argLength) {
  return trim(`
    import { flip, curry } from '../__internal__/fp';
    import _${name} from '../${name}';
    export default curry(flip(_${name}), ${argLength});
  `);
}

module.exports = {
  createIndexFile,
  createFPModule,
};
