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

// created asynchronous function for readOne
const readOneAsync = id => {
  var pathname = path.join(exports.dataDir, `${id}.txt`);
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, 'utf8', (err, text) => {
      if (err) {
        reject(err);
      } else {
        resolve({id, text});
      }
    });
  });
};

// readAll function prior to promise implementation
// exports.readAll = (callback) => {
//   fs.readdir(exports.dataDir, (err, files) => {
//     if (err) {
//       throw new Error('Unable to read files.');
//     } else {
//       let dataFiles = files.map(file => {
//         let id = file.slice(0, file.length - 4);
//         return {id: id, text: id};
//       });
//       callback(null, dataFiles);
//     }
//   });
// };

// Copy of ReadAll to work with
exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    // Apply Promise.all to data files
    let dataFiles = files.map(file => {
      let id = file.slice(0, file.length - 4);
      return readOneAsync(id);
    });
    Promise.all(dataFiles).then((result) => {
      callback(null, results);
    });
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