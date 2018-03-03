# ![Logo](/media/header.png)


> A functional, lightweight alternative to bluebird.js, built with `async` / `await` in mind.

<br>


## Introduction
littlebird.js is a subset of bluebird.js that focuses only on parts that relevant for `async` / `await` and reimplement those with native promises.

While blurbird's is 17KB min/gzip, littlebird.js takes only 2KB for the whole lib, and since it built to support tree shaking from the ground up, you can easly pick only whats relevent for you and end up with no more than 0.5KB.

## What's included?

* <b>Bluebird's powerful collections methods.</b><br> Use functions like `map`, `reduce`, `filter` & `some` to interate over promises in an intuitive way.  

* <b>Fine-grained Concurrency control</b><br> Resolve all promises at once or in series of 3? the choice is yours.

* <b>Tree Shaking support</b><br> Take only what you need and leave the rest.

* <b>FP flavor</b><br> Feel at home with partial applications? you'd like this one.

* <b>Compatibility with Bluebird</b><br>

## What's not?

* <b>Bluebird's extended Promise</b><br> While is awesome for chaining, it became less usful in light of `async` / `await`.

* <b>Cancellation & Resource management</b><br> One of the main advantage of bluebird is the ability to cancel an on going promise. <br> Since littlebird uses native promises instead, cancellation is not supported unfortunately. 


### But I really like chaining!
Yeah, me too, but chaining comes with a cost.
When we import `Promise` from bluebird only to use `map` like so:

```js

import Promise from 'bluebird';

const postsWithComments = await Promise.resolve([1,2,3])
    .map((id) => api.getPostById(id))
    .map(async (post) => {
      return {
        ...post,
        comments: await api.getCommentsByPostId(post.id)
      }
    });
```

We actually end up with the entire library in our bundle.
Thats becouse module bundler (such as webpack, rollup or parcel) can't figure out what to include and what not that way.

So how can we chain without significantly increaseing our bundle size? 
By embracing function composition instead


Using Promiss's native chaining
```js

import { map } from 'littlebird';

const postsWithComments = await Promise.resolve([1,2,3])
    .then((ids) => map(ids, api.getPostById))
    .then((posts) => map(posts, async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })))
```

With FP Mode
```js

import { map } from 'littlebird/fp';

const postsWithComments = await Promise.resolve([1,2,3])
    .then(map((id) => api.getPostById(id)))
    .then(map(async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    })))
```

With FP Mode + flow
```js

import { map, flow } from 'littlebird/fp';

const postsWithComments = await flow([
    map((id) => api.getPostById(id)),
    map(async (post) => ({
      ...post,
      comments: await api.getCommentsByPostId(post.id)
    }))
], [1,2,3]);
```


Complex example with promise chain

```js

import { flow, map, reduce, props } from 'littlebird-es/fp';

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

## Installation
```js
npm install littlebird
```

## Usage

```js
import Async from 'littlebird-es';
```

```js
import Async from 'littlebird';
```

Or, take only what you need

```js
import { map as mapAsync } from 'littlebird-es';
```
```js
import mapAsync from 'littlebird/map';
```


FP

```js
import { map } from 'littlebird-es/fp';
```


## API

### Collections
* [all](/docs/api.md#all)
* [any](/docs/api.md#any)
* [each](/docs/api.md#each)
* [filter](/docs/api.md#filter)
* [filterLimit](/docs/api.md#filterLimit)
* [map](/docs/api.md#map)
* [mapLimit](/docs/api.md#mapLimit)
* [mapSeries](/docs/api.md#mapSeries)
* [props](/docs/api.md#props)
* [race](/docs/api.md#race)
* [reduce](/docs/api.md#reduce)
* [some](/docs/api.md#some)

### Utilities
* [flow](/docs/api#flow)

### FP Mode
Each module also has an equivalate currird version under the `fp` namespace

```js
import { reduce } from 'littlebird-es/fp';

const sum =  reduce((total, i) => total + i, 0);

const total = await sum(promises);
```

Note: in FP mode, the first argument (the iterable, or promises) is always the last argument.

```js
// Normal mode

import { reduce, map, mapLimit } from 'littlebird-es';

reduce(iterable, reducer, initialValue);
map(iterable, mapper);
mapLimit(iterable, mapper, limit);

// FP mode

import { reduce, map, mapLimit } from 'littlebird-es/fp';

reduce(reducer, initialValue, iterable);
map(mapper, iterable);
mapLimit(mapper, limit, iterable);
```
