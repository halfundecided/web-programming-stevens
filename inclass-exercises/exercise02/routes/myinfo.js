const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    const myInfo = {
	name     : 'Mijeong Ban',
	dob      : '7/12',
	hometown : 'Incheon'
    };
    res.json(myInfo);
});

module.exports = router;