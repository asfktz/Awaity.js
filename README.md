# ![Logo](/media/header.png)


> A functional, lightweight alternative to bluebird.js, built with `async` / `await` in mind.

<br>


## Features

* <b>Functional utility library for `async` / `await` </b><br> Think `lodash` for promises.

* <b>Bluebird's powerful collections methods, built with native promises.</b><br> Use functions like `map`, `reduce`, `filter` & `some` to interate over promises in an intuitive way.

* <b>Fine-grained Concurrency control</b><br> Resolve all promises at once or in series of 3? the choice is yours.

* <b>Built to support Tree Shaking from the ground up</b><br> Take what you need leave the rest.

* <b>Two flavors: Regular & FP style</b><br> Similar to `lodash/fp`, Awaity.js comes with additional flavor for more functional programming (FP) friendly style. <br> If it speaks your language, try `awaity/fp`.



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

Or, If you'r using `awaity-es`:
```js
import { map } from 'awaity-es';

// that will also work
import map from 'awaity-es/map';
```


FP flavor

```js
import { reduce } from 'awaity-es/fp';

const sum = reduce((total, i) => total + i, 0);

const total = sum([1,2,3]);
```



### Chaining
Awaity.js provides three diffrent kinds of chaining to choose from:

### By leveraging Promise's native `then` chainig feature:

```js

import { map } from 'awaity';

const postsWithComments = await Promise.resolve([1,2,3])
    .then((ids) => map(ids, api.getPostById))
    .then((posts) => map(posts, async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })))
```

#### `then` With, `awaity/fp`:

```js

import { map } from 'awaity/fp';

const postsWithComments = await Promise.resolve([1,2,3])
    .then(map((id) => api.getPostById(id)))
    .then(map(async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })))
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

### Using `flow`

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


### Using `chain`:
```js

import { chain } from 'awaity/fp';

const postsWithComments = await chain([1,2,3])
  .map(ids, (id) => api.getPostById(id))
  .map(posts, async (post) => ({
    ...post,
    comments: await api.getCommentsByPostId(post.id)
  })
  .promise()
```

#### Create your own chain:
```js
/* ./myChain.js */

import { createChain, map, reduce } from 'awaity/fp';

export default createChain({ map, reduce });
```

```js
/* ./app.js */

import chain from './myChain.js';

const postsWithComments = await chain([1,2,3])
  .map(id => api.getPostById(id))
  .map(post => props({
    ...post,
    user: api.getUserById(post.userId),
    comments: api.getCommentsByPostId(post.id),
  }))
  .reduce(async (results, post) => ({
    ...results,
    [post.id]: post
  }), {})
  .promise()
```



## API

### Collections
* [all](/docs/api.md#asyncall)
* [any](/docs/api.md#asyncany)
* [each](/docs/api.md#asynceach)
* [filter](/docs/api.md#asyncfilter)
* [filterLimit](/docs/api.md#asyncfilterlimit)
* [map](/docs/api.md#asyncmap)
* [mapLimit](/docs/api.md#asyncmaplimit)
* [mapSeries](/docs/api.md#asyncmapseries)
* [props](/docs/api.md#asyncprops)
* [race](/docs/api.md#asyncrace)
* [reduce](/docs/api.md#asyncreduce)
* [some](/docs/api.md#asyncsome)

### Utilities
* [flow](/docs/api#flow)

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
