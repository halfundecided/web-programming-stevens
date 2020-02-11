const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    const story = {
        "storyTitle": "The Adventures of Lone Wolf Scientific",
        "story": "Whoever heard of a smart bomb with a language parser? he heard him grumble.  Austin watched his wild-haire officemate, his bull-like features creased into a scowl, hunched over stacks and stacks of thesauruses, whipping their pages, cursing bitterly. Only a nudnik programmer would think of making a bomb verbally context-sensitive, he growled.\n Earlier in the evening, the computer builder had come to him, his condescending eyes moist with humility, his normally Napoleanic upper lip quivering helplessly, and begged the hollow-eyed wizard to recode Andrew.BAS's guided missile software.  Specifically, he wanted him to recode it so that the computer would not screech alarms and its screen flash bright red whenever he keyed in at its screen prompt"
    }
    res.json(story);
});

module.exports = router;