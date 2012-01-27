
/**
 * Module dependencies.
 */

var stylus = require('stylus')
  , basename = require('path').basename
  , fs = require('fs')
  , diff = require('diff');

// whitespace

function _removeMultiliner(str) {
  str = str || '';
  str = str.replace(/,\n/gi ,',');
  str = str.replace(/, /gi ,',');
  return str;
}

function removeComments(str) {
 
    var uid = '_' + +new Date(),
        primatives = [],
        primIndex = 0;
 
    return (
        str
        /* Remove strings */
        .replace(/(['"])(\\\1|.)+?\1/g, function(match){
            primatives[primIndex] = match;
            return (uid + '') + primIndex++;
        })
 
        /* Remove Regexes */
        .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function(match, $1, $2){
            primatives[primIndex] = $2;
            return $1 + (uid + '') + primIndex++;
        })
 
        /*
        - Remove single-line comments that contain would-be multi-line delimiters
            E.g. // Comment /* <--
        - Remove multi-line comments that contain would be single-line delimiters
            E.g. /* // <-- 
       */
        .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
 
        /*
        Remove single and multi-line comments,
        no consideration of inner-contents
       */
        .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
 
        /*
        Remove multi-line comments that have a replaced ending (string/regex)
        Greedy, so no inner strings/regexes will stop it.
       */
        .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')
 
        /* Bring back strings & regexes */
        .replace(RegExp(uid + '(\\d+)', 'g'), function(match, n){
            return primatives[n];
        })
    );
 
}

/**
 * Test the given `test`.
 *
 * @param {String} test
 * @param {Function} fn
 */

function test(file, fn) {

  var path =  __dirname + '/../lib/' + file + '.styl'
    , csspath = __dirname + '/' + file + '.css.org';

  fs.readFile(path, 'utf8', function(err, str){
    if (err) throw err;

    var style = stylus(str)
      .set('filename', path)
      .define('url', stylus.url());

    style.render(function(err, actual){
      if (err) throw err;
      fs.readFile(csspath, 'utf8', function(err, expected){
        if (err) throw err;
        fn(_removeMultiliner(actual), _removeMultiliner(expected));
      });
    });
  });
}

/**
 * Auto-load and run tests.
 */
var curr = "bootstrap";
test(curr, function(actual, expected){
  var path = __dirname + '/' + curr + '.css';
  fs.writeFile(path+".gen", actual, function (err) {
    if (err) throw err;

  });
  fs.writeFile(path+".org", expected, function (err) {
    if (err) throw err;
    
  });
});