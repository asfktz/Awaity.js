<br><br>

<div align="center">
<div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img width="52%" src="http://oi63.tinypic.com/206iro8.jpg" />
</div>
  
<p>A functional, lightweight alternative to bluebird.js<br> when <code>async</code> / <code>await</code> + concurrency control is all you want.</p> 
</div>

<br><br><br>


### Features
- A toolbelt for `async` / `await`, use  with functions like `map`, `reduce` & `each` with promises
- Fine-grained concurrency control
- Tree Shaking support, take only what you need and leave the rest.
- It's tiny, around 3KB.
- Uses Native Promises.
- Fully compatible with Bluebird's Collections Methods.




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
Documentation is still a work in progress, but since the API is fully compitable with Bluebird's Collections methods, you can read about them there.

#### all
#### any
#### each
#### filter
#### map
#### mapSeries
#### props
#### race
#### reduce
#### some

## Credits
Todo
