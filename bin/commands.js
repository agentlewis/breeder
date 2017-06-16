#! /usr/bin/env node
var yargs = require("yargs")
var shell = require("shelljs")
var fs = require('fs')
var R = require('ramda')
var compileFromFile = require('json-schema-to-typescript').compileFromFile

var Pollinate = require('./pollinate')

var argv = yargs.usage("$0 <cmd> [args]")
  .command("schema [domain]", "create jsonschema for [domain]", {
    domain: {
      default: 'example'
    }
  }, function (yargs) {
    shell.exec(`mkdir -p json-schemas/${yargs.domain} && cp -n ${__dirname}/template.json json-schemas/${yargs.domain}/${yargs.domain}.json`)
  })
  .command("schema [domain] [componentName]", "create jsonschema of [componentName] for [domain]", {
    domain: {
      default: 'example'
    },
    componentName: {
      default: 'example'
    }
  }, function (yargs) {
    shell.exec(`mkdir -p json-schemas/${yargs.domain} && cp -n ${__dirname}/template.json json-schemas/${yargs.domain}/${yargs.selector}.json`)
  })
  .command("type [name]", "create types based on [name]", {
    name: {
      default: 'example'
    }
  }, function (yargs) {
    shell.exec(`mkdir -p ${yargs.name}/types`)
    fs.readdir(`json-schemas/${yargs.name}`, function (err, files) {
      if (err) return err
      R.map(function (file) {
        var fileName = file.replace(/\.[^/.]+$/, "")
        compileFromFile(`json-schemas/${yargs.name}/${file}`)
        .then(ts => fs.writeFileSync(`${yargs.name}/types/${fileName}.ts`, ts))
      }, files)
    })
  })
  .command("getter [domain]", "stub a function in a getter.ts file", {
    name: {
      default: 'example'
    }
  }, function (yargs) {
    shell.exec(`mkdir -p ${yargs.domain}/getters.ts`)
    Pollinate.interface(yargs.domain)
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
