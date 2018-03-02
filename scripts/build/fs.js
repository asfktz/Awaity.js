const { dirname } = require('path');
const {
  ensureDir,
  writeFile,
  readFile,
  emptyDir,
  writeJson,
  readJson,
} = require('fs-extra');

async function write(path, contents) {
  await ensureDir(dirname(path));
  return writeFile(path, contents);
}

module.exports = {
  read: readFile,
  write,
  emptyDir,
  writeJson,
  readJson,
};
