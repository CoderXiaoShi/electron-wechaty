const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './wechaty.js'),
    output: {
        path: path.resolve(__dirname, 'dist_wechaty'),
        filename: 'built.js',
    },
    target: 'node',
    mode: 'development'
}
