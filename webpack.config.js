var path = require('path');

const webpack = require('webpack');
module.exports={
    mode: 'development',
    entry:path.resolve(__dirname, 'src/app.js'),
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, 'public')
    },
    watch:true,
    // module:{
    //     rules:[{
    //         test:/\.js$/,
    //         exclude:/node_modules/,
    //         loader:'babel-loader',
    //         query:{
    //             presets:['react','es2015','stage-1']
    //         }]
    //     }
    // }
    module: {
        rules: [{
          test: /\.js$/, // include .js files
          exclude: /node_modules/, // exclude any and all files in the node_modules folder
          use: [{
            loader: "babel-loader",
            options: {
                presets:['react','es2015','stage-1']
            }
          }]
        }]
      }
}