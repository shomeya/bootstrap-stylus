# bootstrap-stylus

A basic port of the Twitter Bootstrap CSS framework to stylus. Ideal for node.js apps using connect or express.

To learn more about using the framework see the bootstrap docs at http://twitter.github.com/bootstrap.


## Use

Javascript - just add it to stylus's paths:

    stylus(content).set('paths',[require('bootstrap-stylus')]).render(....)


in your .style files:

    @import bootstrap

or set variables before importing:

    $linkColor = red
    @import bootstrap

You can also import individual files by specifying their filename:

    @import reset


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