// cheerio
// require, cheerio
const cheerio = require('cheerio');
// chalk
// require chalk
const chalk = require('chalk');
// const
// logger.print
// pusher
// require
// ../util
const { logger: { print }, pusher } = require('../util');

// module
// exports =
// storyText => {}
module.exports = storyText => {
  // const story array = []
  const storyArray = [];
  // const push story = pusher, story array.
  const pushStory = pusher(storyArray);

  // push story = space + msg + newline.
  pushStory();
  // push story
  // chalk
  // .bold
  // sotry text
  // .title
  //
  /*
  "body": "html........ long"
  "image_source": "《森山大道 · 映像》",
	"title": "专业摄影与非专业摄影的差异在哪里？",
	"image": "http://pic1.zhimg.com/894d8f62a5673a554ca1e0d29007ef80.jpg",
	"share_url": "http://daily.zhihu.com/story/9273226",
	"js": [],
	"ga_prefix": "030813",
	"images": [
		"http://pic4.zhimg.com/cf7b042ce80fd8f2f95e4cf40351c42f.jpg"
	],
	"type": 0,
	"id": 9273226,
	"css": [
		"http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
	]
  */
  pushStory(chalk.bold(storyText.title))

  // story text
  // .image
  if (storyText.image) {
    //push story
    // ${storyText.image}
    // 2 is space
    // 1 is new line
    pushStory(`[配图](${storyText.image})`, 2, 1)
    pushStory(`[来源](${storyText.image_source})`)
  }

  // story text
  // .type
  // === 0
  if (storyText.type === 0) {
    // const
    // $
    // cheerio
    // .load
    // storyText
    // .body
    const $ = cheerio.load(storyText.body);
    // const
    // $questions
    // $('.question')
    const $questiones = $('.question');

    // questions
    // .each
    // (index, question) => {}
    $questiones.each((index, question) => {
      // const
      // single $question
      const $question = $(question);

      // index == 0,
      // -------
      if (!index) {
        pushStory('---------------------------------------------')
      }

      // const
      // title
      // $question
      // .find
      // .question-title
      // .text
      const title = $question.find('.question-title').text()

      // if title
      if (title) {
        // if title includes ad
        // return
        if (title.includes('广告')) {
          return;
        } else {
          // push story
          // chalk
          // .bold
          // title
          pushStory(chalk.bold(title));
        }
      }

      // const $ans = $q.find('.answer');
      const $answers = $question.find('.answer');
      // $view more = $q.find('.view-more a')
      const $viewMore = $question.find('.view-more a');
      // view more .text
      const viewMoreText = $viewMore.text();
      // view more .attr, href
      const viewMoreHref = $viewMore.attr('href');

      //
      $answers.each((index, answer) => {
        const $answer = $(answer)
        const $meta = $answer.find('.meta')
        const $content = $answer.find('.content')
        const $paragraphs = $content.find('p')

        const author = $meta.find('.author').text()
        const bio = $meta.find('.bio').text()

        if (index) {
          pushStory('-------------------------')
        }

        if (author) {
          pushStory(`作者：${chalk.bold(author)}${bio}`)
        }

        if ($paragraphs.length) {
          $paragraphs.each((index, paragraph) => {
            const $paragraph = $(paragraph)

            const paraArray = []
            const pushPara = pusher(paraArray)

            $paragraph.contents().each((index, node) => {
              const $node = $(node)

              if ($node.is('img')) {
                pushPara(`[图片](${$node.attr('src')})`, 0, 0)
              } else if ($node.is('a')) {
                pushPara(`${chalk.underline($node.text())}(${$node.attr('href')})`, 0, 0)
              } else if ($node.is('strong, b')) {
                pushPara(chalk.bold($node.text()), 0, 0)
              } else if ($node.is('br')) {
                pushPara()
              } else {
                pushPara($node.text(), 0, 0)
              }
            })

            pushStory(paraArray.join(''))
          })
        } else {
          const contentArray = []
          const pushContent = pusher(contentArray)

          $content.contents().each((index, node) => {
            const $node = $(node)

            if ($node.is('img')) {
              pushContent()
              pushContent(`[图片](${$node.attr('src')})`, 2, 2)
            } else if ($node.is('a')) {
              pushContent(`${chalk.underline($node.text())}(${$node.attr('href')})`, $node.prev().is('img, br') || !index ? 2 : 0, 0)
            } else if ($node.is('strong, b')) {
              pushContent(chalk.bold($node.text()), $node.prev().is('img, br') || !index ? 2 : 0, 0)
            } else if ($node.is('br')) {
              pushContent()
            } else {
              pushContent($node.text(), $node.prev().is('img, br') || !index ? 2 : 0, 0)
            }
          })

          pushStory(contentArray.join(''), 2, 1)
        }
      })

      if (viewMoreText) {
        pushStory(`${chalk.underline(viewMoreText)}(${viewMoreHref})`, 6)
      }

      pushStory('---------------------------------------------')
    })
  } else {
    // other wise, need to visit share_url
    pushStory('---------------------------------------------')
    pushStory(`查看原文：${storyText.share_url}`)
    pushStory('---------------------------------------------')
  }

  const { id, section, theme } = storyText

  Store.storyId = id

  if (section) {
    Store.sectionId = section.id

    pushStory(`知乎专栏：${section.name}`, 2, 1)
  } else {
    Store.sectionId = 0
  }

  if (theme) {
    Store.themeId = theme.id;

    pushStory(`主题日报：${theme.name}`, 2, 1);
  }

  print(storyArray);

  return Crawlers.extra();
}
