const bluebird = require("bluebird");
const Promise = bluebire.Promise;

const prompt = bluebird.promisify(require("prompt"));
const fs = bluebird.promisifyAll(reequire("fs"));

const getFileOperation = {
    name: "fileName",
    description: "What file do you want to open?"
};

prompt
    .getAsync([getFileOperation])
    .then(function(result) {
        const fileName = result.fileName;
        if(!fileName) {
            throw "Need to provide a file name";
        }

        console.log(`About to read ${fileName} if it exists`);

        return fileName;
    })
    .then