# CS546 Web Programmin1: Lab2
The purpose of this lab is to familiarize yourself with Node.js modules and further your understanding of JavaScript syntax. 
- [ ] You must have error checking for the arguments of all your functions. If an argument fails error checking, you should throw a string describing which argument was wrong, and what went wrong.

## Initializing a Node.js Package
For all of the labs going forward, you will be creating Node.js packages, which have a `package.json`. To create a package, simply create a new folder and within that folder, run the command `npm init`. 
- [ ] When it asks for a package name, name it *cs-546-lab-2*.   
- [ ] The entry file will be `index.js`.
- [ ] For the author field, you must specify your first and last name, along with your CWID.
- [ ] You must also have a start script for your package, which will be invoked with `npm start`. You can set a start script within the `scripts` field of your `package.json`. Here's an example of a valid package.json: 
```json
{
   "name": "cs-546-lab-2",
   "version": "1.0.0",
   "description": "My lab 2 module",
   "main": "index.js",
   "scripts": {
      "start": "node index.js"
   },
   "author": "John Smith 12345678",
   "license": "ISC"
}
```

## arrayUtils.js
This file will export 6 functions, each of which will pertain to arrays. 
- [ ] head(array)
- [ ] last(array)
- [ ] remove(array, index)
- [ ] range(end, value)
- [ ] countElements(array)
- [ ] isEqual(arrayOne, arrayTwo)

### `head(array)`
Returns the first element of an array.  
You must check: 
- [ ] That the array exists
- [ ] The array is of the proper type
- [ ] The array is not empty  
If any of those condition fail, you will throw an error. 
```javascript
head([1, 2, 3]); // Returns: 1
head([])
head("banana"); // throws an error
head(); // throws an error
```

### `last(array)`
Return the last element of an array.
You must check: 
- [ ] That the array exists 
- [ ] The array is of the proper type 
- [ ] The array is not empty  
If any of those conditions fail, you will throw an error.
```javascript
last([1, 2, 3]); // Returns: 3
```

### `remove(array, index)`
Removes the element at the specified index of the array, and returns the new array.  
You must check: 
- [ ] That the array exists
- [ ] The array is of the proper type
- [ ] The array is not empty
- [ ] That the index is within bounds  
If any of those conditions fail, you will throw an error.
```javascript
remove([5, 6, 7], 1); // Returns: [5, 7]
```

### `range(end, value)`
Creates a new numbered array starting at 0 increasing by one up to, but not including the `end` argument. The `value` argument is optional, but when specified each element will be set to that value. 
- [ ] You must check that the end number exists and is of proper type, and is a positive integer greater than 0.  
If any of those conditions fails, the function will throw. 
```javascript
range(4); // Returns: [0, 1, 2, 3]
range(4, 'hi'); // Returns: ["hi", "hi", "hi", "hi"]

```

### `countElements(array)`
Will return an object with the count of each unique element in the array. Order does not matter in a JavaScript object, so your answer may have a different ordering. You must check:
- [ ] That the array exists
- [ ] The array is of the proper type
- [ ] This function allows empty arrays.  
If any of those conditions fails, the function will throw. 
```javascript
countElements([13, '13', 13, 'hello', true, true]);
/* Returns: 
{
  "13": 3,
  "hello": 1,
  true: 2
}
*/
```

### `isEqual(arrayOne, arrayTwo)`
Given two arrays check if they are equal in terms of size and elements and return a boolean. Order of the items in the elements matters when comparing equality. You must check: 
- [ ] That the arrays exist
- [ ] Each array is of the proper type 
- [ ] This function allows empty arrays  
If any of those conditions fails, the function will throw. 
```javascript
isEqual([1, 2, 3], [1, 2, 3]); // Returns: true
isEqual([1, 2, 3], [4, 5, 6]); // Returns: false
isEqual([1, 3, 2], [1, 2, 3]); // Returns: false
isEqual([1, 2], [1, 2, 3]); // Returns: false
```

## stringUtils.js
This file will export 3 functions, each are useful functions when dealing with strings in JavaScript. 
- [ ] capitalize(string)
- [ ] repeat(string, num)
- [ ] countChars(string)

### `capitalize(string)`
Given a string, capitalize the first letter and lowercase the remaining characters. You must check:
- [ ] That the string exist
- [ ] The string is of the proper type  
If any of those conditions fails, the function will throw
```javascript
captitalize('foobar'); // Returns: "Foobar"
captitalize('FOOBAR'); // Returns: "Foobar"
```

### `repeat(string, num)`
Given `string` and `num`, repeat the string `num` amount of times. You must check: 
- [ ] That the string exist
- [ ] The string is of the proper type
- [ ] The number provided exists and is a positive number  
If any of those conditions fails, the function will throw. 
```javascript
repeat('abc', 3); // Returns: "abcabcabc"
repeat('abc', 1); // Returns: "abc" 
repeat('abc', 0); // Returns: ""
```

### `countChars(string)`
Return an object that has the mapping of a character and the amount of times it appears in a string. *Hint*: You may use a function you have written already. You must check: 
- [ ] That the string exist
- [ ] The string is of the proper type  
If any of those conditions fails, the function will throw.
```javascript
countChars('Hello, the pie is in the oven');
/* Returns:
{
  " ": 6,
  ",": 1,
  "H": 1,
  "e": 5,
  "h": 2,
  "i": 3,
  "l": 2,
  "n": 2,
  "o": 2,
  "p": 1,
  "s": 1,
  "t": 2,
  "v": 1
}
*/
```

## objUtils.js
This file will export methods that are useful when dealing with objects in JavaScript. 
- [ ] extend(...args)
- [ ] smush(...args)
- [ ] mapValues(object, func)

### `extend(...args)`
This method will take the properties from earlier objects in the array `args`, and compose a new object with the combined property from all the entries **without** overwriting properties from earlier entries. 
```javascript
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

const firstSecondThird = extend(first, second, third);
// { x: 2, y: 3, a: 70, z: 5, q: 10 }

const secondThird = extend(second, third);
// { a: 70, x: 4, z: 5, y: 9, q: 10 } 

const thirdFirstSecond = extend(third, first, second);
// { x: 0, y: 9, q: 10, a: 70, z: 5 }
```
First, read the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) article on the MDN. When a parameter is spread as such, then all parameters provided to the function are placed in the array, `args`.  
- [ ] You must check that for each entry in `...args`, that it is an object and not undefined; if any are undefined, you must throw an error. 
- [ ] You must also check that there are at least 2 arguments. 

### `smush(...args)`
This method will take the properties from ealier objects in the array `args`, and compose a new object with the combined property from all thee entries **with** overwriting properties from earlier entries. 
```javascript
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

const firstSecondThird = smush(first, second, third);
// { x: 0, y: 9, a: 70, z: 5, q: 10 }

const secondThird = smush(second, third);
// { a: 70, x: 0, z: 5, y: 9, q: 10 }

const thirdFirstSecond = smush(third, first, second);
// { x: 4, y: 3, q: 10, a: 70, z: 5 }
```
- [ ] You must check that for each entry in `...args`, that it is an object and not undefined; if any are undefined, you must throw an error. 
- [ ] You must also check that there are at least 2 arguments.

### `mapValues(object, func)`
Given an object and a function, evaluatee the function on the values of the object and return a new object
- [ ] You must check that the object and function exist and they have proper types. If not, this function must throw. 
```javascript
mapValues({ a: 1, b: 2, c: 3 }, n => n + 1);
/* Returns:
{
  a: 2,
  b: 3,
  c: 4
}
*/
```

## Testing
- [ ] In your `index.js` file, you must import foour functions from any of your modules and create a passing and failing test case for each. 
```javascript
// Head Tests
try {
   // Should Pass
   const headOne = head([2, 3, 4]);
   console.log('head passed successfully');
} catch (e) {
   console.error('head failed test case');
}
try {
   // Should Fail
   const headTwo = head(1234);
   console.error('head did not error');
} catch (e) {
   console.log('head failed successfully');
}
```

## Requirements
- [ ] Write each function in the specified file and export the function so that it may be used in other files.
- [ ] Ensure to properly error check for different cases such as arguments existing and of the proper type as well as throw if anything is out of bounds such as invalid array index or negative numbers for different operations.
- [ ] Import 4 module functions of your choice and write the 8 test cases in `index.js`.
- [ ] Submit all files (including `package.json`) in a zip with your name in the following format: `LastName_FirstName.zip`.
- [ ] You are not allowed to use any npm dependencies for this lab.