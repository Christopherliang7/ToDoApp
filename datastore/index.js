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
  // fs.readFile(`${exports.dataDir}/${id}.txt`, {encoding: 'utf-8'}, (err, text)
  // return array of files
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
