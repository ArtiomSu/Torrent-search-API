//var q = require('q');
var Promise = require('promise');
var one337 = require('./one337');

var initiate = function (data) {
    //console.log("wtf?", data);
    const query = encodeURIComponent(data.query);
    //console.log(query);
    var data = {sort: data.sort_1, query:query};
    return new Promise(function (resolve, reject) {
        one337.search(data)
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

var get_magnet = function (url) {
    return new Promise(function (resolve, reject) {
        if(url.startsWith("https://1337x.to/torrent/")){
            one337.magnet(url)
                .then(function (result){
                        //console.log("one337 result\n", result);
                        //console.log("one337 result ok\n");
                        resolve(result);
                    }, function (err) {
                        console.log(err);
                        reject(0);
                    }
                );
        }else{
            reject(-1);
        }
    });
};

var manage_search = {
    get_magnet: get_magnet,
    initiate: initiate
};

module.exports = manage_search;