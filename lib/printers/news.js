// const
// filter: {add_date_line}
// logger: { pirnt }
// pusher
// table
// require ../util
const { filter: { addDateLine }, logger: { print }, pusher, table } = require('../util');

// module
// .exports
// newsText => {}
module.exports = newsText => {

  //test
  //console.log(newsText);

  // const news array
  // it is const because we can still push
  // newsArray is not changed.
  // this use it as a ref, ref, ref, ref, ref
  const newsArray = [];
  // const
  // pushNews =
  // pusher, push newsArray
  // because we pass array down there.
  // pusher is a func definition, like closure.
  // we pass down array, so it persists.
  const pushNews = pusher(newsArray);

  // push news(), now call.
  // pushNews(msg = '', preSpaces = 2, sufNewline = 2)
  // so this print empty things.
  pushNews();
  // push news
  // title
  pushNews(`知乎日报  ${addDateLine(newsText.date)}`);

  // const t
  // table
  // newsText.stories.map
  //

  //test
  let myStories = newsText.stories.map(
    (story, index) => {
      // have to return here.
      return [`${++index}.`, story.title];
    }
    //console.log(myStories);
  );

  // assign table to const
  const t = table(myStories);
  //console.log(t);

  // pus to news
  pushNews(t, 0, 1);

  // actually print
  print(newsArray);

  // store
  // stories length
  // news text, stories, length
  Store.storiesLength = newsText.stories.length;

  // another prompts.... for selection.
  return Prompts.news();
}
