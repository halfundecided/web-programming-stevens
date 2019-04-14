const add = (num1, num2) => {
  if (typeof num1 !== "number" || typeof num2 !== "number")
    throw `Must provide a number`;
  if (isNaN(num1) || isNaN(num2)) throw `Must provide a number`;

  return num1 + num2;
};
const subtract = (num1, num2) => {
  if (typeof num1 !== "number" || typeof num2 !== "number")
    throw `Must provide a number`;
  if (isNaN(num1) || isNaN(num2)) throw `Must provide a number`;

  return num1 - num2;
};
const multiply = (num1, num2) => {
  if (typeof num1 !== "number" || typeof num2 !== "number")
    throw `Must provide a number`;
  if (isNaN(num1) || isNaN(num2)) throw `Must provide a number`;

  return num1 * num2;
};
const divide = (num1, num2) => {
  if (typeof num1 !== "number" || typeof num2 !== "number")
    throw `Must provide a number`;
  if (isNaN(num1) || isNaN(num2)) throw `Must provide a number`;

  return num1 / num2;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
