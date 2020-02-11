/**
 * Returns the first element of an array
 * Check:
 *      that the array exists
 *      the array is of the proper type
 *      the array is not empty
 * @param {arr} array
 */
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

/**
 * Returns the last element of an array
 * Check:
 *      that the array exists
 *      the array is of the proper type
 *      the array is not empty
 * @param {arr} array
 */
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

/**
 * Removes the element at the specified index of the array, and returns the new array
 * Check:
 *      that the array exists
 *      the array is of the proper type
 *      the array is not empty
 *      that the index is within bounds
 * @param {arr} array
 * @param {number} index
 */
function remove(array, index) {
  // Check if the array exists
  if (typeof array === "undefined" || typeof index === "undefined") {
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
  if (index >= array.length || index < 0 || typeof index !== "number") {
    throw `${index} is not within bounds`;
  }
  array.splice(index, 1);
  return array;
}

/**
 * Creates a new numbered array starting at 0 increasing by one up to, but not
 * including the end argument. The value argument is optional, but when specified
 * each element will be set to that value
 * You must check that the end number exists and is of proper type, and is a positive integer greater than 0
 * @param {number} end
 * @param {any} value
 */
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
  if (typeof value === "undefined") {
    for (let i = 0; i < end; i++) {
      arr.push(i);
    }
    return arr;
  } else {
    // If there is a value
    for (let i = 0; i < end; i++) {
      arr.push(value);
    }
    return arr;
  }
}

/**
 * Return an object with the count of each unique element in the array
 * This function allows empty arrays
 * Check:
 *      that the array exists
 *      the array is of the proper type
 * @param {arr} array
 */
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

/**
 * Given two arrays, check if they are equal in terms of size and elements and return a boolean.
 * Order of the items in the elements matters when comparing equality
 * This function allows empty arrays
 * Check:
 *      that the arrays exist
 *      each array is of the proper type
 *
 * @param {arr} arrayOne
 * @param {arr} arrayTwo
 */
function isEqual(arrayOne, arrayTwo) {
  // Check if the arrays exist
  if (arrayOne === undefined || arrayTwo === undefined) {
    throw `One of arrays (or both) is undefined`;
  }
  // Check if the arrays are of the proper type
  if (arrayOne.constructor !== Array || arrayTwo.constructor !== Array) {
    throw `One of arrays (or both) is not an array`;
  }
  if (arrayOne.length != arrayTwo.length) {
    return false;
  } else {
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) return false;
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
  isEqual
};
