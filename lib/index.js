//Support NIB-like including in project

exports.path = __dirname;

exports = module.exports = function () {
  return function(style){
    style.include(__dirname);
  }
}