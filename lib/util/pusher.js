// You can see that, we define a function here.
// module
// .exports
// (msgArr), news json
module.exports = msgArr =>
  // msg === ''
  // pre spaces === 2
  // new line 2
  (msg = '', preSpaces = 2, sufNewline = 2) => {
    // const prefix
    // space.repeat (2 spaces)
    const prefix = ' '.repeat(preSpaces);
    // const suffix
    // '\n'.repeat(2 or 1)
    const suffix = '\n'.repeat(msg ? sufNewline : 1);

    //test
    //console.log("---test---");
    //console.log(msgArr);

    // msg arr. push
    // test
    //debugger;
    msgArr.push(prefix + msg + suffix);
  }
