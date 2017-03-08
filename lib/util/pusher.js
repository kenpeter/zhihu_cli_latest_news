// This is a function factory
// msgArr is like a ref
module.exports = msgArr =>
  // (xx, xx, xx), pass parameter.
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
