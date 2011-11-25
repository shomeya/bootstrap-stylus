# bootstrap-stylus

A basic port of the Twitter Bootstrap CSS framework to stylus. Ideal for node.js apps using connect or express.

To learn more about using the framework see the bootstrap docs at http://twitter.github.com/bootstrap.


## Use

Javascript - add just like you'd use nib:

```javascript
var bootstrap = require('bootstrap-stylus'),
       stylus = require('stylus');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(bootstrap());
}

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
```

in your .style files:

```css
@import bootstrap
````

or set variables before importing:

```css
$linkColor = red
@import bootstrap
```

You can also import individual files by specifying their filename:

```css
@import reset
```

## Authors

### Twitter Bootstrap by:

**Mark Otto**

+ http://twitter.com/mdo
+ http://github.com/markdotto

**Jacob Thornton**

+ http://twitter.com/fat
+ http://github.com/fat

### Port to stylus by

**Michael Prasuhn**

+ http://twitter.com/mikey_p
+ https://github.com/mikeyp

## License

Copyright 2011 Twitter, Inc.

Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0