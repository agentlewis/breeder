var ts = require('typescript');
var tspoon = require('tspoon')
var fs = require('fs');
var path = require('path');
var tsstruct = require("ts-structure-parser")
var R = require('rambda')

var visitType = require('./visitors/type')

var Pollinate = function () {};

Pollinate.prototype.interface = function (name) {
  var config = {
      sourceFileName: path.relative(process.cwd(),`${name}/getters.ts`),
      visitors: [type]
  }

  var interfaces = getInterfaces(name)
  
  // Todo: add the import statement to getter.ts
  // Todo: if no structured selector exists for the interface name - stub it out at the bottom of the file.
  // Todo: if a structured selector exists for the interface name add the interface as the return type
  var sourceCode = fs.readFileSync(path.relative(process.cwd(),`${name}/getters.ts`), 'utf8')

  var transpilerOut = tspoon.transpile(sourceCode, config);
  console.log(transpilerOut)

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

function getInterfaces (name) {
  var filePath = path.relative(process.cwd(),`${name}/types/${name}.ts`)
  var decls = fs.readFileSync(filePath).toString()
  var jsonStructure = tsstruct.parseStruct(decls,{},filePath)
  return R.filter(isInterface, jsonStructure.classes)
}

function isInterface (item) {
  if (item.isInterface) return item
}

module.exports = new Pollinate()