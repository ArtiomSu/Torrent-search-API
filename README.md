# Torrent-search-API
API for searching torrents designed to work with my [Torrent-search-Telegram-Bot](https://github.com/ArtiomSu/Torrent-search-Telegram-Bot).

It is capable of scraping websites in order to return sorted data, as well as magnet link for torrents.

# Setup
1. clone the repo
2. `npm install` to download the modules
3. `npm start` to run the server on default port 9876

You can change the port in `./bin/www` line 15 or set `PORT=9877` in your shell's env

# Using the API
The API has two post endpoints `/search` and `/magnet`.

### /search
I will use curl to quickly demonstrate

The /search requires `query` and `sort` in the request body.

`query` is anything you want to search for in this case we will use ubuntu.
`sort` is an integer from 1-8 anything else outside that range will default to 1. This sorts the data as follows
```
1: file size descending ( largest files at the top )
2: file size ascending ( smallest files at the top )
3: newest files first
4: oldest files first
5: highest seeders first
6: lowest seeders first
7: highest amount of leechers first
8: lowest amount of leechers first
```
A search for ubuntu with the largest file size first will look like this
```
curl --location --request POST '10.0.0.69:9876/search' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'query=Ubuntu' --data-urlencode 'sort=1'
```

A search for ubuntu 18.10 with the most seeders will look like this
```
curl --location --request POST '10.0.0.69:9876/search' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'query=Ubuntu 18.10' --data-urlencode 'sort=5'
```
The endpoint will return data in the following format
```
{
  "data": [
    {
      "name": "Ubuntu 18.10",
      "url": "https:........",
      "seeders": "32",
      "leechers": "4",
      "date": "Aug. 25th '19",
      "size": "8.1 MB",
      "magnet": null,
      "provider": "1337x.to"
    },
    {
      "name": "Ubuntu 18.10 Desktop amd x64 2018",
      "url": "https:.......",
      "seeders": "0",
      "leechers": "0",
      "date": "Dec. 10th '18",
      "size": "1.9 GB",
      "magnet": null,
      "provider": "1337x.to"
    }
  ]
}
```
### /magnet
Once you retrieved some data you can use the url attribute to get the magnet link.

Again this is a post request and must have a url attribute as part of the request body
```
curl --location --request POST '10.0.0.69:9876/magnet' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'url=https:......................'
```
This will return a single magnet link
```
{
  "data": "magnet..........."
}
```
# Software that uses this API
[Torrent-search-Telegram-Bot](https://github.com/ArtiomSu/Torrent-search-Telegram-Bot) this is a telegram bot that lets you search for torrents aswell as lots of other features for managing telegram groups.


