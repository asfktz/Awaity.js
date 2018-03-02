
const join = (arr, sep) => arr.join(sep);

function createIndexFile(definitions) {
  return join(definitions.map(([name]) => (
    `export { default as ${name} } from '../${name}'`
  )), '\n');
}

function createFPModule(name, signature) {
  if (!signature.length) {
    return `export { default as ${name} } from '../${name}'`;
  }

  const content = (`
    import _${name} from '../${name}';
    
    export default function ${name} (${join(signature, ', ')}) {
      return  (iterable) => _${name}(iterable, ${join(signature, ', ')});
    }
  `);

  return content.replace(/^\s{0,8}/gm, '');
}

module.exports = {
  createIndexFile,
  createFPModule
};
