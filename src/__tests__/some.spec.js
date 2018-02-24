import some from '../some';
import { wait } from './utils';

test.skip('should take only the first two fulfilled promises', async () => {
  const promises = [100, 100, 50, 25, 200, 100].map((ms, i) => {
    return wait(ms).then(() => `index ${i}`);
  });

  const results = await some(promises, 2);

  expect(results).toEqual(['index 2', 'index 3']);
});
