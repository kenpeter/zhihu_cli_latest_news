// const table
// text-table
const table = require('text-table');

// module
// .exports
// string Arrays
module.exports = stringArrays => {
  // table
  // string arrays
  // .map
  // single

  //test
  //debugger;
  // with {}, {}, {}, {}
  // have to return
  return table(stringArrays.map(stringArray => [' '].concat(stringArray)), {
    hsep: ' ',
    align: ['l', 'r']
  })
}
