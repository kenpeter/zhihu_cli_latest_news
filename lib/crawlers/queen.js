// const super agent, simulate your browser
const superagent = require('superagent');

// error
// ../util/logger
const { error } = require('../util/logger');

// define a class
// Crawler
class Crawler {
  // constructor
  constructor (url, apiVer = 4) {
    // 1. this.url ==== news/latest
    this.url = url;
    // this api version
    // 4...............
    this.apiVer = apiVer;
  }

  // fetch
  //
  fetch () {
    // return
    // new promise
    // resolve => {}
    // return new Promise(function (resolve, reject) {
    // (resolve, reject) => {}
    return new Promise(resolve => {
      // use super agent
      // .get myurl
      let myurl = `http://news-at.zhihu.com/api/${this.apiVer}/${this.url}`;

      //test
      //debugger;

      superagent.get(myurl)
        // .end
        // (err, res) => {}
        .end((err, res) => {
          // if (err)
          // error(err)
          if (err) error(err);

          // resolve
          // JSON
          // .parse
          // res.text
          // test
          //debugger;
          resolve(JSON.parse(res.text)); // this a promise
        })
    })
  }
}

// module
// .exports
// = crawler
module.exports = Crawler;
