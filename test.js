var input = "a 1 1; 1 1 1; 1 1 1";
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
    Matrix.prototype.addRow = function (to, from, multiple) {
        to--;
        from--;
        for (var i = 0; i < this.size()[0]; i++) {
            this.matrix[to][i] += "+(" + this.matrix[from][i] + "*" + multiple + ")";
        }
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
        this.simplify();
        console.table(this.matrix);
    };
    return Matrix;
}());
var a = new Matrix(input);
a.print();
a.addCol(1, 2, 1);
a.print();
a.addRow(1, 2, 1);
a.multiplyRow(2, 2);
a.swapRow(1, 2);
a.swapCol(1, 2);
a.print();
a.multiplyCol(1, 2);
a.multiplyCol(1, 1 / 2);
a.print();
console.log(math.simplify("r1-r3").toString().split(" "));
