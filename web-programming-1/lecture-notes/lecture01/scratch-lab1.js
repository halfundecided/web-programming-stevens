/* Scratch for Lab1 problems */

// Question 1
let array = [1, 2, 3];

let squaredArray = array.map(item => {
    return item * item;
});
console.log(squaredArray);

let result = 0;

for (let i = 0; i < array.length; i++) {
    result += squaredArray[i];
}
console.log(result);

// Question 2
let fibonacci = function(num) {
    if(num < 0) 
        return 0;
    else if (num == 0 || num == 1)
        return num;
    else 
        return fibonacci(num-1) + fibonacci(num-2);
}

console.log(fibonacci(0));
console.log(fibonacci(1));
console.log(fibonacci(2));
console.log(fibonacci(3));
console.log(fibonacci(4));
console.log(fibonacci(5));
console.log(fibonacci(6));

// Question 3
let str = "Hello MIJEONG!";
let strArray = [];

for(let i = 0; i < str.length; i++) {
    strArray[i] = str.charAt([i]);
}
console.log(strArray);

let count = strArray.filter(letter => 'aeiouAEIOU'.includes(letter));

console.log(count);
console.log(count.length);


// Question 4
let factorial = function(num) {
    if(num < 0)
        return NaN;
    if(num == 0)
        return 1;
    return num * factorial(num-1);
}

console.log(factorial(-1));
console.log(factorial(0));
console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));