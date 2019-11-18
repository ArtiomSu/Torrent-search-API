// var express = require('express');
// var router = express.Router();

var router = function (err, req, res, next) {
    if(err) {
        switch (err.message) {
            case "SearchParameters":
                console.log("error: invalid post body");
                res.status(418);
                return res.json({error: "invalid post body"});
                break;

            case "SearchLength":
                console.log("error: invalid query length");
                res.status(418);
                return res.json({error: "invalid query length"});
                break;

            default:
                console.log("unknown error", err);
                res.status(500);
                return res.json({error: "unknown"});
        }
    }else{
        // not found
        res.status(404);
        return res.json({error: "cannot find what you are looking for"});
    }
};

module.exports = router;