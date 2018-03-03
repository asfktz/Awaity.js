# ![Logo](/media/header.png)


> A functional, lightweight alternative to bluebird.js, built with `async` / `await` in mind.

<br>

### Features
- A toolbelt for `async` / `await`, use  with functions like `map`, `reduce` & `each` with promises
- Fine-grained concurrency control
- Tree Shaking support, take only what you need and leave the rest.
- It's tiny, like 2KB tiny.
- Uses Native Promises.
- Fully compatible with Bluebird's Collections Methods.



## Introduction
littlebird.js is a subset of bluebird.js that focuses only on parts that relevant for `async` / `await` and reimplement those with native promises.

While blurbird's is 17KB min/gzip, littlebird.js takes only 2KB for the whole lib, and since it built to support tree shaking from the ground up, you can easly pick only whats relevent for you and end up with no more than 0.5KB.

### What's included?

* Functions like `map` & `reduce` that can handle promises in intutive way.
* Fine-grained Concurrency control, resolve all promises at once or in series of 3? the changes is yours.

### Yeah, but I really like chaining!
I feel you.


```js

import { flow, map, reduce, props } from 'littlebird-es/fp';

const posts = await Promise.resolve([1,2,3])
    .then(map((id) => api.get('posts', id)))
    .then(map((post) => props({
        ...post,
        user: api.get('users', post.userId),
        comments: api.get('posts', post.id, 'comments'),
    })))
    .then(reduce(async (results, post) => ({
        ...results,
        [post.id]: post
    })));

```


```js
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
## Installation
```js
npm install littlebird
```

## Usage

```js
import * as Async from 'littlebird';
````

Or, take only what you need

```js
import { map as mapAsync } from 'littlebird';
```
```js
import mapAsync from 'littlebird/map';
```

## API
Documentation is still a work in progress, but since the API is fully compitable with Bluebird's Collections methods, you can read about them there.

### Collections
* all
* any
* each
* filter
* filterLimit
* map
* mapLimit
* mapSeries
* props
* race
* reduce
* some

### Utilities
* flow


## Credits
Todo
