// const {}
// prompt
// require
// 'inquirer'
const { prompt } = require('inquirer');

// for next option
// module
// .exports
// () => {}
module.exports = () => {
  // return
  // prompt
  // [{}]
  return prompt([{
    // type list
    type: 'list',
    // name, news
    name: 'news',
    //
    message: '请选择操作：',
    // choices
    choices: [{
      name: '阅读新闻 (read story)',
      value: 'story'
    }, {
      name: '返回主菜单 (back to menu)',
      value: 'backMenu'
    }]
  }])
    .then(answer => {
      // .then
      // answer => {}
      switch (answer.news) {
        case 'story':
          Prompts.storyInput();
          break

        case 'backMenu':
          // Prompt is global
          Prompts.menu();
      }
    })
}
