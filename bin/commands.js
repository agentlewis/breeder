#! /usr/bin/env node
var yargs = require("yargs");
var shell = require("shelljs");

console.log("Breed typescript interfaces from jsonschema")

var argv = yargs.usage("$0 <cmd> [args]")
  .command("jsonschema [name]", "create a new jsonschema of [name]", {
    name: {
      default: 'message'
    }
  }, function (yargs) {
    shell.exec(`mkdir ${yargs.name} && touch ${yargs.name}/${yargs.name}.json`);
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv