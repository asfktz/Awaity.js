# API

Work in progress


## Collections

### awaity/all
```js
all(promises) → Promise
```

Resolves an *Array* of promises. Same as `Promise.all`

```js
import all from 'awaity/all';

const promises = [1,2,3].map((i) => Promise.resolve(i + '!'));
const array = await all(promises)

array // ['1!', '2!', '3!'];
```



### awaity/any
```js
any(promises) → Promise
```

Like `some`, with 1 as `count`. However, if the promise fulfills, the fulfillment value is not an array of 1 but the value directly.




### awaity/each
```js
each(iterable, iterator) → Promise
```

Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given `iterator` function with the signature `(value, index, length)` where `value` is the resolved value of a respective promise in the input array. **Iteration happens serially**.

If the iterator function returns a promise or a thenable, then the result of the promise is awaited before continuing with next iteration. If any promise in the input array is rejected, then the returned promise is rejected as well.

Resolves to the original array unmodified. This method is meant to be used for side effects.


```js
import { each } from 'awaity/esm';

let posts = [];
await each([1,2,3], async (id) => {
    const res = await fetch('/api/posts/' + id);
    const post = await res.json();
    posts.push(post)
});

posts // [{...}, {...}, {...}];

```



### awaity/filter
```js
filter(iterable, filterer) → Promise
```

Used as an efficient way to do [`awaity/map`](#asyncmap) + [`Array#filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). 

For example, consider the case of filtering only directories under a certain path:

```js
import filter from 'awaity/filter';
import fs from 'fs-extra';

async function getDirectories(path) {
  const files = await fs.readdir(path);

  const pairs = await Promise.all(files.map(async (file) => {
    const stats = await fs.stat(file);
    return [stats.isDirectory(), file];
  }));
  
  return pairs
    .filter(([isDirectory, file]) => isDirectory)
    .map(([isDirectory, file]) => file);
}

const directories = await getDirectories('.');
```

Using [`awaity/map`](#asyncfilter), with can achive the same more efficiently and with less builerplate:

```js
import filter from 'awaity/filter';
import fs from 'fs-extra';

async function getDirectories(path) {
  const promise = fs.readdir(path);

  return filter(promise, async (file) => {
    const stats = await fs.stat(file);
    return stats.isDirectory();
  });
}

const directories = await getDirectories('.');
```


### awaity/filterLimit
```js
filterLimit(iterable, iterator, limit) → Promise
```
Same as filter but with concurrency limit



### awaity/map
```js
map(iterable, mapper) → Promise
```

Given an `Iterable`(arrays are Iterable), or a promise of an `Iterable`, which produces promises (or a mix of promises and values), iterate over all the values in the `Iterable` into an array and map the array to another using the given `mapper` function.

Promises returned by the `mapper` function are awaited for and the returned promise doesn't fulfill until all mapped promises have fulfilled as well. If any promise in the array is rejected, or any promise returned by the `mapper` function is rejected, the returned promise is rejected as well.

The mapper function for a given item is called as soon as possible, that is, when the promise for that item's index in the input array is fulfilled. This doesn't mean that the result array has items in random order, it means that `.map` can be used for concurrency coordination unlike `.all`.

A common use of Promise.map is to replace the .push+Promise.all boilerplate:

```js
import map from 'awaity/map';

const posts = await map([1,2,3], async (id) => {
    const res = await fetch('/api/posts/' + id);
    return res.json();
});

posts // [{...}, {...}, {...}];
```




### awaity/mapLimit
```js
mapLimit(iterable, mapper, limit) → Promise
```

Same as map but with concurrency limit

Example: map with concurrency limit, resolve only 3 requests at a time
```js
const urls = [/* lots of urls */]
const responses = await map(urls, async (url) => {
    const res = await fetch(url);
    return res.json();
}, 3);
```


### awaity/mapSeries
```js
mapSeries(iterable, mapper) → Promise
```

Same as map but but serially, the iterator won't be called for an item until its previous item, and the promise returned by the iterator for that item are fulfilled.



### awaity/props
```js
props(object) → Promise
```

Resolves an *object* of promises concurrently.


```js
import { props } from 'awaity/esm';

const data = await props({
  posts: api.get('posts'),
  comments: api.get('comments'),
  authors: api.get('authors'),
});

data.posts // [...]
data.comments // [...]
data.posts // [...]
```

That is in constust of using the following syntax, which resoled serially:
```js
const data = {
  posts: await api.get('posts'),
  comments: await api.get('comments'),
  authors: await api.get('authors'),
}
```



### awaity/race
```js
race(promises) → Promise
```

Same as `Promise.race`


### awaity/reduce
```js
reduce(iterable, reducer, initialValue)
```

Reduce an [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)(such as an Array or Set), or a promise of an `Iterable`, which produces promises (or a mix of promises and values), iterate over all the values in the `Iterable` into an array and [reduce the array to a value](http://en.wikipedia.org/wiki/Fold_\(higher-order_function\)) using the given `reducer` function.

If the reducer function returns a promise, then the result of the promise is awaited, before continuing with next iteration. If any promise in the array is rejected or a promise returned by the reducer function is rejected, the result is rejected as well.

For example, here we sum the total size of all the given files:

```js
const reduce = 'awaity/reduce';
const fs = 'fs-extra';

function getFilesTotalSize (paths) {
  return await reduce(paths, async (total, fileName) => {
      const stat = await fs.stat(fileName, 'utf8');
      return total + stat.size;
  }, 0);  
}

const totalSize = await getFilesTotalSize([
  "file1.txt",
  "file2.txt",
  "file3.txt"
]);

```




### Awaity/some
```js
some(promises) → Promise
```

Given an `Iterable` (arrays are `Iterable`), or a promise of an `Iterable`, which produces promises (or a mix of promises and values), iterate over all the values in the Iterable into an array and return a promise that is fulfilled as soon as `count` promises are fulfilled in the array. The fulfillment value is an array with `count` values in the order they were fulfilled.

This example pings 4 nameservers, and logs the fastest 2 on console:
```js
import { some } from 'awaity/esm';

const [first, second] = await some([
    ping("ns1.example.com"),
    ping("ns2.example.com"),
    ping("ns3.example.com"),
    ping("ns4.example.com")
], 2);
```

If too many promises are rejected so that the promise can never become fulfilled, it will be immediately rejected.

### Utilities
#### Awaity/flow
```js
flow(value, fns) → Promise
```

Flow is a utility function for composing promises, similar to lodash's flow but different in the way that it will first try to resolve a promise before processing to the next function

```js
import { flow, map, reduce } from 'awaity/esm';

const postsById = await flow([1,2,3], [
  (ids) => map(ids, id => api.get('post', id)),
  (posts) => reduce(posts, (postsById, post) => {
    return {
      ...postsById,
      [post.id]: post
    };
  }, {}),
]);

postsById // { 1: { ... }, 2: { ... }, 3: { ... } }
```

flow truly shains with Awaity's FP mode, where each function is curried

```js
import { flow, map, reduce } from 'awaity/esm/fp';

const posts = await flow([
    map(id => api.get('posts', id)),
    map(post => props({
      ...post,
      user: api.get('users', post.userId),
      comments: api.get('posts', post.id, 'comments'),
    })),
    reduce(async (results, post) => ({
      ...results,
      [post.id]: post
    }), {})
], [1, 2, 3]);
```