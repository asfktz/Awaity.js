<br><br>

<div align="center">
<div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="52%" src="http://oi63.tinypic.com/206iro8.jpg" />
</div>

<p>A functional, lightweight alternative to bluebird.js<br>for the modern age of <code>async</code> / <code>await</code> </p> 
</div>

<br><br><br>


### Features
- It's like lodash for `async` / `await`
- Tree Shaking support, take only what you need and leave the rest.
- It's tiny, around 3KB.
- Uses Native Promises instead.







### Installation
```js
npm install littlebird
```

### Usage

```js
import * as Async from 'littlebird';
````

Or, take only what you need

```js
import { map as mapAsync } from 'littlebird/esm';
```
```js
import mapAsync from 'littlebird/map';
```
