## In-class Exercise 01

Specs:

1. Create a folder where you will store the files in
2. From the command line run npm init while in the directory you created in step 1.
3. You will create 2 files.  app.js and dictionary.js
4. in dictionary.js, you will create an object using the const keyword.  The key will be a word and the value will be the definition of that word like so:
```javascript
const words ={
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}
```
5. You will create a function in `dictionary.js` called `checkInput` which will take in an input parameter and check to see if it's a string, if it's not a string then you will throw an error.  If it is a string, then the function will just return what was passed into the function. This function will NOT be exported and will be used only internally in `dictionary.js`
6. You will create a function named `lookupDefinition` which take one input parameter.  This function will first call `checkInput` to make sure the input is valid like so: `checkInput(inputVal);`
7. After `checkInput` is called it will either pass (in which it will just return the word that was passed in) or it will fail and then throw the error.
8. You will check to see if that word exists in the object.  Since the key is the word and the value is the definition we can just check if words`[inputVal] != undefined` if `words[inputVal]` is not undefined, then you simply return the definition for that word.  return `words[inputVal]` if it is undefined you will throw an error
9. You will create another function named `getWord` with one string input parameter.  This will actually take in the definition as an input and will return the word for that definition. 
10.  in `getWord` you need to call `checkInput` to make sure it's a valid string like you did in `lookupDefinition`.
11. create a variable (you can name it whatever you like) and set that equal to finding the key for a given value (you can google "How to get the key of an object with its value" or something similar to that) This will look up the key for the given value passed in
12.  You will check that variable to see if it's `undefined`.  Meaning that it does not find a key that has the value passed into the function. If it's `undefined`, you will throw an error, If it is not `undefined`, then it found the key and you will return that. so it will look something like this:
```javascript
function getWord(value){
    checkInput(value);
    let getWord = // you need to look up the code to find a key based on its value
    if (getWord == undefined){
        throw "Word not found"
    }
    return getWord
}
```
13.  You will then export the two functions `lookupDefinitin` and `getWord` using `module.exports`
14. In `app.js` the first line you will create a constant named `dictionary` and set that equal to the require statement 
15. You will now look up some definitions.  We will use a try/catch block to catch the errors if any and we will pass a word to the function like so:
```javascript
try {
    console.log(dic.lookupDefinition("programming"))
}catch (error){
    console.log(error)
}
```
Repeat this block of code a few times passing in different words (words that do exist in your object and try with words that do not exist in the object)
16. Next, do the same thing but instead of calling lookupDefinition you will call getWord and pass in the definition to get the word associated with it like so:
```javascript
try{
    console.log(dic.getWord("The action or process of writing computer programs."))
}catch (error){
    console.log(error)
}
```
Repeat this block of code a few times passing in different definitions (definitions that do exist in your object and try with definitions that do not exist in the object)
Once you are done, bring it up and show me the code running. 