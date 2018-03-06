# ![Logo](/media/header.png)


> A functional, lightweight alternative to bluebird.js, built with `async` / `await` in mind.

<br>


## Features

* <b>Functional utility library for `async` / `await` </b><br> Think `lodash` for promises.

* <b>Bluebird's powerful collections methods, built with native promises.</b><br> Use functions like `map`, `reduce`, `filter` & `some` to interate over promises in an intuitive way.

* <b>Fine-grained Concurrency control</b><br> Resolve all promises at once or in series of 3? the choice is yours.

* <b>Built to support Tree Shaking from the ground up</b><br> Take what you need leave the rest.

* <b>Two flavors: Regular & FP style</b><br> Similar to `lodash/fp`, Awaity.js comes with additional flavor to support functional composition. <br> If it speaks your language, try `awaity/fp`.



## Introduction
Awaity.js is a subset of bluebird.js that focuses only on whats relevant for `async` / `await` while using native promises instead, the result is a functional utilty library with minimal footprint. much like lodash, but for promises.

That grealty reduce the library footprint, while blurbird's is 17KB min/gzip, Awaity.js takes only 2KB for the whole lib, and since it built to support [tree&nbsp;shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) from the ground up, you can easly pick only whats relevent to you and end up with no more than 0.5KB.


```js
import { map } from 'awaity-es';

const tasks = map([1,2,3], async (id) => {
    const res = await fetch(id);
    return res.json();
});

tasks // [{...}, {...}, {...}]
```


## Installation
```bash
npm install awaity

```

Or, with ES modules and tree shaking support

```bash
npm install awaity-es
```

## Usage

```js
import Async from 'awaity';
```

Take only what you need

```js
import map from 'awaity/map';
import reduce from 'awaity/reduce';
import some from 'awaity/some';
```

Or, If you'r using `awaity-es`, you can benefit from tree shaking.

```js
import { map, reduce, some } from 'awaity-es';
```


FP flavor is available under the `fp` submodule:

```js
import { reduce } from 'awaity-es/fp';

const sum = reduce((total, i) => total + i, 0);

const total = sum([1,2,3]);
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

#### native chaining feature +  `awaity/fp`:

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
import { flow, map, reduce, props } from 'awaity-es/fp';

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
import { reduce } from 'awaity-es/fp';

const sum =  reduce((total, i) => total + i, 0);

const total = await sum(promises);
```

Note: in FP mode, the first argument (the iterable, or promises) is always the last argument.

```js
// Normal mode

import { reduce, map, mapLimit } from 'awaity-es';

reduce(iterable, reducer, initialValue);
map(iterable, mapper);
mapLimit(iterable, mapper, limit);

// FP mode

import { reduce, map, mapLimit } from 'awaity-es/fp';

reduce(reducer, initialValue, iterable);
map(mapper, iterable);
mapLimit(mapper, limit, iterable);
```
