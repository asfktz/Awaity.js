
const join = (arr, sep) => arr.join(sep);

function createIndexFile(definitions) {
  return join(definitions.map(([name]) => (
    `export { default as ${name} } from './${name}'`
  )), '\n');
}

function createFPModule(name, signature) {
  if (!signature.length) {
    return (`
      import _${name} from '../${name}'
      export default _${name}
    `);
  }

  const content = (`
    import curry from '../__internal__/curry';
    import _${name} from '../${name}';
    
    export default curry(function ${name} (${join(signature, ', ')}, iterable) {
      return  _${name}(iterable, ${join(signature, ', ')});
    })
  `);

  return content.replace(/^\s{0,8}/gm, '');
}

module.exports = {
  createIndexFile,
  createFPModule,
};
