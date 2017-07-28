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

    removeFile: function(path) {
        fs.unlinkSync(path);
    },

    removeDirRecursive: function(path) {

        var _this = this;

        fs.readdirSync(path).forEach(function(file) {

            var curPath = path + "/" + file;

            if(fs.statSync(curPath).isDirectory()) {
                _this.removeDirRecursive(curPath);
            }
            else {
                _this.removeFile(path);
            }

        });

        fs.rmdirSync(path);
    }

}