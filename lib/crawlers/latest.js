// fs
const fs = require('fs');
// path
const path = require('path');

// crawler
// what queen
const Crawler = require('./queen');
// so it need logger.error.... not logger
// util
const { logger: { error } } = require('../util');

// cache
// ../../cache/latest.json
const cachePath = '../../cache/latest.json';

// is cache the newest
let isLatestCached = false;

// module
// .export
// = () => {}
module.exports = () => {
  // store
  // .from
  // latest
  Store.from = 'latest';

  // if is latest cached
  // so show cache result
  if (isLatestCached) {
    // return
    // new
    // promise
    // resolve, no reject at all....
    return new Promise(resolve => {
      // get cache json file
      const cachedLatest = require(cachePath);
      // resolve, promise
      // resolve latest.json
      resolve(cachedLatest);
    })
      // .then
      // res => {}
      .then(res => {
        // return
        // Printer news
        // res.
        return Printers.news(res);
      })
  } else {
    // return
    // new Crawler
    // ('news/latest')
    return new Crawler('news/latest')
      // .fetch
      .fetch()
      // .then
      // res => {}
      .then(res => {
        // fs
        // write file... just write to fache
        // path.resolve
        // __dirname, cachePath -------> ../../cache/latest.json
        // JSON string i fy
        // res
        // err
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          // error
          if (err) error(err);
          // is latest cached === true
          // it is like global
          // program killed will reset
          isLatestCached = true;

          // printers
          // .news
          // res, as arg
          return Printers.news(res);
        })
      })
  }
}
