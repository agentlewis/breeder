var ts = require('typescript');
var tspoon = require('tspoon')
var fs = require('fs');
var path = require('path');
var getter = require('./visitors/getter')

var Pollinate = function () {};

Pollinate.prototype.interface = function (name) {
  console.log(name)
  var config = {
      sourceFileName: `${name}/getters.js`,
      visitors: [getter]
  };
  var sourceCode = fs.readFileSync(path.join(__dirname, 'src.ts'), 'utf8');
  var transpilerOut = tspoon.transpile(sourceCode, config);
  if (transpilerOut.diags) {
      transpilerOut.diags.forEach(function (d) {
      var position = d.file.getLineAndCharacterOfPosition(d.start);
      return console.log('->', d.file.fileName+':'+ (1+position.line)+':'+ position.character, ':',  d.messageText); });
  }
  if (transpilerOut.halted) {
      process.exit(1);
  }
  fs.writeFileSync(path.join(__dirname, 'src.js'), transpilerOut.code, {encoding:'utf8'});

  var mapString = convertSourceMap.fromObject(transpilerOut.sourceMap).toJSON();

  fs.writeFileSync(path.join(__dirname, 'src.js.map'), mapString, {encoding:'utf8'});
}

module.exports = new Pollinate()