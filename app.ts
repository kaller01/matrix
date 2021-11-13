import * as math from 'mathjs'
import Matrix from './Matrix'
import promt from 'prompt'
import { arg, forEach } from 'mathjs';
// const infixToPostfix = require('infix-to-postfix');


let input: String = "1 1 1; 1 1 1; 1 1 1";


const a = new Matrix(input)
a.print();
a.evaluate("r1-3*r2");
a.print()
a.evaluate("r1|r2")
a.print()
a.evaluate("k1+k2")
a.print()
a.simplify()
a.print()

let b = "r1|r2"
console.log(b.matchAll(/[rk]/))