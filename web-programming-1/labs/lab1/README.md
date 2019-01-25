# CS546 Web Programmin1: Lab1
## An Intro to Node

- [x] For this lab, you will be creating and running several functions to practice JavaScript syntax.
- [ ] For this lab, you will make two files: lab1.js and lab1.test.js and submit them in a zip file that's named LastName_FirstName.zip. For example: Hill_Patrick.zip
- [x] You should not have any folders inside the zip file.
- [ ] You must submit your files with the format specified, named as specified.
- [ ] You need to make five different test cases for each function. 

### `lab1.js`
- [ ] In this file, you will update the content of the functions and update the `firstName`, `lastName`, and `studentId` with the appropriate information. The function specifications are listed in the section below. 
- [x] `questionOne`
- [x] `questionTwo`
- [x] `questionThree`
- [x] `questionFour`

```js
const questionOne = function questionOne(arr) {
    // Implement question 1 here
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
}

module.exports = {
    firstName: "YOUR FIRST NAME", 
    lastName: "YOUR LAST NAME", 
    studentId: "YOUR STUDENT ID",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
```

### `lab1.test.js`
```js
const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3])); 
// should output 14

console.log(lab1.questionTwo(7)); 
// should output 13 

console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere.")); 
// should output 196

console.log(lab1.questionFour(10)); 
// should output 3628800 
```

## Functions to implement
### `questionOne(arr)`
For your first function, you will calculate the sum of the squares of all numbers in the arrayn numbers and return that result. That means that in `lab1.test.js`, running `lab1.questionOne([5, 3, 10])` would return `134`.

- [ ] To test this function, you will log the result of 5 calls to `lab1.questionOne([x, y, z])` with different inputs, like so:
```js
console.log(lab1.questionOne([5, 3, 10])); 
// 134
console.log(lab1.questionOne([2, 1, 2])); 
// 9
console.log(lab1.questionOne([5, 10, 9])); 
// 206
```

### `questionTwo(num)`
This function should calculate the Fibonacci that corresponds to the `num` given.

The Fibonacci value of a number is the sum of the previous two Fibonacci values; the Fibonacci of any number less than 1 is 0; the Fibonacci Value of 1 is 1; the Fibonacci value of all other numbers is the sum of the previous two Fibonacci numbers.

### `questionThree(text)`
This function will return the number of vowels contained in the value `text`. For the purposes of this exercise, we are not counting y as a `vowel`.

### `questionFour(num)`
This function will return the factorial of the number `num` provided.

The factorial of a number is a simple formula:

`factorial(n) = n * (n - 1) * (n - 2) ... * 1`

The factorial of 0 is 1. If `num` is less than 0, then return `NaN`.

## Requirements
- [ ] You will have to write each function
- [ ] You must submit all files, zipped up, not contained in any folders
- [ ] You must not use any npm dependenices in this lab
