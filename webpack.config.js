const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const Dotenv = require('dotenv-webpack');
module.exports = {
    // Other rules...
    plugins: [
        new NodePolyfillPlugin(),
        new Dotenv()
    ],
    resolve: {
        fallback: {
            net: false,
            tls: false
        }
    }
}