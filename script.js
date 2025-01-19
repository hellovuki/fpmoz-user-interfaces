let age = 26; // we use let for variables that can be reassigned
age = 27; // we can reassign the value of the variable

const birthYear = 1998; // we use const for variables that cannot be reassigned
// birthYear = 1999; // this will throw an error

// Data types: We have primitive and reference (object) data types

// Primitive data types: Number, String, Boolean, Undefined, Null, Symbol, BigInt

// Reference data types: Everything that is not a primitive data type

const num = 20; // Number
const name = "John"; // String
const isMarried = false; // Boolean can be true or false
let job; // Undefined, a variable that has not been assigned a value
const car = null; // Null, a variable that has been explicitly assigned the value null

// Operators are special symbols that perform operations on operands (values)
// Mathematical operators: +, -, *, /, %
// Comparison operators: >, <, >=, <=, ===, !==
// Logical operators: &&, ||, !

// CONDITIONAL STATEMENTS
if (isMarried) {
  // If accepts a condition that is either true or false
  console.log("You are married");
} else {
  console.log("You are not married ");
}

// If we write a value in if that is not a boolean, JavaScript will convert it to a boolean
// based on the truthy and falsy values
// falys values: 0, '', undefined, null, NaN
// truthy values: everything else

if (1) {
  // 1 is a truthy value so it will be converted to true
  console.log("1 is truthy");
}

// the operator && is the logical AND operator and it returns the first falsy value
// If there is no falsy value, it returns the last value

// the operator || is the logical OR operator and it returns the first truthy value
// and if there is no truthy value, it returns the last value

// the operator ! is the logical NOT operator and it negates the value
// based on the truthy and falsy values
// so !'Mateo' is false, because 'Mateo' is a truthy value

// **** FUNCTIONS ****

// Function declaration
function greet() {
  console.log("Hello");
}

greet(); // calling the function

// Function expression
const greetV2 = function () {
  console.log("Hello");
};

greetV2(); // calling the function

// Arrow function
const greetV3 = () => {
  console.log("Hello");
};

greetV3(); // calling the function

// Function with parameters
function greetV4(name) {
  console.log(`Hello ${name}`);
}

greetV4("John"); // calling the function with an argument

// Parameters are the variables that we define in the function definition
// Arguments are the values that we pass to the function when we call it

// Returning a value from a function

function add(a, b) {
  return a + b; // we use the return keyword to return a value from a function
}

const sum = add(2, 3); // the function is called and when the return happens
// the place where the function is called becomes the value that is returned
// and we stored it in the variable sum

console.log(sum);

// The return value means the stop of a function, so if we have a return statement
// in a function, the code that comes after the return statement will not be executed

function addV2(a, b) {
  return a + b;
  console.log(a + b); // this will never be executed since the return statement is before it
}

// If an error function has only of parameter, we can omit the parentheses
const double = (num) => {
  return num * 2;
}; // this is the same as const double = num => { return num * 2; }

// If an error function has only a single line of code, we can omit the curly braces
// and the return keyword
const doubleV2 = (num) => num * 2; // this is the same as const double = num => { return num * 2; }

// There are a few diffences between these 3 types of functions, but for now we will
// use them interchangeably. Investiage the differences when you feel comfortable with
// the basics of JavaScript

// Functions are first-class citizens in JavaScript, which means that we can pass
// functions as arguments to other functions and we can return functions from other functions
// It also means that functions are just values like the value 5, or the value 'Hello'.
// The data type of a function is object

// Functions accepting other functions as arguments are called higher-order functions
// and the functions that are passed as arguments are called callback functions

// Example of a higher-order function
const repeat = (fn, n) => {
  for (let i = 0; i < n; i++) {
    fn();
  }
};

repeat(greet, 3); // we pass the greet function as an argument to the repeat function
// The greet function is a callback function and the repeat function is a higher-order function
// Be aware that with callback functions we don't call them, we pass them as arguments to other functions
// And the outer function calls the callback function in its body

// Function returning a function
const greetWithPrefix = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetWithHello = greetWithPrefix("Hello");
greetWithHello("John");
const greetWithHi = greetWithPrefix("Hi");
greetWithHi("Jane");

// **** OBJECTS ****

const person = {
  name: "John",
  age: 26,
};

// Objects are collections of key-value pairs
// The key is a string and the value can be any data type

// We can access the values of an object using the dot notation
console.log(person.name); // John
// or using the bracket notation
console.log(person["name"]); // John

// We use the bracket notation when we want to access a property dynamically
const propertyName = prompt("Enter the property you want to access");
console.log(person[propertyName]); // 26

// We can add new properties to an object
person.job = "Developer";

// If we access a property that does not exist, we get undefined

// When a property is a function, we call it a method
const personV2 = {
  name: "John",
  birthYear: 1998,
  calcAge: function () {
    // this is a special variable that gets the value when a function is called
    // in a method, this refers to the object that is calling the method
    return 2025 - this.birthYear;
  },
};

// In this method/function call the variable this will be the personV2 object
personV2.calcAge();

// Now we see that console.log() is a method of the console object

// **** ARRAYS ****

// Arrays are collections of values that can be of any data type
// and they are ordered

const names = ["John", "Jane", "Jack"];
const ages = [26, 27, 28];
const mixed = ["John", 26, true];
const arrayOfObjects = [
  { name: "John", age: 26 },
  { name: "Jane", age: 27 },
];

// Arrays are also objects, so they have properties and methods

console.log(names.length); // 3
arrayOfObjects.push({ name: "Jack", age: 28 }); // adds an element to the end of the array
arrayOfObjects.pop(); // removes the last element of the array

// Accessing elements of an array is done via the index
// The index is a number that starts from 0
console.log(names[0]); // John
console.log(names[1]); // Jane

// **** LOOPS ****

// Loops are used to repeat a block of code multiple times

// Types of loops: for, while, do-while, for-of, for-in

// We used while when we don't know how many times we want to repeat the code
// and we use for when we know how many times we want to repeat the code

const getRandomDiceNumber = () => Math.trunc(Math.random() * 6) + 1; // generates a random number between 1 and 6

let randomDiceNumber = getRandomDiceNumber();
let attempts = 1;
while (randomDiceNumber !== 6) {
  attempts++;
  randomDiceNumber = getRandomDiceNumber();
}

console.log(`It took ${attempts} attempts to get a 6`);

// We used while beacuse we don't know how many times we need to roll the dice to get a 6

// The for loop is used when we know how many times we want to repeat the code

for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// Looping through an array

for (let i = 0; i < names.length; i++) {
  console.log(names[i]);
}

// Investigate break and continue statements on your own

// Referecence(object values) vs value(primitive values)

let x = 10;
let y = x;
y = 20;
console.log(x); // 10
console.log(y); // 20

const companyInfo = {
  name: "Company",
  founded: 1998,
};

// Now they are both referencing the same value in heap memory
// Every object behaves like this, so be careful when you are working with objects
// since arrays are objects, they also behave like this
const companyInfoV2 = companyInfo;

companyInfoV2.name = "Company V2";

console.log(companyInfo.name); // Company V2
console.log(companyInfoV2.name); // Company V2
