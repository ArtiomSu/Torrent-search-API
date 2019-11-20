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

            case "GetTorrentsFailed":
                console.log("error: getting torrents failed");
                res.status(503);
                return res.json({error: "getting torrents failed"});
                break;

            case "MagnetParameters":
                console.log("error: invalid url parameters");
                res.status(418);
                return res.json({error: "invalid url parameters"});
                break;

            case "MagnetFailed":
                console.log("error: magnet link failed for " + err.url);
                res.status(503);
                return res.json({error: "failed to get magnet link"});
                break;

            case "MagnetUnsupportedUrl":
                console.log("error: magnet link unsupported for " + err.url);
                res.status(418);
                return res.json({error: "magnet link unsupported"});
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