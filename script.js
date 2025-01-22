// We can write our JavaScript code into multiple files
// We need to put each file via the script tag into the html file
// The order is important since behind the scenes all this files will
// be merged into one file from top to bottom

// We can use the add function since it is defined the calc.js file
// and calc.js is used before this script.js
console.log(add(3, 4));

// The same way we reference files from our local server we can reference
// the from a remote server

const imgBoxEl = document.querySelector('.img-box');

async function loadRandomDogImage() {
  // We can use axios since we put the script the of axios before our script tag
  // and all these scripts will be merged into one from top to bottom
  const result = await axios.get('https://dog.ceo/api/breeds/image/random');

  const imageUrl = result.data.message;

  const imgEl = document.createElement('img');
  imgEl.setAttribute('src', imageUrl);

  imgBoxEl.appendChild(imgEl);
}

loadRandomDogImage();
