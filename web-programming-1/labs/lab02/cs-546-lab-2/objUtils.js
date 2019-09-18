/**
 * Take the properties from earlier object in the array args, and compose a new object with the combined
 * property from all the entries WITHOUT overwriting properties from erlier entries
 * @param  {...any} args
 */
function extend(...args) {
  // Check if arguments are undefined
  if (typeof args === "undefined") {
    throw "provided variable is undefined";
  }
  // Check the number of arguments
  if (args.length < 2) {
    throw "the number of arguments should be at least two";
  }

  for (let object in args) {
    if (
      typeof args[object] === "undefined" ||
      typeof args[object] !== "object" ||
      args[object].constructor === Array
    ) {
      throw "provided variables are not objects";
    }
  }

  return args.reduce((curr, next) => {
    for (let prop in next) {
      if (next.hasOwnProperty(prop) && !curr.hasOwnProperty(prop)) {
        curr[prop] = next[prop];
      }
    }
    return curr;
  });
}

extend({ x: 2, y: 3 }, { a: 70, x: 4, z: 5 }, { x: 0, y: 9, q: 10 });

/**
 * Take the properties from earlier objects in the array args, and compose a new object with
 * the combined property from all the entries WITH overwriting properties from ealier entries.
 * @param  {...any} args
 */
function smush(...args) {
  // Check if arguments are undefined
  if (typeof args === "undefined") {
    throw "provided variable is undefined";
  }
  // Check the number of arguments
  if (args.length < 2) {
    throw "the number of arguments should be at least two";
  }
  for (let object in args) {
    if (
      typeof args[object] === "undefined" ||
      typeof args[object] !== "object" ||
      args[object].constructor === Array
    ) {
      throw "hello";
    }
  }

  const result = Object.assign({}, ...args, ...args);
  return result;
}

/**
 * Given an object and a function, evaluate the function on the values of the object and return a new object.
 * Check:
 *      that the object and function exist
 *      they have proper types
 * @param {object} object
 * @param {function} func
 */
function mapValues(object, func) {
  // Check if the object and function exist
  if (typeof object === "undefined" || typeof func === "undefined") {
    throw "provided arguments are undefined";
  }
  // Check if the object and function have proper types
  if (
    Object.prototype.toString.call(object) != "[object Object]" ||
    typeof func !== "function"
  ) {
    throw "provided arguments don't have proper types";
  }
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      object[key] = func(object[key]);
    }
  }
  return object;
}

module.exports = {
  extend,
  smush,
  mapValues
};
