"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("./Matrix");
// import prompt from 'prompt'
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const data = [];
//Arguments
if (process.argv.length == 3) {
    const fs = require('fs');
    const filename = process.argv[2];
    fs.readFile(filename, 'utf8', (err, text) => {
        if (err)
            throw err;
        let commands = text.split("\n");
        commands.forEach(command => {
            execute(command);
        });
    });
}
//Prompts
rl.setPrompt('Enter operation: \n');
rl.prompt();
rl.on('line', function (input) {
    execute(input);
    rl.prompt();
}).on('close', function () {
    console.log('All commands executed');
    process.exit(0);
});
function execute(input) {
    let name;
    if (input == "exit") {
        rl.close();
    }
    if (input.includes("*=")) {
        input = input.split("*=");
        name = input[0];
        let target = input[1];
        (Matrix_1.default.multiply(data[name], data[target])).print();
    }
    else if (input.includes("=")) {
        input = input.split("=");
        name = input[0];
        let matrix = input[1];
        data[name] = new Matrix_1.default(0, 0);
        (data[name]).setup(matrix);
        (data[name]).print();
    }
    else {
        input = input.split(":");
        if (input.length == 2) {
            name = input[0];
            let operation = input[1];
            data[name].evaluate(operation);
            // data[name].print()
            data[name].simplify();
            data[name].print();
        }
    }
}
//# sourceMappingURL=app.js.map