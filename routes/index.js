var express = require('express');
var router = express.Router();
var manage_search = require('../search/manage_search');
var Promise = require('promise');

// router.use(function(req, res, next) {
//   console.log("inside index router");
//   next();
// });

router.get('/', function(req, res, next) {
  res.json({status: "ok"});
});

router.post('/', function(req, res, next) {
  if(req.body && req.body.query && req.body.sort && !isNaN(req.body.sort)){
    //check search length
    if(req.body.query.length <=3 || req.body.query.length >= 40){
      return next(new Error('SearchLength'))
    }
    var data = {sort_1:req.body.sort, query:req.body.query};
    manage_search.initiate(data)
        .then(function (result){
          //console.log("promise yoke", result);
          return res.json({data: result});
        }, function (err) {
          console.log(err);
            res.status(503);
            return res.json({error: "getting torrents failed"});
        }
    );


  }
  else{
    return next(new Error('SearchParameters'))
  }
});


module.exports = router;
