// The DOM (Document Object Model) is data structure representing the objects of the HTML document.
// So, when we provide HTML to the browser it converts in to the DOM.
// The DOM is the source of truth for the browser.
// After converting the HTML to the DOM, the browser uses the DOM to render the page.
// When we change the DOM, the browser will automatically update the page.
// We can use JavaScript to manipulate the DOM.

// The document object is an object that we get from the WEB APIs which we can use
// to interact with the DOM.
// We can look at the DOM as a tree of JS objects, where each HTML element is converted into a JS object.
// With the document object we can access these objects and change their values
// and attributes and the browser will automatically update the page

const h1El = document.querySelector('h1');
const buttonEL = document.querySelector('.btn'); // Query selector selects like CSS

// We see that query selector is an method on the document object and it returns
// the first object (the objects created from our HTML elements) that matches the selector

buttonEL.addEventListener('click', function () {
  h1El.style.color = 'white';
  h1El.style.backgroundColor = 'orangered';

  h1El.textContent = 'Actuallly, One Piece is the greatest story ever told!';
});

// The addEventListener method is a method on the button element object
// It takes two arguments, the first is the event we want to listen for
// and the second is a function that will be called when the event happens
// so the second argument is a callback function
// and the addEventListener is a higher order function
