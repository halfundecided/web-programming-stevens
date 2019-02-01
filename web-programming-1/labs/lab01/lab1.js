/* I pledge my honor that I have abided by the Stevens Honor System - Mijeong Ban */

const questionOne = function questionOne(arr) {
    let result = 0;

    let squaredArray = arr.map(item => {
        return item * item;
    });

    for (let i = 0; i < arr.length; i++) {
        result += squaredArray[i];
    }

    return result;
}

const questionTwo = function questionTwo(num) {
    if(num < 0)
        return 0;
    else if (num == 0 || num == 1) 
        return num;
    else 
        return questionTwo(num-1) + questionTwo(num-2);
}

const questionThree = function questionThree(text) {
    let strArray = [];

    for(let i = 0; i < text.length; i++) {
        strArray[i] = text.charAt([i]);
    }
    
    let count = strArray.filter(letter => 'aeiouAEIOU'.includes(letter)).length;

    return count;
}

const questionFour = function questionFour(num) {
    if(num < 0)
        return NaN;
    if(num == 0)
        return 1;
    return num * questionFour(num-1);
}

module.exports = {
    firstName: "Mijeong",
    lastName: "Ban",
    studentId: "10431782",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};
