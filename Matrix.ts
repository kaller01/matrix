import * as math from 'mathjs'
import { re } from 'mathjs';

export default class Matrix {
    matrix: String[][];


    constructor(input: String) {
        let tmp: String[] = input.split(";");
        let matrix = new Array(tmp.length);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = (tmp[i].trim().split(" "))
        }
        this.matrix = matrix;
    }

    simplify() {
        this.matrix.forEach((row, x) => {
            row.forEach((item, y) => {
                this.matrix[x][y] = math.simplify(item + "").toString()
            })
        })
    }

    size(): number[] {
        return [this.matrix.length, this.matrix[0].length]
    }

    addCol(to: number, from: number, multiple: number) {
        to--;
        from--;

        for (let i = 0; i < this.size()[1]; i++) {
            this.matrix[i][to] += "+(" + this.matrix[i][from] + "*" + multiple + ")";
        }
    }

    evalRow(to: number, from: number, multiple: String) {
        to--;
        from--;
        for (let i = 0; i < this.size()[0]; i++) {
            this.matrix[to][i] = "(" + this.matrix[to][i] + ")" + multiple + this.matrix[from][i];
        }
    }

    evalCol(to: number, from: number, multiple: String) {
        to--;
        from--;
        for (let i = 0; i < this.size()[1]; i++) {
            this.matrix[i][to] = "(" + this.matrix[i][to] + ")" + multiple + this.matrix[i][from];
        }
    }




    evaluate(input: String) {
        if (input.match(/\|/)) {
            // this.swapRow()
            let result = this.evaluateSwap(input)
            if (result.direction == "r")
                this.swapRow(result.to, result.from)
            else
                this.swapCol(result.to, result.from)
        } else {
            let result = this.evaluateExpression(input)
            if (result.direction == "r")
                this.evalRow(result.to, result.from, result.operations)
            else
                this.evalCol(result.to, result.from, result.operations)
        }
    }

    evaluateSwap(input: String) {
        let args = input.split(/\|/)
        return {
            to: parseInt(args[0].replace(/r|k/, "")),
            from: parseInt(args[1].replace(/r|k/, "")),
            operation: "swap",
            direction: args[0][0]
        }
    }

    evaluateExpression(input: String) {
        let args = math.simplify(input + "").toString().split(" ")
        let operands = []
        let result = {
            to: 0,
            from: 0,
            direction: "",
            operation: "expression",
            operations: ""
        }
        args.forEach(arg => {
            if (arg.match("[kr]\\d")) {
                operands.push(arg)
            } else
                result.operations += arg
        });

        if (operands.length == 2) {
            result.to = parseInt(operands[0].replace(/r|k/, ""))
            result.from = parseInt(operands[1].replace(/r|k/, ""))
        }

        result.direction = operands[0][0]
        return result
    }

    multiplyRow(to: number, multiple: number) {
        to--;
        for (let i = 0; i < this.size()[0]; i++) {
            this.matrix[to][i] += "*" + multiple;
        }
    }
    multiplyCol(to: number, multiple: number) {
        to--;
        for (let i = 0; i < this.size()[1]; i++) {
            this.matrix[i][to] += "*" + multiple;
        }
    }

    swapRow(to: number, from: number) {
        to--;
        from--;
        let tmp = this.matrix[to];
        this.matrix[to] = this.matrix[from]
        this.matrix[from] = tmp;
    }

    swapCol(to: number, from: number) {
        to--;
        from--;
        let tmp = new Array(this.size()[1])
        for (let i = 0; i < this.size()[1]; i++) {
            tmp[i] = this.matrix[i][to];
            this.matrix[i][to] = this.matrix[i][from];
            this.matrix[i][from] = tmp[i];
        }
    }

    print() {
        // this.simplify()
        console.table(this.matrix)
    }
}