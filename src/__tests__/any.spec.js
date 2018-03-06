import any from '../any';
import { wait } from './utils';

test('should take only one winner', async () => {
  const promises = [100, 100, 30, 25, 200, 100].map((ms, i) => {
    return wait(ms).then(() => `index ${i}`);
  });

  const winner = await any(promises, 2);

  expect(winner).toEqual('index 3');
});


test('should continue even if some of promises fails', async () => {
  const promises = [100, 100, 30, 25, 100, 100].map((ms, i) => {
    return wait(ms).then(() => {
      if (i === 1 || i === 4) {
        throw new Error();
      }

      return `index ${i}`;
    });
  });

  const winner = await any(promises);
  expect(winner).toEqual('index 3');
});

test('should throw if all promises fails', async () => {
  const promises = [100, 100, 30, 25, 100, 100].map((ms, i) => {
    return wait(ms).then(() => {
      throw new Error(i);
    });
  });


  let subError;
  try {
    await any(promises);
  } catch (err) {
    subError = err;
  }

  const errors = subError.errors.map(({ message }) => message);
  expect(subError.name).toBe('SubError');
  expect(errors).toEqual(['3', '2', '0', '1', '4', '5']);
});
