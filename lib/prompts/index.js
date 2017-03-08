const menu = require('./menu');
const news = require('./news');
const storyInput = require('./storyInput');
const story = require('./story');

// index.js contains many small modules.
// can use like xxx.menu
module.exports = {
  menu,
  news,
  storyInput,
  story
}
