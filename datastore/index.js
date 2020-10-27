const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const Promises = require('bluebird');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////


exports.create = (text, callback) => {
  counter.getNextUniqueId((error, id) => {
    var pathname = path.join(exports.dataDir, `${id}.txt`);
    if (error) {
      throw new Error ('Error getting unique Id');
    } else {
      fs.writeFile(pathname, text, (err) => {
        if (err) {
          throw new Error ('Unable to write file.');
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.readOne = (id, callback) => {
  var pathname = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(pathname, 'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id: id, text: fileData});
    }
  });
};



exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);

  // get contents of folder: fs.readdir(path[, options])
  // if no files, return empty array
  // must include a text field in response to client
  // expect todo text instead of id
  // each todo is stored in its own file
  //
  // Promise.all


  // return array of files

  fs.readdir(exports.dataDir, 'utf8', (err, files) => {
    if (err) {
      throw new Error('Unable to read files.');
    } else {
      let dataFiles = files.map(file => {
        fs.readFile(path.join(exports.dataDir, file), 'utf8', (err, fileData) => {
          return {id: id, text: fileData};
        });
      });
      callback(null, dataFiles);
    }
  });
};


exports.update = (id, text, callback) => {
  var pathname = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(pathname, 'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(pathname, text, 'utf8', (err) => {
        if (err) {
          callback(new Error(`No item with id: ${id}`));
        } else {
          callback(null, { id: id, text: text });
        }
      });
    }
  });
};


exports.delete = (id, callback) => {
  var pathname = path.join(exports.dataDir, `${id}.txt`);
  fs.unlink(pathname, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

// id.txt
// id.txt
// id.txt
// id.txt
// id.txt

// files.map(file => {
//   fs.readFile(path.join(exports.dataDir, file), 'utf8', (err, fileData) => {
//     if (err) {
//       callback(new Error(`No item with id: ${id}`));
//     } else {
//       callback(null, {id: id, text: fileData});
//     }
//   });
// });