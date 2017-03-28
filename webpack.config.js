/* eslint-disable */
const path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');


//var CopyWebpackPlugin = require('copy-webpack-plugin');
//var Clean = require('clean-webpack-plugin')
//   ManifestRevisionPlugin = require('./webpack/manifest-revision-plugin')
// assets生成后，将includePaths中指定目录的assets的映射信息写入到manifest
        // 中，用于在Flask的模板页面中引用assets.
        // new ManifestRevisionPlugin(path.join(manifestPath, manifestFile), {
        //     rootAssetPath: rootAssetsRelativePath,
        //     includePaths: [
        //         'images/*', 'components/**/images/*', 'pages/**/images/*', 'pages/**/video/*',
        //     ]
        // })

const NODE_ENV=process.env.NODE_ENV && process.env.NODE_ENV.trim() || "";


var Config= {
  entry: {index:'./index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'js/[name].js'
  },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('js/comm.js'), 
        // 给js中剥离的css的文件指定名称
        new ExtractTextPlugin('/css/[name].css'),
        new webpack.DefinePlugin({
          // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
          "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
         }), 
         new webpack.NoErrorsPlugin() 
        // 使用 hash 作模块 ID，文件名作ID太长了，文件大小剧增
        //new HashedModuleIdsPlugin(),
        // 根据文件内容生成 hash
        //new WebpackMd5Hash()
         
    ],

  module: {
    loaders: [
      {test: /\.js$/,loader: 'babel', query: {presets: ['es2015',"stage-0",'react'], "plugins": ["transform-decorators-legacy"]},exclude: [nodeModulesPath]},
      {test: /\.less$/,loader: ExtractTextPlugin.extract('style', 'css!less')},
      {test: /\.(png|jpg)$/,loader: 'url?limit=2048&name=imgs/[name]_[hash:4].[ext]'} 

    ]
  },

   resolve: { 
    extensions: ['', '.js', '.jsx',"less"]   
  },

  // devServer: {
  //   colors: true,
  //   contentBase: __dirname,
  //   historyApiFallback: true,
  //   hot: true,
  //   inline: true,
  //   port: 9093,
  //   progress: true,
  //   stats: {
  //     cached: false
  //   }
  // }
  
}

//压缩代码
// if (NODE_ENV=="production") {   
//    Config.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       },
//       output: {
//         comments: false
//       }
//     })
//   )
// }  
 

module.exports= Config;