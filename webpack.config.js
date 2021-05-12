module.exports = [
    {
        mode: 'development',
        entry: './src/index.js',
        output: {
            filename: 'csfd-extended.js'
        },
        optimization: {
            minimize: false
        },
    },
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            filename: 'csfd-extended.js'
        },
        optimization: {
            minimize: false
        },
    },
];
