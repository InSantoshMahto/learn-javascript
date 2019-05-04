/**
 * @author Santosh Mahto
 * @version 1.0.1
 * @todo Operators practices
 * @see learning and practices Operators
 */
"use strict";

/**
 * unary, binary, operand
 */

 // No effect on numbers
let x = 1;
console.log( +x ); // 1

let y = -2;
console.log( +y ); // -2

// Converts non-numbers
console.log( +true ); // 1
console.log( +"" );   // 0


// exponentiation
console.log( 2 ** 2 ); // 4  (2 * 2)
console.log( 2 ** 3 ); // 8  (2 * 2 * 2)
console.log( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)

let n = 2;

n *= 3 + 5;

console.log( n ); // 16  (right part evaluated first, same as n *= 8)

// Comma



