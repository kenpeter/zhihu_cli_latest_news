// const crawler
const Crawler = require('./queen');

module.exports = () => {
  // reutrn new cralwer
  // story-extra/story_id
  return new Crawler(`story-extra/${Store.storyId}`)
    // fetch version 4
    .fetch()
    .then(res => {
      // .then
      // res => {}
      // printers.extra(res);
      return Printers.extra(res);
    })
}
