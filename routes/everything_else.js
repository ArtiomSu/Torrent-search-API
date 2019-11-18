var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    console.log("404");
    res.status(404);
    res.json({error: "not found"});
});

module.exports = router;