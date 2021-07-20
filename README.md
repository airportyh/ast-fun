# AST Fun

This repo contains some examples for parsing JavaScript code into ASTs (Abstract Syntax Trees)
and traversing and manipulating them.

# Parsing

Parsing is done via the `parse.js` script which uses Esprima as the JavaScript parser.
To parse a JavaScript file, run: `node parse.js <your JS file>`. This will create a
`.ast` file containing the AST of that file.