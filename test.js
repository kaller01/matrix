"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matrix_1 = require("./Matrix");
// console.log(("r1*3r2".match(/[kr]\d/g).length));
let a = new Matrix_1.default(0, 0);
a.setup("1 1 1; 1 1 1; 1 1 1");
a.print();
a.evaluate("r1*3*a");
// console.log(a.evaluateExpression("r1*3a"));
// console.log(a.evaluateMult("r1*(a5/2)"))
a.print();
a.simplify();
a.print();
//# sourceMappingURL=test.js.map