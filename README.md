<div align="center">
<div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="52%" src="http://oi63.tinypic.com/206iro8.jpg" />
</div>

<p>A functional, lightweight alternative to bluebird.js<br>for the modern age of <code>async</code> / <code>await</code> </p> 
</div>


----

#### all

```js
const results = await async.all(promises);
```

#### props

```js
const results = await async.props({ one: promise, two: 'value' });
```

#### race

```js
const results = await async.race(promises);
```

#### map

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
const results = await async.mapSeries();
```

#### reduce

```js
const results = await async.reduce();
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

#### any

```js
const results = await async.any();
```
