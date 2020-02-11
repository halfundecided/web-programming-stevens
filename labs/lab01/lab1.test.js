/* I pledge my honor that I have abided by the Stevens Honor System - Mijeong Ban */

const lab1 = require("./lab1");

console.log(lab1.questionOne([1, 2, 3]));
// should output 14
console.log(lab1.questionOne([2, 5, 8]));
// should output 93
console.log(lab1.questionOne([0, 2, 0]));
// should output 4
console.log(lab1.questionOne([12, 24, 36, 12]));
// should output 2160
console.log(lab1.questionOne([7, 3, 2, 1, 4, 8, 6]));
//should output 179

console.log(lab1.questionTwo(7));
// should output 13
console.log(lab1.questionTwo(-1));
// should output 0
console.log(lab1.questionTwo(0));
// should output 0
console.log(lab1.questionTwo(10));
// should output 55
console.log(lab1.questionTwo(11));
// should output 89

console.log(lab1.questionThree("Mr. and Mrs. Dursley, of number four, Privet Drive, were  proud  to  say  that  they  were  perfectly  normal,  thank you  very  much. They  were  the  last  people  youd  expect  to  be  involved in anything strange or mysterious, because they just didn't hold with such nonsense. \n Mr. Dursley was the director of a firm called Grunnings, which  made  drills.  He  was  a  big,  beefy  man  with  hardly  any  neck,  although he did have a very large mustache. Mrs. Dursley was thin and blonde and had nearly twice the usual amount of neck, which came in very useful as she spent so much of her time craning over garden fences, spying on the neighbors. The Dursleys had a small son  called  Dudley  and  in  their  opinion  there  was no finer boy anywhere."));
// should output 196
console.log(lab1.questionThree("Hello, Mijeong!"));
// should output 5
console.log(lab1.questionThree("Mike Dineen and Nate Burgdorfer are my friendo"));
// should output 16
console.log(lab1.questionThree("I can't think of more sentences"));
// should output 9
console.log(lab1.questionThree("o1234567891o1112131415161718192o"));
// should output 3

console.log(lab1.questionFour(10));
// should output 3628800 
console.log(lab1.questionFour(0));
// should output 1
console.log(lab1.questionFour(5));
// should output 120
console.log(lab1.questionFour(1));
// should output 1
console.log(lab1.questionFour(4));
// should output 24