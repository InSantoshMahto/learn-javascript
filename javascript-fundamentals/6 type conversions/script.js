/**
 * @author Santosh Mahto
 * @version 1.0.1
 * @todo Type Conversions practices
 * @see learning and practices Type conversions
 */
"use strict";

// To check type using statement
let age = 21;

console.log(typeof age);

// To check type using function
let name = "santosh Mahto";

console.log(typeof age);

// ToString
let isMale = true;

console.log(typeof isMale); // Boolean

isMale = String(isMale);
console.log(typeof isMale); // String

// ToNumber
let str = "123";

console.log(typeof str); // string

let num = Number(str); // becomes a number 123

console.log(typeof num); // number

let check = Number("an arbitrary string instead of a number");

console.log(check); // NaN, conversion failed

// concatenates
console.log(1 + "1"); // 11

// ToBoolean
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean("")); // false

console.log(Boolean(1)); // true
console.log(Boolean("hello")); // true
console.log(Boolean("0")); // true
console.log(Boolean(" ")); // spaces, also true (any non-empty string is true)

// other
console.log(typeof 1); // Number
console.log(typeof "santosh"); // String
console.log(typeof true); // Boolean
console.log(typeof null); // object
console.log(typeof NaN); // NaN
console.log(typeof undefined); // undefined
console.log(typeof {}); // object
console.log(typeof Symbol("id")); // object
