const fs = require("fs");
const prompt = require("prompt");

const getfileOperation = {
    name: "fileName",
    description: "What file do you want to open?"
};

// The first asynchronous operation
prompt.get([getfileOperation], function(err, result) {
    console.log("Prompt has a result");
    if (err) {
        throw err;;
    }

    const fileName = result.fileName;
    if(!fileName) {
        throw "Need to provide a file name";
    }

    console.log(`About to read ${fileName} if it exists`);

    // Read the file
    fs.readFile(fileName, "utf-8", function(fileReadError, date) {
        if(fileReadError) {
            throw fileReadError;
        }

        // Modify 
        const reversedContent = data.split("").reverse().join("");

        // Save 
        const reversedName = `reversed_${fileName}`;
        fs.writeFile(reversedName, reversedContent, function(writeError) {
            if(writeError) {
                throw writeError;
            }

            console.log("Finished!");
        });
    });
});

console.log("After prompt is run");