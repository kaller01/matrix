"use strict";
exports.__esModule = true;
var math = require("mathjs");
var Matrix = /** @class */ (function () {
    function Matrix(input) {
        var tmp = input.split(";");
        var matrix = new Array(tmp.length);
        for (var i = 0; i < matrix.length; i++) {
            matrix[i] = (tmp[i].trim().split(" "));
        }
        this.matrix = matrix;
    }
    Matrix.prototype.simplify = function () {
        var _this = this;
        this.matrix.forEach(function (row, x) {
            row.forEach(function (item, y) {
                _this.matrix[x][y] = math.simplify(item + "").toString();
            });
        });
    };
    Matrix.prototype.size = function () {
        return [this.matrix.length, this.matrix[0].length];
    };
    Matrix.prototype.addCol = function (to, from, multiple) {
        to--;
        from--;
        for (var i = 0; i < this.size()[1]; i++) {
            this.matrix[i][to] += "+(" + this.matrix[i][from] + "*" + multiple + ")";
        }
    };
    Matrix.prototype.evalRow = function (to, from, multiple) {
        to--;
        from--;
        for (var i = 0; i < this.size()[0]; i++) {
            this.matrix[to][i] = "(" + this.matrix[to][i] + ")" + multiple + this.matrix[from][i];
        }
    };
    Matrix.prototype.evalCol = function (to, from, multiple) {
        to--;
        from--;
        for (var i = 0; i < this.size()[1]; i++) {
            this.matrix[i][to] = "(" + this.matrix[i][to] + ")" + multiple + this.matrix[i][from];
        }
    };
    Matrix.prototype.evaluate = function (input) {
        if (input.match(/\|/)) {
            // this.swapRow()
            var result = this.evaluateSwap(input);
            if (result.direction == "r")
                this.swapRow(result.to, result.from);
            else
                this.swapCol(result.to, result.from);
        }
        else {
            var result = this.evaluateExpression(input);
            if (result.direction == "r")
                this.evalRow(result.to, result.from, result.operations);
            else
                this.evalCol(result.to, result.from, result.operations);
        }
    };
    Matrix.prototype.evaluateSwap = function (input) {
        var args = input.split(/\|/);
        return {
            to: parseInt(args[0].replace(/r|k/, "")),
            from: parseInt(args[1].replace(/r|k/, "")),
            operation: "swap",
            direction: args[0][0]
        };
    };
    Matrix.prototype.evaluateExpression = function (input) {
        var args = math.simplify(input + "").toString().split(" ");
        var operands = [];
        var result = {
            to: 0,
            from: 0,
            direction: "",
            operation: "expression",
            operations: ""
        };
        args.forEach(function (arg) {
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
    };
    Matrix.prototype.multiplyRow = function (to, multiple) {
        to--;
        for (var i = 0; i < this.size()[0]; i++) {
            this.matrix[to][i] += "*" + multiple;
        }
    };
    Matrix.prototype.multiplyCol = function (to, multiple) {
        to--;
        for (var i = 0; i < this.size()[1]; i++) {
            this.matrix[i][to] += "*" + multiple;
        }
    };
    Matrix.prototype.swapRow = function (to, from) {
        to--;
        from--;
        var tmp = this.matrix[to];
        this.matrix[to] = this.matrix[from];
        this.matrix[from] = tmp;
    };
    Matrix.prototype.swapCol = function (to, from) {
        to--;
        from--;
        var tmp = new Array(this.size()[1]);
        for (var i = 0; i < this.size()[1]; i++) {
            tmp[i] = this.matrix[i][to];
            this.matrix[i][to] = this.matrix[i][from];
            this.matrix[i][from] = tmp[i];
        }
    };
    Matrix.prototype.print = function () {
        // this.simplify()
        console.table(this.matrix);
    };
    return Matrix;
}());
exports["default"] = Matrix;
