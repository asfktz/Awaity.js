<br><br>

<div align="center">
<div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="52%" src="http://oi63.tinypic.com/206iro8.jpg" />
</div>
  
<p>A functional, lightweight alternative to bluebird.js<br> built with <code>async</code> / <code>await</code> in mind.</p> 
</div>

<br><br><br>


### Features
- A toolbelt for `async` / `await`, use  with functions like `map`, `reduce` & `each` with promises
- Fine-grained concurrency control
- Tree Shaking support, take only what you need and leave the rest.
- It's tiny, like 2KB tiny.
- Uses Native Promises.
- Fully compatible with Bluebird's Collections Methods.



## Introduction
littleBird implements Bluebird's collections methods with native promises


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

[all](http://bluebirdjs.com/docs/api/promise.all.html)

[any](http://bluebirdjs.com/docs/api/promise.any.html)

[each](http://bluebirdjs.com/docs/api/promise.each.html)

[filter](http://bluebirdjs.com/docs/api/promise.filter.html)

[map](http://bluebirdjs.com/docs/api/promise.map.html)

[mapSeries](http://bluebirdjs.com/docs/api/promise.mapSeries.html)

[props](http://bluebirdjs.com/docs/api/promise.props.html)

[race](http://bluebirdjs.com/docs/api/promise.race.html)

[reduce](http://bluebirdjs.com/docs/api/promise.reduce.html)

[some](http://bluebirdjs.com/docs/api/promise.some.html)


## Credits
Todo 111
