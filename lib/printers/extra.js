const { logger: { print }, pusher } = require('../util');

// extra Text coming from API
module.exports = extraText => {
  if (extraText.popularity) {
    const extraArray = [];
    const pushExtra = pusher(extraArray);

    pushExtra(`有 ${extraText.popularity} 人点赞`, 2, 1);

    print(extraArray);
  }

  return Prompts.story(extraText);
}
