const arrayUtils = require("./arrayUtils.js");
const stringUtils = require("./stringUtils.js");
const objUtils = require("./objUtils.js");

/* Test Cases for isEqual() function */
try {
    // Should Fail
    const isEqualOne = arrayUtils.isEqual(3, [1,2,3]);
    console.error('isEqual did not error');
} catch(e) {
    console.log('isEqual failed successfully');
}
try {
    // Should Pass
    const isEqualTwo = arrayUtils.isEqual([1,2,3], [1,2,3]);
    console.log('isEqual passed successfully');
} catch(e) {
    console.error('isEqual failed test case')
}

/* Test Cases for capitalize() */
try {
    // Should Fail
    const capitalizeOne = stringUtils.capitalize(2);
    console.error('capitalize did not error');
} catch(e) {
    console.log('capitalize failed successfully');
}
try {
    // Should Pass
    const capitalizeTwo = stringUtils.capitalize('mIJeONg');
    console.log('capitalize passed successfully');
} catch (e) {
    console.error('capitalize failed test case');
}

/* Test Cases for repeat() */
try {
    // Should Fail
    const repeatOne = stringUtils.repeat('hello', 'world');
    console.error('repeat did not error');
} catch(e) {
    console.log('repeat failed successfully');
}
try {
    // Should Pass
    const repeatTwo = stringUtils.repeat('mijeong', 5);
    console.log('repeat passed successfully');
} catch (e) {
    console.error('repeat failed test case');
}

/* Test Cases for extend() */
try {
    // Should Fail
    const extendOne = objUtils.extend([1,2,3], {3: 10, 2: 12, 5: 30});
    console.error('extend did not error');
} catch(e) {
    console.log('extend failed successfully');
}
try { 
    // Should Pass
    const extendTwo = objUtils.extend({ x: 2, y: 3}, { a: 70, x: 4, z: 5 }, { x: 0, y: 9, q: 10 });
    console.log('extend passed successfully');
} catch (e) {
    console.error('extend failed test case');
}
