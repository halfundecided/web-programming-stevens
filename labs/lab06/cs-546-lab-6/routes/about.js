const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    const about = {
        "name": "Mijeong Ban",
        "cwid": "10431782",
        "biography": "My name is Mijeong Ban. I'm a third year computer science major at Stevens Institute of Technology. My birthday is on July 12th. I am from Korea, and I live in New Jersey.\n A fun fact is that I am 25 years old here, but I am considered 27 years old in Korea.",
        "favoriteShows": ["Kim's Convenience", "Gossip Girl", "Unbreakable", "New Girl", "Friends"],
        "hobbies": ["Piano", "Watching Movies", "Yoga", "Reading", "Drinking Soju"]
    };
    res.json(about);
});

module.exports = router;