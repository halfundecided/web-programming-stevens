/* I pledge my honor that I have abided by the Stevens Honor System - Mijeong Ban */

/**
 * Calculate the sum of the squares  of all numbers in the array numbers and return that result.
 */
const questionOne = function questionOne(arr) {
  let result = 0;

  /* Used map function to square each element of the array */
  let squaredArray = arr.map(item => {
    return item * item;
  });

  /* sum of all element of the array */
  for (let i = 0; i < arr.length; i++) {
    result += squaredArray[i];
  }

  return result;
};

/**
 * Calculate the Fibonacci that corresponds to the num given.
 */
const questionTwo = function questionTwo(num) {
  if (num < 0) return 0;
  else if (num == 0 || num == 1) return num;
  else return questionTwo(num - 1) + questionTwo(num - 2);
};

/**
 * Return the number of vowels contained in the value text
 */
const questionThree = function questionThree(text) {
  let strArray = [];

  /* each character into array */

  for (let i = 0; i < text.length; i++) {
    strArray[i] = text.charAt([i]);
  }

  let count = strArray.filter(letter => "aeiouAEIOU".includes(letter)).length;

  return count;
};

/**
 * Return the factorial of the number num provided
 */
const questionFour = function questionFour(num) {
  if (num < 0) return NaN;
  if (num == 0) return 1;
  return num * questionFour(num - 1);
};

module.exports = {
  firstName: "Mijeong",
  lastName: "Ban",
  studentId: "10431782",
  questionOne,
  questionTwo,
  questionThree,
  questionFour
};
