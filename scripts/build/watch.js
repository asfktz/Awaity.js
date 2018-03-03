const path = require('path');
const chokidar = require('chokidar');
const { debounce } = require('lodash');

module.exports = function watch(dir, callback) {
  chokidar.watch(dir, {
    ignored: [path.join(dir, './node_modules')],
    ignoreInitial: true,
  }).on('all', debounce(callback, 30));
};
