// const
// chalk, better print out
const chalk = require('chalk');

// exports
// .print
// msg arr =>{}
exports.print = msgArr => {
  // console.log
  // msg arr, join with ''
  console.log(msgArr.join(''))
}

// exports.error = err => {}
exports.error = err => {
  // console.log
  // with chalk.red
  // `error: ${err.msg}`
  console.error(chalk.red(`  Error: ${err.message}`))
  // out
  process.exit(1)
}
