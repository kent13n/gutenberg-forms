const path = require("path");

module.exports = {
    entry: {
        // my blocks
        form: "./blocks/form/index.jsx",
        input: "./blocks/input/index.jsx",
        layout: "./blocks/layout/index.jsx",
    },
    output: {
        path: path.resolve(__dirname, "blocks/dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    watchOptions: {
        poll: 1000, // Mandatory for WSL
    },
};
