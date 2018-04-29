const path = require('path')

const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = [
    {
        mode: 'development',
        target: 'web',
        entry: {
            analytics: './src/rpage.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'rpage.js',
        }
    },
    {
        mode: 'production',
        target: 'web',
        entry: {
            analytics: './src/rpage.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'rpage.min.js',
        }
    },
    {
        mode: 'production',
        target: 'web',
        entry: {
            analytics: './src/rpage.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'rpage.amd.min.js',
            libraryTarget: 'amd',
        }
    }
]
