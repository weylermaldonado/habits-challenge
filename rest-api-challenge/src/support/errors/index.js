const errorFiles = require('./bootstrap.js');

for (const iterator of errorFiles) {
  let type = iterator.split('.')[0];
  if (type.includes('-')) type = type.replace('-', '');
  exports[type] = require('./' + iterator);
}
