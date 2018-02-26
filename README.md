<br><br>

<div align="center">
<div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="52%" src="http://oi63.tinypic.com/206iro8.jpg" />
</div>

<p>A functional, lightweight alternative to bluebird.js<br>for the modern age of <code>async</code> / <code>await</code> </p> 
</div>



<br><br><br>

### Features
* Tree shake support


### Installation
```js
npm install littlebird
```

### Usage

```js
import * as Async from 'littlebird';

// or, take only what you need
import { map as mapAsync } from 'littlebird';
```


#### map(iterable, mapper, { concurrency: Infinity })
Given an Iterable(arrays are Iterable), or a promise of an Iterable, which produces promises (or a mix of promises and values), iterate over all the values in the Iterable into an array and map the array to another using the given mapper function.

Promises returned by the mapper function are awaited for and the returned promise doesn't fulfill until all mapped promises have fulfilled as well. If any promise in the array is rejected, or any promise returned by the mapper function is rejected, the returned promise is rejected as well.

The mapper function for a given item is called as soon as possible, that is, when the promise for that item's index in the input array is fulfilled. This doesn't mean that the result array has items in random order, it means that .map can be used for concurrency coordination unlike .all.

A common use of Promise.map is to replace the .push+Promise.all boilerplate:




```js
import { map } from 'littlebird';

const posts = await map([1,2,3], async (id) => {
    const res = await fetch(`/api/posts/${id}`);
    return res.json();
});
```

```js

import { map as mapAsync } from 'littlebird';

const promises = [1,2,3].map(async (id) => {
    const res = await fetch(`/api/posts/${id}`);
    return res.json();
});

const titles = await mapAsync(promises, (post) => post.title);
```


#### mapSeries

```js
import { mapSeries } from 'littlebird';

const results = await async.mapSeries();
```

#### reduce

```js
import { reduce as reduceAsync } from 'littlebird';

const results = await reduceAsync(promises, async (count, num) => {
    return count + num
}, 0);
```

#### all(Iterable<any>|Promise<Iterable<any>> input) -> Promise<Array<any>>

```js
import { all } from 'littlebird';

const results = await all(promises);

results // [...,...,...,...]
```

#### props(Object|Map|Promise<Object|Map> input) -> Promise

```js
import { props } from 'littleBird';

const results = await props({
    one: promise,
    two: 'value'
});

results // { one: ..., two: ... }
```


#### each

```js
const results = await async.each();
```

#### filter

```js
const results = await async.filter();
```

#### some

```js
const results = await async.some();
```

#### race

```js
const results = await async.race(promises);
```

#### any

```js
const results = await async.any();
```
