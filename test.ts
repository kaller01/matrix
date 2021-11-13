let input: String = "a 1 1; 1 1 1; 1 1 1";

class Matrix {
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
            this.matrix[i][to] += "+(" + this.matrix[i][from] + "*" + multiple+")";
        }
    }

    addRow(to: number, from: number, multiple: number) {
        to--;
        from--;
        for (let i = 0; i < this.size()[0]; i++) {
            this.matrix[to][i] += "+(" + this.matrix[from][i] + "*" + multiple+")";
        }
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
        this.simplify()
        console.table(this.matrix)
    }
}


const a = new Matrix(input)
a.print();
a.addCol(1,2,1)
a.print();
a.addRow(1,2,1)
a.multiplyRow(2,2);
a.swapRow(1,2);
a.swapCol(1,2)
a.print()
a.multiplyCol(1,2);
a.multiplyCol(1,1/2);
a.print();

console.log(math.simplify("r1-r3").toString().split(" "))