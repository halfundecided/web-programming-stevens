/* I pledge my honor that I have abided by the Stevens Honor System. */
const people = require("./people.js")
const weather = require("./weather.js")
const work = require("./work.js")

const main = async () => {
    /* getPersonById */
    try{
        const get_people_by_id = await people.getPersonById(43);
        console.log(get_people_by_id);
    } catch (e) {
        console.log(e);
    }

    /* IexIndex */
    try {
        const lex_index = await people.lexIndex(2);
        console.log(lex_index);
    } catch (e) {
        console.log(e);
    }

    /* firstNameMetrics */
    try {
        const first_name_metrics = await people.firstNameMetrics();
        console.log(first_name_metrics);
    } catch (e) {
        console.log(e);
    }

    /* shouldTheyGoOutside */
    try {
        const go_outside = await weather.shouldTheyGoOutside("Scotty", "Barajaz");
        console.log(go_outside);
    } catch (e) {
        console.log(e);
    }

    /* whereDoTheyWork */ 
    try { 
        const work_where = await work.whereDoTheyWork("Demetra", "Durrand");
        console.log(work_where);
    } catch (e) {
        console.log(e);
    }

    /* findTheHacker */
    try { 
        const hacker = await work.findTheHacker("79.222.167.180");
        console.log(hacker);
    } catch (e) {
        console.log(e);
    }
}

main()