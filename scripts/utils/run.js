
module.exports = function run(asyncFn) {
  return asyncFn().catch(console.error);
};
