// export
// .add date line
// date => {}
// year-month-date
exports.addDateLine = date => [date.slice(0, 4), date.slice(4, 6), date.slice(6)].join('-');

// exports.rmDateLine
// yearmonthdate, e.g. 20171201
// lineDate
// +lineDate
// .split('-')
// .join('')
exports.rmDateLine = lineDate => +lineDate.split('-').join('');
