const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////


exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
  counter.getNextUniqueId((error, id) => {
    var pathname = path.join(exports.dataDir, `${id}.txt`);
    if (error) {
      throw new Error ('Error getting unique Id');
    } else {
      // fs.writeFile(filePath, contents, (err)=>)
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

exports.readAll = (callback) => {
  // var data = [];
  // for (var i = 1; i < )
  //  path.join(exports.dataDir, 'data/', '0000', i, '.txt')

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);

};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
console.log(exports.dataDir);
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
