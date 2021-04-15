const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './electron-main.js'),
    output: {
        path: path.resolve(__dirname, 'dist_electron'),
        filename: 'built.js',
    },
    target: 'electron-main',
    mode: 'development'
}
