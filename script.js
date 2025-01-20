// JavaScript is single-threaded, meaning that it can only run one task at a time.
// However, sometimes some tasks can take a long time to complete, like fetching data from a server or implementing timers.
// These tasks are handled asynchronously, meaning that they are handled outside of the JavaScript engine.
// The JavaScript engine continues to run the next line of code while the asynchronous task is being completed.
// When the asynchronous task is completed, it is added to the JavaScript engine to be executed
// The basic workflow is that we have the JavaScript engine, the WebAPIs, the callback queue, and the event loop.
// The WebAPIs are responsible for handling asynchronous tasks.
// The idea is that whenever we have an asynchronous task, we provide a callback function that will be executed when the task is completed.
// The callback function is added to the callback queue.
// The event loop is responsible for checking if the call stack is empty and if it is, it will add the callback function to the call stack
// so that it can be executed.

// Example of asynchronous code

console.log('Hello world');
setTimeout(function () {
  console.log('This is a timeout');
}, 5000);
console.log('Hello Vuki');

// First, the console.log('Hello world') is added to the call stack and executed.
// Next, the setTimeout function is added to the call stack and executed.
// This means that the the logic of the timer is added to the WebAPIs and the setTimeout function is removed from the call stack.
// The setTimeout function will wait for 5 seconds before executing the callback function.
// The console.log('Hello Vuki') is added to the call stack and executed.
// After 5 seconds, the callback function is added to the callback queue.
// The event loop checks if the call stack is empty and if it is, it will add the callback function to the call stack.
// Since the call stack is empty, the callback function is added to the call stack and executed
// So the oorder of the output will be:
// Hello world
// Hello Vuki
// This is a timeout

// The same order will be if we change the timeout to 0 because the counting of the time is done by the WebAPIs and not by the JavaScript engine.
// They only difference is that out callback function will be added to the callback queue immediately after the setTimeout function is executed,
// but it will still wait for the call stack to be empty before it is executed. In other words, it will wait
// until the JavaScript engine is done with the synchronous code.
console.log('Hello world');
setTimeout(function () {
  console.log('This is a timeout');
}, 0);
console.log('Hello Vuki');

// **** PROMISES ****

// Promises are objects that represent the eventual completion or failure of an asynchronous operation.
// The flow is the following: we execute an asynchronous operation and we get a promise object.
// The promise object has two methods: then and catch.
// The then method is executed when the promise is resolved and the catch method is executed when the promise is rejected (when an error occurs).

// Example of a promise

const fetchResult = fetch('https://dog.ceo/api/breeds/image/random');

// fetch is a built-in function that makes requests to a server and returns a promise object.
// The promise object is stored in the fetchResult variable.

// The then method accepts a callback function that is executed when the promise is resolved.
// The then method returns always a promise object. If we return a promise object in our callback function, the then method will return that promise object.
// If we don't return anything, the then method will return a promise object that is resolved with undefined.

const jsonResult = fetchResult.then((data) => data.json()); // Since we are using an arrow function with only one line of code, we don't need to use the return keyword.
// The .json() methods is returning a promise and we are returning that promise from the arrow function which means that the then method will return that promise object.

const result = jsonResult.then((data) => {
  console.log(data);
});

// Since the then method returns a promise object, we can chain multiple then methods.

fetch('https://dog.ceo/api/breeds/image/random')
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
  });

// Every promise has also a catch method that is executed when the promise is rejected.
// We usually use the catch method at the end of the chain of then methods.

fetch('https://dog.ceo/api/breeds/image/random')
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    // The catch method accepts a callback function that is executed when one of the promises in the chain is rejected.
    console.log(error);
  });

// An easier way to write the code above is to use the async/await syntax.
// With this syntax, we can write asynchronous code that looks like synchronous code.
// We declare a function with the async keyword and we use the await keyword to wait for the promise to be resolved.

async function fetchData() {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  console.log(data);
}

// Handling errors with async/await is done with the try/catch block.

async function fetchData() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchData();

// Sometimes it hard to graps the concept of fetch since we need to use two then methods to get the data.
// You can investigate this behavior on your own. For now, to make our lives easier, we can use the axios library.
// Take a look at the index.html file to see how to include the axios library in our project.

// Now we can use the axios library to make requests to a server.

axios.get('https://dog.ceo/api/breeds/image/random').then(function (response) {
  console.log(response.data);
});

// axios is an object that other developer made which has a get method that makes a request to a server and returns a promise object.
// Here it is easier to see what the flow is.
// axios.get is mking the request in returns a promise object. When the request is resolved, the then method executes our callback function.
// The callback function is executed with the response object that has a data property that contains the data from the server.

// Async/await syntax with axios

async function fetchDataV2() {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
