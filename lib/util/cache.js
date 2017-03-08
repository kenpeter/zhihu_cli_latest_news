// const fs
// require fs
const fs = require('fs');
// const path
// require path
const path = require('path');

// const empty = {}
const empty = {
  // news emtpy array
  news: [],
  // themes, false
  themes: false,
  // sections, false
  sections: false,
  // stories, empty array
  stories: []
};

// const is cached exist
// fs exists sync
// path, resolve
// __dirname/../../cached
const isCachedExist = fs.existsSync(path.resolve(__dirname, '../../cached'));
// another dir,
// __dirname/../../cache
const isCacheDirExist = fs.existsSync(path.resolve(__dirname, '../../cache'));

// if no ../../cached.json
// JSON string i fy
// empty obj becomes string.
if (!isCachedExist) {
  // fs write file sync
  // ....
  fs.writeFileSync(path.resolve(__dirname, '../../cached.json'), JSON.stringify(empty));
}

// if no ../../cache
if (!isCacheDirExist) {
  fs.mkdirSync(path.resolve(__dirname, '../../cache'));
}

// cacheFiles, kind of global
// const cache files
// fs. read dir sync
// read cache/******
const cacheFiles = fs.readdirSync(path.resolve(__dirname, '../../cache'));

// exports
// .watch
// = () => {}
exports.watch = () => {
  // 2 mb cache
  if (calcCacheSize() > 1024 * 1024 * 2) {
    // this
    // .clear
    // true
    this.clear(true);
  }
}

// exports.show = () => {}
exports.show = () => {
  // const
  // cache size
  // cal cache size, get the real size
  const cacheSize = calcCacheSize();
  // let size text
  let sizeText = '';

  // cache size < 1024
  if (cacheSize < 1024) {
    // size text
    // < 1024, show kb
    sizeText = `${cacheSize.toFixed(1)}KB`;
  } else if (cacheSize >= 1024 && cacheSize <= 1024 * 1024) {
    // in range show mb
    sizeText = `${(cacheSize / 1024).toFixed(1)}MB`;
  } else {
    // else too big
    // show gb
    sizeText = `${(cacheSize / (1024 * 1024)).toFixed(1)}GB`;
  }

  // return size text
  return sizeText;
}

// exports.clear =
// is watch , true
exports.clear = isWatch => {
  // size text
  // this
  // .show
  const sizeText = this.show();

  // cachefiles
  // .length
  if (cacheFiles.length) {
    // fs, write file sync
    // path.resolve
    // __dirname/../../cached.json
    // stringify, empty obj to string.
    fs.writeFileSync(path.resolve(__dirname, '../../cached.json'), JSON.stringify(empty));

    // cacheFiles == dir
    // foreach
    // fs unlink sync  each file
    cacheFiles.forEach(file => {
      fs.unlinkSync(path.resolve(__dirname, `../../cache/${file}`));
    })

    // just print
    if (!isWatch) {
      console.log(`Cleared up ${sizeText} cache files`);
    }
  } else {
    console.log('No cache files');
  }
}

// func
// cal cache size
function calcCacheSize () {
  // if cacheFiles
  // .length
  if (cacheFiles.length) {
    // return cacheFiles
    return cacheFiles
      // .map, map dir, it has many json
      // file =>
      // +fs
      // stat sync
      // path.resolve
      // __dirname/../../cache/${file}
      .map(file => +fs.statSync(path.resolve(__dirname, `../../cache/${file}`)).size)
      // .reduce
      // (x, y) => x + y
      .reduce((x, y) => x + y) / 1024;
  }
  // return 0
  return 0;
}
