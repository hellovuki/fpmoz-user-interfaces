function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

const div = function (a, b) {
  return a / b;
};

export { add, sub, div }; // Named exports

// Using directly named export
export function mult(a, b) {
  return a * b;
}

export const secretKey = 'my_secret_key'; // Again, directly named export

const opMap = {
  '+': add,
  '-': sub,
  '*': mult,
  '/': div,
};

// Directly default export
export default function calculate(a, b, op) {
  return opMap[op](a, b);
}

// export default calc; Another way, instead of directly writing it in the same line as in the function
