const dictionary = require("./dictionary.js");

try {
    console.log(dictionary.lookupDefinition("charisma"))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("sleuth"))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("foray"))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("adjudicate"))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.lookupDefinition("nate"))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.getWord("The action or process of writing computer programs."))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.getWord("To act as a detective : search for information"))
}catch(error) {
    console.log(error)
}

try {
    console.log(dictionary.getWord("Mike is funny"))
}catch(error) {
    console.log(error)
}
