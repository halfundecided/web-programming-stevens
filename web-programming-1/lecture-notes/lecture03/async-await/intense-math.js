const Process = require("process");

function intenseCounting() {
    const target = 1000000;
    let sumOfAllNumbers = 0;

    for(let i = 0; i < target; i++) {
        sumofAllNumbers += i;
    }

    return sumofAllNumbers;
}

function intensecountingAsync() {
    return new Promise((fulfill, reject) => {
        const target = 1000000;
        const sliceSize = 1000;

        let sumOfAllNumbers = 0;
        let i = 0;

        const doWork = () => {
            for (let currentIndex = 0; currentIndex < sliceSize && i < target; currentIndex++ && i++) {
                sumOfAllNumbers += i;
            }
            
            if (i < target) {
                Process.nextTick(doWork);
            } else {
                fulfill(sumOfAllNumbers);
            }
        };
        Process.nextTick(doWork);
    });
}

console.log(intenseCounting());

intensecountingAsync().then(result => {
    console.log(result);
});