const join = (arr, sep) => arr.join(sep);
const trim = str => str.trim();
const makeLines = items => mapper => join(items.map(mapper).map(trim), '\n');

const regularIndex = (moduleType, lines) => (`
  ${lines(([name]) => (
    moduleType === 'commonjs'
      ? `exports._${name} = require('./${name}');`
      : `export { ${name} } from './${name}';`
  ))}
`);

const fnIndex = (moduleType, lines) => (`
  ${lines(([name]) => (
    moduleType === 'commonjs'
      ? `const _${name} = require('./${name}');`
      : `import _${name} from './${name}';`
  ))}
  ${lines(([name, signature]) => {
    const exportExp = moduleType === 'commonjs'
      ? 'exports.'
      : 'export const ';

    return signature.length
      ? `${exportExp}${name} = (${signature.join(', ')}) => (iterable) => _${name}(iterable, ${signature.join(', ')})`
      : `${exportExp}${name} = _${name}`;
  })}
`);

module.exports = function generateIndex(mode, moduleType, definitions) {
  const lines = makeLines(definitions);
  const content = mode === 'fn'
    ? fnIndex(moduleType, lines)
    : regularIndex(moduleType, lines);

  return content.replace(/^\s{0,8}/gm, '');
}
