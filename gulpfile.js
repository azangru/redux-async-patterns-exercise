var gulp = require('gulp');
var fs = require('fs');

/** Code for checking file’s existence borrowed from here:
* https://www.gregjs.com/javascript/2016/checking-whether-a-file-directory-exists-without-using-fs-exists/
*/

gulp.task('config:prepare', () => {
    const config = require('./config.js');
    const pathToDevConfig = '../squirrel_dev_config.js';
    const configDestinationPath = './config.json';
    let devConfig = {};

    var isFileSync = function(aPath) {
        try {
            return fs.statSync(aPath).isFile();
        } catch (e) {
            if (e.code === 'ENOENT') {
                return false;
            } else {
                throw e;
            }
        }
    };

    if (isFileSync(pathToDevConfig)) {
        devConfig = require(pathToDevConfig);
    }

    const result = Object.assign({}, config, devConfig);
    const destinationFile = fs.openSync(configDestinationPath, 'w');
    fs.writeSync(destinationFile, JSON.stringify(result));

});
