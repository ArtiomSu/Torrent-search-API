const cloudscraper = require('cloudscraper');
const Promise = require('promise');
//var htmlparser = require("htmlparser");
const cheerio = require('cheerio');

/*      Sort options
*   1 - by size decending
*   2 - by size ascending
*   3 - by time descending
*   4 - by time ascending
*   5 - by seeders descending
*   6 - by seeders ascending
*   7 - by leechers descending
*   8 - by leechers ascending
* */

var make_url = function (base_url, data) {
    switch (Number(data.sort)) {
        case 1:
            return base_url+"/sort-search/"+data.query+"/size/desc/1/";
        break;
        case 2:
            return base_url+"/sort-search/"+data.query+"/size/asc/1/";
        break;
        case 3:
            return base_url+"/sort-search/"+data.query+"/time/desc/1/";
        break;
        case 4:
            return base_url+"/sort-search/"+data.query+"/time/asc/1/";
        break;
        case 5:
            return base_url+"/sort-search/"+data.query+"/seeders/desc/1/";
        break;
        case 6:
            return base_url+"/sort-search/"+data.query+"/seeders/asc/1/";
        case 7:
            return base_url+"/sort-search/"+data.query+"/leechers/desc/1/";
            break;
        case 8:
            return base_url+"/sort-search/"+data.query+"/leechers/asc/1/";
        break;
        default:
            return base_url+"/sort-search/"+data.query+"/size/desc/1/";
    }

};

var one337 = function(data){
    const base_url = "https://1337x.to";
    var url = make_url(base_url, data);
    return new Promise(function (resolve, reject) {
        cloudscraper({
            method: 'GET',
            url: url,
        })
            .then(function (htmlString) {
                //console.log(htmlString);

                // var html_parser_handler = new htmlparser.DefaultHandler(function (error, dom) {
                //     if (error)
                //         console.log("html parser error");
                //     else
                //         console.log("html parser done?");
                // });
                //
                // var html_parser = new htmlparser.Parser(html_parser_handler);
                // html_parser.parseComplete(htmlString);
                //
                // console.log(html_parser_handler.dom, false, null);

                var torrents = [];

                const cheerio$ = cheerio.load(htmlString);

                cheerio$('table.table-list tbody tr').each(function(){
                    var children = cheerio$(this).children();
                    //console.log(children);
                    var url = cheerio$(children[0]).children();
                    url = base_url + cheerio$(url[1]).attr('href');

                    var size = cheerio$(children[4]).contents();
                    size = size[0].data;

                    var row = {
                        "name" : cheerio$(children[0]).text(),
                        "url" : url,
                        "seeders" : cheerio$(children[1]).text(),
                        "leechers" : cheerio$(children[2]).text(),
                        "date" : cheerio$(children[3]).text(),
                        "size" : size,
                        "magnet": null,
                        "provider": "1337x.to"
                    };

                    if(row.name && row.url && row.size){
                        torrents.push(row);
                    } else{
                        console.log("something wrong with row")
                    }

                    //console.log(row);
                });

                resolve(torrents);
            })
            .catch(function (err) {
                console.log(err);
                reject(err);
            });
    });
};

module.exports = one337;