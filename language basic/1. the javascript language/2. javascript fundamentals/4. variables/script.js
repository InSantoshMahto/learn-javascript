/**
 * @author Santosh Mahto
 * @version 1.0.1
 * @todo Variable practices
 * @see learning and practices
 */
'use strict';

let _age = 10;

// practicing block scope
{
    let _age = 20;
    console.log("TCL: _age", _age);
    var name = 'santosh';
    let $mobile = '7788006653';
    const BIRTH_YEAR = 1997;
    console.log("TCL: BIRTH_YEAR", BIRTH_YEAR);
    console.log("TCL: $mobile", $mobile);
    console.log("TCL: name", name);
}
console.log(`My _age is ${_age}`);
console.log("TCL: name", name); // function scope | it`s become global variable
// console.log("TCL: $mobile", mobile); // Error because mobile is declare using let keyword so it`s follow block scope.
// console.log("TCL: BIRTH_YEAR", BIRTH_YEAR); // Error because it has block scope

/**
 * declaring function and calling immediately
 */
(function() {
    var year = 2019;
	console.log("TCL: year", year);
})()
// console.log("TCL: year", year); // Error because year is function scope not a global scope

/**
 * Being a “constant” just means that a variable’s value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are calculated in run-time, during the execution, but do not change after their initial assignment.
 */
const pageLoadTime = 563; // time taken by a webpage to load
