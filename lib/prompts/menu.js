// const
// {}
// prompt
// require
// inquir .... er
const { prompt } = require('inquirer');

// module
// .exports
// =
// () => {}
module.exports = () => {
  //test
  //Crawlers.latest();

  // return
  // prompt
  // [], array
  // inside the array, it is obj
  return prompt([{
    // type, list
    type: 'list',
    // name, menu
    name: 'menu',
    // msg to choose
    message: '请选择操作：',
    // choices
    // it is array
    // has many objs
    // {name and value}
    choices: [{
      name: '查看今日新闻 (latest news)',
      // latest is the latest news
      value: 'latest'
    }, /*{
      name: '查看往日新闻 (old news)',
      // news means old news
      value: 'news'
    }, {
      name: '查看主题日报 (news paper)',
      // themes means news paper
      value: 'themes'
    }, {
      name: '查看知乎专栏 (specific topic)',
      // sections means specific topic
      value: 'sections'
    }, {
      // out
      name: '退出 (exit)',
      value: 'exit'
    }*/
    ],
  }])
    // .then
    // answer => {}
    .then(answer => {
      // switch
      // {name: '', value: 'latest'}
      switch (answer.menu) {
        // case
        // latest
        // latest news
        case 'latest':
          // Crawl
          // .latest()
          Crawlers.latest()
          // break
          break

        // case news, old news
        case 'news':
          // prompts
          // .newsInput()
          //Prompts.newsInput()
          // break
          break

        // case thems
        // news paper
        case 'themes':
          // crawlers
          // .themes
          //Crawlers.themes()

          break

        // speicla topic
        case 'sections':
          //Crawlers.sections()

          break

        case 'exit':
          process.exit()
      }
    })
}
