const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [ {
            test: /\.css$/,
            use: [
                miniCss.loader,
                'css-loader'
            ]
        } ]
    },
    plugins: [
        new miniCss({
            filename: 'style.css'
        }),
    ]
};