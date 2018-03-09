# ![Logo](https://raw.githubusercontent.com/asfktz/Awaity.js/master/media/header.png)


> A functional, lightweight alternative to bluebird.js, built with `async` / `await` in mind.

<br>


## Features

- **Functional utility library for `async` / `await`**<br> Think `lodash` for promises.

- **Bluebird's powerful collections methods, built with native promises**<br> Use functions like `map`, `reduce`, `filter` & `some` to interate over promises in an intuitive way.

- **Fine-grained Concurrency control**<br> Resolve all promises at once or in series of 3? the choice is yours.

- **Built to support Tree Shaking from the ground up**<br> Take what you need leave the rest.

- **Two flavors: Regular & FP style**<br> Similar to `lodash/fp`, Awaity.js comes with additional flavor to support functional composition. <br> If it speaks your language, try `awaity/fp`.



## Introduction
Awaity.js is a subset of bluebird.js that focuses only on whats relevant for `async` / `await` while using native promises instead, the result is a functional utility library with minimal footprint. much like lodash, but for promises.

That grealty reduce the library footprint, while blurbird's is 17KB min/gzip, Awaity.js takes only 2KB for the whole lib, and since it built to support [tree&nbsp;shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) from the ground up, you can easly pick only whats relevent to you and end up with no more than 1KB.


```js
import { map } from 'awaity/esm';

const tasks = await map([1,2,3], async (id) => {
    const res = await fetch(id);
    return res.json();
});

tasks // [{...}, {...}, {...}]

async fetchTodos () { /* resolves an array of todos */ }
async fetchTodo  () { /* resolves a single todo     */ }

// resolve a promise first
const promise = fetchTodos(); 
const titles = await map(promise, (todo) => todo.id);

// or and array of a promises
const promises = [fetchTodo(1), fetchTodo(2), fetchTodo(3)];
const titles = await map(promises, (item) => item.title);
```



## Installation
```bash
npm install awaity

```

## Usage


```js
// Take all
import * as Async from 'awaity';

// Or only what you need
import reduce from 'awaity/reduce';
import some from 'awaity/some';
```

Or for module bundles (such as webpack, parcel, or rollup), use `awaity/esm`
Which used ES Modules to gain tree shaking support:

```js
import { map, reduce, sum } from 'awaity/esm';
```

Note: `node.js` does not support ES Modules out of the box yet.


```js
import fs from 'fs-extra';

import filter from 'awaity/filter';
// OR
import { filter } from 'awaity/esm';


async function getDirectories(path) {
  const promise = fs.readdir(path);

  return filter(promise, async (file) => {
    const stats = await fs.stat(file);
    return stats.isDirectory();
  });
}

const directories = await getDirectories('.');
```


## FP flavor
Todo: expain what it means.

FP flavor is available under the `fp` submodule:
```js
import reduce from 'awaity/fp/reduce';
// OR
import { reduce } from 'awaity/esm/fp';

// Just some promises that returns numbers
const promises = [1,2,3].map((i) => Promise.resolve(i));

// By ommiting the last argument,
// we got a function that expects an array of promises
const sum = reduce((total, i) => total + i, 0);

const total = await sum(promises) // 6
```



### Chaining
Awaity.js provides three diffrent kinds of chaining to choose from:

### By leveraging Promise's native chaining feature:

```js

import { map } from 'awaity';

const postsWithComments = await Promise.resolve([1,2,3])
    .then((ids) => map(ids, (id) => api.getPostById(id)))
    .then((posts) => map(posts, async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })))
```

#### Promise chaining +  `awaity/fp`:

```js

import { map } from 'awaity/fp';

const postsWithComments = await Promise.resolve([1,2,3])
    .then(map((id) => api.getPostById(id))
    .then(map(async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })))
```

### Using `flow`
Flow is a utility to supprt 

```js

import { map, flow } from 'awaity';

const postsWithComments = await flow([1,2,3], [
    (ids) => map(ids, (id) => api.getPostById(id)),
    (posts) => map(posts, async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    }))
]);
```



#### Using `flow` + `awaity/fp`
```js

import { map, flow } from 'awaity/fp';

const postsWithComments = await flow([
    map(ids, (id) => api.getPostById(id)),
    map(posts, async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })
], [1,2,3]);
```

Complex example with promise chain

```js

import { map, reduce, props } from 'awaity/fp';

const posts = await Promise.resolve([1,2,3])
    .then(map((id) => api.getPostById(id)))
    .then(map((post) => props({
        ...post,
        user: api.getUserById(post.userId),
        comments: api.getCommentsByPostId(post.id),
    })))
    .then(reduce(async (results, post) => ({
        ...results,
        [post.id]: post
    })));

```

Complex example with flow

```js
import { flow, map, reduce, props } from 'awaity/esm/fp';

const posts = await flow([
    map(id => api.getPostById(id)),
    map(post => props({
      ...post,
      user: api.getUserById(post.userId),
      comments: api.getCommentsByPostId(post.id),
    })),
    reduce(async (results, post) => ({
      ...results,
      [post.id]: post
    }), {})
], [1, 2, 3]);
```


## API

### Collections
* [all](/docs/api.md#awaityall)
* [any](/docs/api.md#awaityany)
* [each](/docs/api.md#awaityeach)
* [filter](/docs/api.md#awaityfilter)
* [filterLimit](/docs/api.md#awaityfilterlimit)
* [map](/docs/api.md#awaitymap)
* [mapLimit](/docs/api.md#awaitymaplimit)
* [mapSeries](/docs/api.md#awaitymapseries)
* [props](/docs/api.md#awaityprops)
* [race](/docs/api.md#awaityrace)
* [reduce](/docs/api.md#awaityreduce)
* [some](/docs/api.md#awaitysome)

### Utilities
* [flow](/docs/api.md#awaityflow)

### FP Mode
Each module also has an equivalate currird version under the `fp` namespace

```js
import { reduce } from 'awaity/esm/fp';

const sum =  reduce((total, i) => total + i, 0);

const total = await sum(promises);
```

Note: in FP mode, the first argument (the iterable, or promises) is always the last argument.

```js
// Normal mode

import { reduce, map, mapLimit } from 'awaity/esm';

reduce(iterable, reducer, initialValue);
map(iterable, mapper);
mapLimit(iterable, mapper, limit);

// FP mode

import { reduce, map, mapLimit } from 'awaity/esm/fp';

reduce(reducer, initialValue, iterable);
map(mapper, iterable);
mapLimit(mapper, limit, iterable);
```
