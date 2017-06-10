# breeder
Organise jsonschemas to describe message data shapes and generate typescript interfaces (types) in dogstack domains

## Run 
`npm run breed`

## Test
`npm run test` (WIP)

## Link
You may use `npm link` to add the bin commands to your path.

## Commands
```
Breed typescript interfaces from jsonschema
breed <cmd> [args]

Commands:
  schema [name]  create a new jsonschema of [name]
  type [name]    create types based on [name]

Options:
  -h, --help  Show help                                                [boolean]

must provide a valid command
```
## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
