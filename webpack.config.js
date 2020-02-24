const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    resolve: {
        extensions: ['.js', '.scss', '.json']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ca]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
            // {
            //     test: /\.jsx$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //               '@babel/preset-env'
            //             ],
            //             plugins: [
            //               '@babel/plugin-proposal-class-properties'
            //             ]
            //           }
            //       }
            //     ]
            // }
        ]
    }
}