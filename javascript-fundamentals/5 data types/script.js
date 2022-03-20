/**
 * @author Santosh Mahto
 * @version 1.0.1
 * @todo data types practices
 * @see learning and practices data types
 */
'use strict';

/**
 * List of data types
 * @see Primitive Data Types
 *      Number
 *      String
 *      Boolean
 *      null
 *      undefined
 *      object
 *      symbol : for unique identifier
 * @see also remember
 *      NaN
 *      Infinity
 */


// Infinity

// alert(  1 / 0 );
// alert( Infinity );


// NaN
// alert( "not a number" / 2 ); // NaN, such division is erroneous


// null
let age = null;

// alert(age)


// Boolean
let isGreater = 4 > 1;

// alert( isGreater ); // true (the comparison result is "yes")


// undefined
/**
 * The meaning of undefined is “value is not assigned”.If a variable is declared, but not assigned, then its value is undefined:
 */
let x;

// alert(x); // shows "undefined"

x = 123;
x = undefined;

// alert(x); // "undefined"


// String
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;

// alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)
// alert( `the result is ${1 + 2}` ); // the result is 3

/**
 * The typeof operator allows us to see which type is stored in a variable.

Two forms: typeof x or typeof(x).
Returns a string with the name of the type, like "string".
For null returns "object" – this is an error in the language, it’s not actually an object.
 */
