const advMongo = require('./advMongo');

async function main() {
    const updatedTitle = await advMongo.updateTitle(1, 'Inception');
    console.log(updatedTitle);
    
    console.log('done');
}

main();