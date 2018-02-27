<br><br>

<div align="center">
<div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="52%" src="http://oi63.tinypic.com/206iro8.jpg" />
</div>
  
<p>A functional, lightweight alternative to bluebird.js when<br> <code>async</code> / <code>await</code> + <code>concurrency control</code> is all you want.</p> 
</div>

<br><br><br>


### Features
- A toolbox for your `async` / `await` needs (think lodash with promises)
- Fine-grained concurrency control
- Tree Shaking support, take only what you need and leave the rest.
- It's tiny, around 3KB.
- Uses Native Promises.
- Fully compatible with Bluebird's Static Methods.




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
import { map as mapAsync } from 'littlebird/esm';
```
```js
import mapAsync from 'littlebird/map';
```

## API
See full [API](/docs/api.md)

## Credits
Todo
