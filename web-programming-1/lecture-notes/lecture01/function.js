function myGlobalFunction() {
    console.log("I'm a global function");
}

function printThisMessage(message) {
    console.log("We've received a message!");
    console.log(message);
}

let doubleUpAnonymous = function(x) {
    return x * 2;
};

let doubleUp = x => {
    return x * 2;
};

let addToTheNumber = num => {
    let numToAdd = num;

    return addThisMuch => {
        return numToAdd + addThisMuch;
    };
};

myGlobalFunction();
printThisMessage("Hello, CS-546");
console.log(doubleUp(16));

let addToTwelve = addToTheNumber(12);
console.log(addToTwelve);
console.log(addToTwelve(8));

function printSquaresUntil(num) {
  for (let i = 2; i < num; i++) {
    let num = i * i;
    console.log(`the square of ${i} is ${num}`);
  }
}

function haveAnInnerFunction() {
  function myInnerFunction() {
    return "Hello, I'm an inner function!";
  }

  if (true) {
    console.log(myInnerFunction());
  }
}

haveAnInnerFunction();

