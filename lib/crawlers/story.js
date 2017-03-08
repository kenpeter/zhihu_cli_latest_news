// const fs
const fs = require('fs');
// path
const path = require('path');
//
const Crawler = require('./queen');
// error
const { logger: { error } } = require('../util');
// what is this cached.json in top level.
const cachedPath = '../../cached.json';
// get cached.
// {"news":[],"themes":false,"sections":false,"stories":[]}
// ../../cached.json
const cached = require(cachedPath);

//
module.exports = (storyNumber, backPrompt) => {
  //console.log("---");
  //console.log(storyNumber);
  //console.log(backPrompt);

  // let story id
  let storyId;

  // story number
  if (storyNumber) {
    // if yes, stories
    let stories

    // switch
    // Store.from
    switch (Store.from) {
      // latest
      case 'latest':
        // latest.json
        stories = require('../../cache/latest.json');
        break;
      case 'news':
        // stories
        // = require
        // ../../cache/news-date.json
        stories = require(`../../cache/news-${Store.newsDate}.json`);
        break;
      case 'theme':
        // theme, news paper
        stories = require(`../../cache/theme-${Store.themeId}.json`);
        break;
      case 'section':
        // specific topic
        stories = require(`../../cache/section-${Store.sectionId}.json`)
    }

    // stories from require, which is the json file
    // now get id
    // storyNumber from input
    storyId = stories.stories[storyNumber - 1].id;
  } else {
    // so we keep track of global story id.
    storyId = Store.storyId;
  }

  // pick a story
  // ../../cache/story-xxxxx(id).json
  const cachePath = `../../cache/story-${storyId}.json`;

  // ../../cached.json
  // stories: [id1, id2, id3]
  // arr.includes
  // storyId
  if (cached.stories.includes(storyId)) {
    // return
    // new
    // Promise
    // resolve => {}
    return new Promise(resolve => {
      // const cached story
      // require
      // cachePath
      // cachePath ==== ../../cache/story-xxxxxx.json
      const cachedStory = require(cachePath);
      // resolve
      // cachedStory....
      // pass to printer
      resolve(cachedStory);
    })
      .then(res => {
        // .then(res =>{})
        //
        return Printers.story(res);
      })
  } else {
    // ......
    // news/1
    return new Crawler(`news/${storyId}`)
      .fetch()
      .then(res => {
        fs.writeFile(path.resolve(__dirname, cachePath), JSON.stringify(res), err => {
          if (err) error(err)

          cached.stories.push(storyId)

          fs.writeFileSync(path.resolve(__dirname, cachedPath), JSON.stringify(cached))

          return Printers.story(res)
        })
      })
  }
}
