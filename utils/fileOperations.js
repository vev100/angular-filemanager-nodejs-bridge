var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs.extra'));

module.exports = {

    remove: function(path) {

        var _this = this;

        if( fs.existsSync(path) ) {
            if(fs.statSync(path).isDirectory()) {
                _this.removeDirRecursive(path);
            }
            else {
                _this.removeFile(path);
            }
        }

    },

    removeFile: function(filePath) {
        fs.unlinkSync(filePath);
    },

    removeDirRecursive: function(dirPath) {

        var _this = this;

        fs.readdirSync(dirPath).forEach(function(file) {

            var curPath = dirPath + "/" + file;

            if(fs.statSync(curPath).isDirectory()) {
                _this.removeDirRecursive(curPath);
            }
            else {
                _this.removeFile(curPath);
            }

        });

        fs.rmdirSync(dirPath);
    }

}
