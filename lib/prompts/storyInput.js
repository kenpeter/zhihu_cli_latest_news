//
const { prompt } = require('inquirer');

// back prompt???
module.exports = backPrompt => {
  return prompt([{
    // prompt
    // type, input
    type: 'input',
    // name, story
    name: 'story',
    // msg
    message: '请输入新闻序号：',
    // validate
    // input, automate
    validate (input) {
      // input number, max 2 digits
      if (/^[0-9]{0,2}$/.test(input)) {
        // const tested input
        // Number, input
        const testedInput = Number(input);

        // if input >=1
        // or input <= Store.storiesLength
        if (testedInput >= 1 && testedInput <= Store.storiesLength) {
          // return true
          return true;
        }
      }

      // return
      // else asking for reinput
      return `请输入 1 ~ ${Store.storiesLength} 内的数字`;
    }
  }])
    .then(answer => {
      // then
      // answer => {}
      // Crawlers.
      // .story
      // answer.story
      // backPrompt is the enter number
      Crawlers.story(answer.story, backPrompt);
    })
}
