
const fs = require('fs');
/**
 * Load all error files in runtime
 * @param {String} dir Directory file
 * @returns {Array} Files
 */
function loadDir(dir) {
  const errorFiles = [];
  fs.readdirSync(dir).forEach((file) => {
    const isErrorFile = file.split('.')[1] === 'error';
    if (isErrorFile) { errorFiles.push(file); }
  });

  return errorFiles;
}

const files = loadDir(__dirname);

module.exports = files;
