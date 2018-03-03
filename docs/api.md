# API

Work in progress


## Collections

### Async.all
```js
all(promises) → Promise
```

Resolves an *Array* of promises. Same as `Promise.all`

```js
import { all } from 'littlebird-es';

const promises = [1,2,3].map((i) => Promise.resolve(i + '!'));
const array = await all(promises)

array // ['1!', '2!', '3!'];
```



### Async.any

Like `some`, with 1 as `count`. However, if the promise fulfills, the fulfillment value is not an array of 1 but the value directly.




### Async.each
```js
each(iterable, iterator) → Promise
```

Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given `iterator` function with the signature `(value, index, length)` where `value` is the resolved value of a respective promise in the input array. **Iteration happens serially**.

If the iterator function returns a promise or a thenable, then the result of the promise is awaited before continuing with next iteration. If any promise in the input array is rejected, then the returned promise is rejected as well.

Resolves to the original array unmodified. This method is meant to be used for side effects.

<dl>
    <dt>object</dt>
    <dd>Object of promises</dd>
</dl>

```js
import { each } from 'littlebird-es';

let posts = [];
await each([1,2,3], async (id) => {
    const res = await fetch('/api/posts/' + id);
    const post = await res.json();
    posts.push(post)
});

posts // [{...}, {...}, {...}];

```



### Async.filter


It is essentially an efficient shortcut for doing a [.map](.) and then [`Array#filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter):

```js
const pairs = await map(valuesToBeFiltered, (value, index, length) => {
    return Promise.all([filterer(value, index, length), value]);
})

const filtered = pairs
    .filter(([bool, value]) => bool)
    .map(([bool, value]) => value)
```

Example for filtering only directories:

```js
import Async from 'littlebird-es';
import fs from 'fs-extra';

const dirsOnly = await Async.filter(
  fs.readdir(process.cwd()),
  async (fileName) => {
    const stat = await fs.statAsync(fileName)
    return stat.isDirectory();
  }
);

dirsOnly.each(function(directoryName) {
    console.log(directoryName, " is a directory");
});
```



### Async.filterLimit

Same as filter but with concurrency limit



### Async.map
```js
map(iterable, mapper)
```

Given an `Iterable`(arrays are Iterable), or a promise of an `Iterable`, which produces promises (or a mix of promises and values), iterate over all the values in the `Iterable` into an array and map the array to another using the given `mapper` function.

Promises returned by the `mapper` function are awaited for and the returned promise doesn't fulfill until all mapped promises have fulfilled as well. If any promise in the array is rejected, or any promise returned by the `mapper` function is rejected, the returned promise is rejected as well.

The mapper function for a given item is called as soon as possible, that is, when the promise for that item's index in the input array is fulfilled. This doesn't mean that the result array has items in random order, it means that `.map` can be used for concurrency coordination unlike `.all`.

A common use of Promise.map is to replace the .push+Promise.all boilerplate:

```js
import { map } from 'littlebird-es';

const posts = await map([1,2,3], async (id) => {
    const res = await fetch('/api/posts/' + id);
    return res.json();
});

posts // [{...}, {...}, {...}];
```




### Async.mapLimit
`map(iterable, mapper, limit)`

Same as map but with concurrency limit

Example: map with concurrency limit, resolve only 3 requests at a time
```js
const urls = [/* lots of urls */]
const responses = await map(urls, async (url) => {
    const res = await fetch(url);
    return res.json();
}, 3);
```



### Async.mapSeries
Same as map but but serially, the iterator won't be called for an item until its previous item, and the promise returned by the iterator for that item are fulfilled.



### Async.props
Resolves an *object* of promises

`props(object) → Promise`

<dl>
    <dt>object</dt>
    <dd>Object of promises</dd>
</dl>


```js
import { props } from 'littlebird-es';

const obj = await props({
  a: 'one',
  b: Promise.resolve('two'),
});

obj // { a: 'one', b: 'two' }
```


### Async.race
```js
Async.race(promises)
```

Same as `Promise.race`


### Async.reduce

```js
reduce(iterable, reducer, initialValue)
```

Given an [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)\(arrays are `Iterable`\), or a promise of an `Iterable`, which produces promises (or a mix of promises and values), iterate over all the values in the `Iterable` into an array and [reduce the array to a value](http://en.wikipedia.org/wiki/Fold_\(higher-order_function\)) using the given `reducer` function.

If the reducer function returns a promise, then the result of the promise is awaited, before continuing with next iteration. If any promise in the array is rejected or a promise returned by the reducer function is rejected, the result is rejected as well.

Read given files sequentially while summing their contents as an integer. Each file contains just the text `10`.

```js
Promise.reduce(["file1.txt", "file2.txt", "file3.txt"], function(total, fileName) {
    return fs.readFileAsync(fileName, "utf8").then(function(contents) {
        return total + parseInt(contents, 10);
    });
}, 0).then(function(total) {
    //Total is 30
});
```

*If `initialValue` is `undefined` (or a promise that resolves to `undefined`) and the iterable contains only 1 item, the callback will not be called and the iterable's single item is returned. If the iterable is empty, the callback will not be called and `initialValue` is returned (which may be `undefined`).*

`Promise.reduce` will start calling the reducer as soon as possible, this is why you might want to use it over `Promise.all` (which awaits for the entire array before you can call [`Array#reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) on it).



### Async.some
Given an `Iterable` (arrays are `Iterable`), or a promise of an `Iterable`, which produces promises (or a mix of promises and values), iterate over all the values in the Iterable into an array and return a promise that is fulfilled as soon as `count` promises are fulfilled in the array. The fulfillment value is an array with `count` values in the order they were fulfilled.

This example pings 4 nameservers, and logs the fastest 2 on console:
```js
import { some } from 'littlebird-es';

const [first, second] = await some([
    ping("ns1.example.com"),
    ping("ns2.example.com"),
    ping("ns3.example.com"),
    ping("ns4.example.com")
], 2);
```

If too many promises are rejected so that the promise can never become fulfilled, it will be immediately rejected.

### Utilities
#### Async.flow
```
flow(valie, fns)
```

Flow is a utility function for composing promises, similar to lodash's flow but different in the way that it will first try to resolve a promise before processing to the next function

```js
import { flow, map, reduce } from 'littlebird-es';

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

flow truly shains with littlebird's FP mode, where each function is curried

```js
import { flow, map, reduce } from 'littlebird-es/fp';

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