// Syntax for importing the default export, name can be anything
import calculator from './calc.js';

// Syntax for importing named export
import { add } from './calc.js';

// Syntax from importing named export and changing the name
import { sub as subtract } from './calc.js';

// We can also do everything in one line
// import calculator, { add, sub as subtract } from './calc.js';

console.log(calculator(3, 4, '+'));
console.log(add(2, 3));
console.log(subtract(3, 5));

/*

In JavaScript, modules allow you to organize code into separate files and reuse it across 
different parts of your application. Each module is a standalone piece of code, making 
it easier to maintain and manage your codebase.

*/
