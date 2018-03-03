
function run(asyncFn) {
  return asyncFn().catch(console.error);
}

module.exports = { run };
