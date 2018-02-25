
export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function measureTime(fn) {
  const startTime = Date.now();
  await fn();
  const endTime = Date.now();
  return endTime - startTime;
}

export function around(actualTime, expectedTime, offset) {
  if (Math.abs(expectedTime - actualTime) > offset) {
    console.error({
      diff: expectedTime - actualTime,
      expectedTime,
      actualTime,
      offset,
    });

    return false;
  }

  return true;
}


export async function syncify(fn) {
  try {
    const result = await fn();
    return () => { return result; };
  } catch (e) {
    return () => { throw e; };
  }
}
