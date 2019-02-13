/* Compose a new object with the combined property from all the entries without overwriting properties */
function extend(...args){
    // Check if arguments are undefined
    if (typeof args === "undefined") {
        throw "provided variable is undefined";
    }
    // Check if arguments are object 
    if(Object.prototype.toString.call(...args) != '[object Object]'){
        throw "provided variable is not an object";
    }
    // Check the number of arguments
    if(args.length < 2) {
        throw "the number of arguments should be at least two";
    }
    return args.reduce((curr, next) => {
        for(let prop in next) {
            if(next.hasOwnProperty(prop) && !curr.hasOwnProperty(prop)) {
                curr[prop] = next[prop];
            }
        }
        return curr;
    });
}

/* Compose a new object with the combined property from all the entries with overwriting properties */
function smush(...args) {
    // Check if arguments are undefined
    if (typeof args === "undefined") {
        throw "provided variable is undefined";
    }
    // Check if arguments are object 
    if(Object.prototype.toString.call(...args) != '[object Object]'){
        throw "provided variable is not an object";
    }
    // Check the number of arguments
    if(args.length < 2) {
        throw "the number of arguments should be at least two";
    }
    const result = Object.assign({}, ...args, ...args);
    return result;
}

/* Evaluate the function on the values of the object and return a new object */
function mapValues(object, func) {
    // Check if the object and function exist
    if(typeof object === "undefined" || typeof func === "undefined") {
        throw "provided arguments are undefined";
    }
    // Check if the object and function have proper types
    if(Object.prototype.toString.call(object) != '[object Object]' || typeof func !== "function"){
        throw "provided arguments don't have proper types";
    }
    for(let key in object) {
        if(object.hasOwnProperty(key)) {
            object[key] = func(object[key]);
        }
    }
    return object;
}

module.exports = {
    extend,
    smush,
    mapValues,
  }
  