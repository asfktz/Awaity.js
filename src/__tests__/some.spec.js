import some from '../some';
import { wait } from './utils';

test('should take only the first two fulfilled promises', async () => {
  const promises = [100, 100, 50, 25, 200, 100].map((ms, i) => {
    return wait(ms).then(() => `index ${i}`);
  });

  const results = await some(promises, 2);

  expect(results).toEqual(['index 2', 'index 3']);
});


test('should take only the first two fulfilled promises', async () => {
  const promises = [100, 100, 50, 25, 200, 100].map(async (ms, i) => {
    await wait(ms);

    if (i < 3) {
      throw new Error(i);
    }

    return `index ${i}`;
  });

  let subError;
  try {
    await some(promises, 3);
  } catch (err) {
    subError = err;
  }

  const errors = subError.errors.map(({ message }) => message);
  expect(subError.name).toBe('SubError');
  expect(errors).toEqual(['2', '0', '1']);
});
