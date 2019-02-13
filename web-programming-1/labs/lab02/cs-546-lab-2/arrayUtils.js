/* Return the first element of an array */
function head(array) {
  // Check if the array exists
  if (typeof array === "undefined") {
    throw "provided variable is undefined";
  }
  // Check if the array is not empty
  if (array.length == 0) {
    throw `${array} is empty`;
  }
  // Check if the array is of the proper type
  if (array.constructor !== Array) {
    throw `${array || "provided variable"} is not an array`;
  }
  return array[0];
}

/* Return the last element of an array */
function last(array) {
  // Check if the array exists
  if (typeof array === "undefined") {
    throw "provided variable is undefined";
  }
  // Check if the array is not empty
  if (array.length == 0) {
    throw `${array} is empty`;
  }
  // Check if the array is of the proper type
  if (array.constructor !== Array) {
    throw `${array || "provided variable"} is not an array`;
  }
  return array[array.length - 1];
}

/* Removes the element at the specified index of the array, and returns the new array */
function remove(array, index) {
  // Check if the array exists
  if (typeof array === "undefined") {
    throw "provided variable is undefined";
  }
  // Check if the array is not empty
  if (array.length == 0) {
    throw `${array} is empty`;
  }
  // Check if the array is of the proper type
  if (array.constructor !== Array) {
    throw `${array || "provided variable"} is not an array`;
  }
  // Check if the index is within bounds
  if (index >= array.length || index < 0) {
    throw `${index} is not within bounds`;
  }
  array.splice(index, 1);
  return array;
}

/* Creates a new numbered array string at 0 increasing by one up to, but not including the `end` argument */
function range(end, value) {
  // Check if end exists
  if (typeof end === "undefined") {
    throw "provided variable is undefined";
  }
  // Check if end is of proper type and is a positive integer greater than 0
  if (typeof end !== "number" || end < 0) {
    throw "end is not a number or not a positive number";
  }

  let arr = [];
  // If there is no value entered
  if(typeof value === "undefined") {
    for(let i = 0; i < end; i++) {
      arr.push(i);
    }
    return arr;
  } else { // If there is a value
    for(let i = 0; i < end; i++) {
      arr.push(value);
    }
    return arr;
  }
}

/* Return on object with the count of each unique element in the array */
function countElements(array) {
  const countElementHelp = (arr, acc, i) => {
    // Check if the array exists
    if (typeof arr === "undefined") {
      throw "provided variable is undefined";
    }
    // Check if the array is of the proper type
    if (arr.constructor !== Array) {
      throw "provided variable is not an array";
    }
    if (i === arr.length) {
      return acc;
    }
    if (acc[arr[i]]) {
      acc[arr[i]] += 1;
    } else {
      acc[arr[i]] = 1;
    }
    return countElementHelp(arr, acc, i + 1);
  };
  return countElementHelp(array, {}, 0);
}

/* Given two arrays chech if they are equal in terms of size and elements and return a boolean */
function isEqual(arrayOne, arrayTwo) {
  // Check if the arrays exist
  if (arrayOne === undefined || arrayTwo === undefined) {
    throw `One of arrays (or both) is undefined`;
  }
  // Check if the arrays are of the proper type
  if (arrayOne.constructor !== Array || arrayTwo.constructor !== Array) {
    throw `One of arrays (or both) is not an array`;
  }
  if(arrayOne.length != arrayTwo.length) {
      return false;
  } else {
      for(let i = 0; i < arrayOne.length ; i++) {
          if(arrayOne[i] !== arrayTwo[i])
            return false;
      }
      return true;
  }
}

module.exports = {
  head,
  last,
  remove,
  range,
  countElements,
  isEqual,
}
