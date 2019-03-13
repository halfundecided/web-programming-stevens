const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    const education = [
        {
            "schoolName": "인주 Middle School",
            "degree": "Middle School Diploma",
            "favoriteClass": "Science",
            "favoriteMemory": "My favorite memory in middle school... I don't really remember I was too young."
        },
        {
            "schoolName": "학익 High School",
            "degree": "High School Diploma",
            "favoriteClass": "Calculus I&II",
            "favoriteMemory": "My favorite memory in high school would be when I flew out to Tennessee to participate in D.I. Finals for my science club."
        },
        {
            "schoolName": "Stevens Institute of Technology",
            "degree": "Working on B.S. degree",
            "favoriteClass": "My favorite class so far would be CS 546, Web Programming I because I really like web programming, and I enjoy doing the labs.",
            "favoriteMemory": "A memorable memory from my time at Stevens so far would be hanging out with friends."
        }
    ];
    res.json(education);
});

module.exports = router;