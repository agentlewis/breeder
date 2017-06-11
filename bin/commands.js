#! /usr/bin/env node
var yargs = require("yargs")
var shell = require("shelljs")
var fs = require('fs')
var R = require('ramda')
var compileFromFile = require('json-schema-to-typescript').compileFromFile

var Pollinate = require('./pollinate')

console.log("Breed typescript interfaces from jsonschema")

var argv = yargs.usage("$0 <cmd> [args]")
  .command("schema [name]", "create a new jsonschema of [name]", {
    name: {
      default: 'example'
    }
  }, function (yargs) {
    shell.exec(`mkdir -p json-schemas/${yargs.name} && cp ${__dirname}/template.json json-schemas/${yargs.name}/${yargs.name}.json`)
  })
  .command("type [name]", "create types based on [name]", {
    name: {
      default: 'example'
    }
  }, function (yargs) {
    shell.exec(`mkdir -p ${yargs.name}/types`)
    fs.readdir(`json-schemas/${yargs.name}`, function (err, files) {
      if (err) return err
      console.log(files)
      R.map(function (file) {
        var fileName = file.replace(/\.[^/.]+$/, "")
        compileFromFile(`json-schemas/${yargs.name}/${file}`)
        .then(ts => fs.writeFileSync(`${yargs.name}/types/${fileName}.ts`, ts))
      }, files)
    })
  })
  .command("getter [name]", "stub a function in a getter.js file", {
    name: {
      default: 'example'
    }
  }, function (yargs) {
    Pollinate.interface(yargs.name)
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv