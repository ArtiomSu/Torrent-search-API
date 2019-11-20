//var q = require('q');
var Promise = require('promise');
var one337 = require('./one337');

var initiate = function (data) {
    //console.log("wtf?", data);
    const query = encodeURIComponent(data.query);
    console.log(query);
    var data = {sort: data.sort_1, query:query};
    return new Promise(function (resolve, reject) {
        one337(data)
            .then(function (result){
                //console.log("one337 result\n", result);
                //console.log("one337 result ok\n");
                resolve(result);
            }, function (err) {
                console.log(err);
                reject(0);
            }
        );
    });

};

var get_magnet = function (id) {

};

// var initiate_promise = q.denodeify(initiate);
// var get_magnet_promise = q.denodeify(get_magnet);

var manage_search = {
    get_magnet: get_magnet,
    initiate: initiate
};

module.exports = manage_search;