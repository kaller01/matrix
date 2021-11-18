"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
class Matrix {
    constructor(x, y) {
        this.matrix = new Array(x);
        for (let i = 0; i < x; i++) {
            this.matrix[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                this.matrix[i][j] = "0";
            }
        }
    }
    setup(input) {
        let tmp = input.split(";");
        let matrix = new Array(tmp.length);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = (tmp[i].trim().split(" "));
        }
        this.matrix = matrix;
    }
    simplify() {
        this.matrix.forEach((row, x) => {
            row.forEach((item, y) => {
                this.matrix[x][y] = math.simplify(item + "").toString();
            });
        });
    }
    size() {
        return [this.matrix.length, this.matrix[0].length];
    }
    evalRow(to, from, multiple) {
        console.log({ to, from, multiple });
        to--;
        from--;
        for (let i = 0; i < this.size()[1]; i++) {
            this.matrix[to][i] = `(${this.matrix[to][i]})${multiple}(${this.matrix[from][i]})`;
        }
    }
    evalCol(to, from, multiple) {
        console.log({ to, from, multiple });
        to--;
        from--;
        for (let i = 0; i < this.size()[0]; i++) {
            this.matrix[i][to] = `(${this.matrix[i][to]})${multiple}(${this.matrix[i][from]})`;
        }
    }
    evalMultCol(to, multiple) {
        console.log({ to, multiple });
        to--;
        for (let i = 0; i < this.size()[0]; i++) {
            this.matrix[i][to] = `(${this.matrix[i][to]})${multiple}`;
        }
    }
    evalMultRow(to, multiple) {
        console.log({ to, multiple });
        to--;
        for (let i = 0; i < this.size()[1]; i++) {
            this.matrix[to][i] = `(${this.matrix[to][i]})${multiple}`;
        }
    }
    evaluate(input) {
        if (input.match(/\|/)) {
            // this.swapRow()
            let result = this.evaluateSwap(input);
            if (result.direction == "r")
                this.swapRow(result.to, result.from);
            else
                this.swapCol(result.to, result.from);
        }
        else if (Matrix.containsTwoLines(input)) {
            console.log(input);
            let result = this.evaluateExpression(input);
            if (!Matrix.endsWithOperator(result.operations))
                result.operations += "*";
            if (result.direction == "r")
                this.evalRow(result.to, result.from, result.operations);
            else
                this.evalCol(result.to, result.from, result.operations);
        }
        else {
            let result = this.evaluateMult(input);
            if (result.direction == "r")
                this.evalMultRow(result.to, result.multiple);
            else
                this.evalMultCol(result.to, result.multiple);
        }
    }
    evaluateMult(input) {
        let line = input.match(/[kr]\d/g)[0];
        let multiple = input.split(line)[1];
        return {
            to: parseInt(line.replace(/r|k/, "")),
            multiple,
            direction: line[0]
        };
    }
    evaluateSwap(input) {
        let args = input.split(/\|/);
        return {
            to: parseInt(args[0].replace(/r|k/, "")),
            from: parseInt(args[1].replace(/r|k/, "")),
            direction: args[0][0]
        };
    }
    evaluateExpression(input) {
        let args = math.simplify(input + "").toString().split(" ");
        let operands = [];
        let result = {
            to: 0,
            from: 0,
            direction: "",
            operations: ""
        };
        args.forEach(arg => {
            if (arg.match("[kr]\\d")) {
                operands.push(arg);
            }
            else
                result.operations += arg;
        });
        if (operands.length == 2) {
            result.to = parseInt(operands[0].replace(/r|k/, ""));
            result.from = parseInt(operands[1].replace(/r|k/, ""));
        }
        result.direction = operands[0][0];
        return result;
    }
    swapRow(to, from) {
        to--;
        from--;
        let tmp = this.matrix[to];
        this.matrix[to] = this.matrix[from];
        this.matrix[from] = tmp;
    }
    swapCol(to, from) {
        to--;
        from--;
        let tmp = new Array(this.size()[1]);
        for (let i = 0; i < this.size()[1]; i++) {
            tmp[i] = this.matrix[i][to];
            this.matrix[i][to] = this.matrix[i][from];
            this.matrix[i][from] = tmp[i];
        }
    }
    get(x, y) {
        return this.matrix[x][y];
    }
    set(x, y, value) {
        this.matrix[x][y] = value;
    }
    static multiply(a, b) {
        if (a.size()[1] == b.size()[0]) {
            const m = a.size()[1];
            const c = new Matrix(a.size()[0], b.size()[1]);
            for (let i = 0; i < c.size()[0]; i++) {
                for (let j = 0; j < c.size()[1]; j++) {
                    let sum = "";
                    for (let k = 0; k < m; k++) {
                        sum += a.get(i, k) + "*" + b.get(k, j) + "+";
                    }
                    c.set(i, j, math.simplify(sum + "0").toString());
                }
            }
            return c;
        }
        else {
            console.error("Matrix does not match r*m m*k");
        }
    }
    static endsWithOperator(multiple) {
        switch (multiple.slice(multiple.length - 1)) {
            case "+":
            case "-":
            case "*":
            case "/":
                return true;
        }
        return false;
    }
    static containsTwoLines(expression) {
        return (expression.match(/[kr]\d/g).length) == 2;
    }
    print() {
        console.table(this.matrix);
    }
}
exports.default = Matrix;
//# sourceMappingURL=Matrix.js.map