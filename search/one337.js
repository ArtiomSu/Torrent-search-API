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
            url: url
            // headers: {
            //     // User agent, Cache Control and Accept headers are required
            //     // User agent is populated by a random UA.
            //     'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0',
            //     'Cache-Control': 'max-age=0',
            //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            //     'Accept-Language': 'en-US,en;q=0.5',
            //     'Accept-Encoding': 'deflate, br',
            //     'Connection': 'keep-alive'
            //
            // },
            // agentOptions: {
            //     ciphers: 'ECDHE-ECDSA-AES128-GCM-SHA256'
            // },
            // // Cloudscraper automatically parses out timeout required by Cloudflare.
            // // Override cloudflareTimeout to adjust it.
            // cloudflareTimeout: 5000,
            // // Reduce Cloudflare's timeout to cloudflareMaxTimeout if it is excessive
            // cloudflareMaxTimeout: 30000,
            // // followAllRedirects - follow non-GET HTTP 3xx responses as redirects
            // followAllRedirects: true,
            // // Support only this max challenges in row. If CF returns more, throw an error
            // challengesToSolve: 1600,
            // // Remove Cloudflare's email protection, replace encoded email with decoded versions
            // decodeEmails: false,
            // // Support gzip encoded responses (Should be enabled unless using custom headers)
            // gzip: false,
            // // Removes a few problematic TLSv1.0 ciphers to avoid CAPTCHA
            // //proxy: "http://10.0.0.2:8118"
        })
            .then(function (htmlString) {
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
                //console.log(err); console log in manage_search.js
                reject(err);
            });
    });
};

var magnet = function(url){
    return new Promise(function (resolve, reject) {
        cloudscraper({
            method: 'GET',
            url: url,
        })
            .then(function (htmlString) {
                 const cheerio$ = cheerio.load(htmlString);

                cheerio$('ul.dropdown-menu li a').each(function(){
                    var temp = cheerio$(this).attr('href');
                    //console.log(temp);

                    if(temp.startsWith("magnet:")){
                        resolve(temp);
                    }

                });

                resolve(0);
            })
            .catch(function (err) {
                //console.log(err); console log in manage_search.js
                reject(err);
            });
    });
};

module.exports = {
    search: one337,
    magnet: magnet
};