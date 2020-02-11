const words = {
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially",
}

function checkInput(input) {
    if (typeof input !== "string") {
        throw `${input} is not a string`;
    }
    return input;
} 

function lookupDefinition(inputVal) {
    checkInput(inputVal);

    // tast 7
    if(words[inputVal] == undefined) {
        throw `${inputVal} is undefined`;
    }
    return words[inputVal];
}

function getWord(strInput) {
    checkInput(strInput);

    let getWord = Object.keys(words).find(key => words[key] === strInput);

    if(getWord == undefined) {
        throw "Word not found";
    }
    return getWord;
}

module.exports = {
    lookupDefinition, 
    getWord
}
