import * as awaity from './index';

const wait = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));

async function run() {
  // const results = await awaity.mapSeries([0, 1, 2, 3, 4, 5, 6, 7, 8], async (str, i) => {
  //   console.log(i);
  //   await wait(500 + (i * 50));
  //   const val = await Promise.resolve(`${i}!`);
  //   return str + val;
  // }, '');

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const results = await awaity.reduce(numbers, async (str, i) => {
    console.log(i);
    await wait(500 + (i * 50));
    const val = await Promise.resolve(`${i}!`);
    return str + val;
  }, '');

  console.log(results);
}

run().catch(console.error);
