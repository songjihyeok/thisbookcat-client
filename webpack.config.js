
const DashboardPlugin = require("webpack-dashboard/plugin");
const {resolve }= require('path')
const srcDir = resolve(__dirname, 'src')
const distDir = resolve(__dirname, 'dist')
const Path = require('path');
const webpack = require('webpack')
const publicDir =resolve(__dirname, 'public')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const ManifestPlugin = require('webpack-manifest-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin =require("mini-css-extract-plugin")
//const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports ={
  entry:[`${srcDir}/index.js`],
  output:{
    filename: 'bundle.js' ,
    path: distDir,
    publicPath: '/'
  },
  module: { 
    rules: [
    // 첫 번째 룰
    {
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      include: Path.join(__dirname, "./public")
    },
    {
      test: /\.(jsx?)$/,
      exclude: /node_modules/,
      use: {loader:'babel-loader',
      options: {
        presets: ['@babel/preset-env', "@babel/react"]
        }
      }
    },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
    // {
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   loader: "standard-loader",
    //   exclude: /node_modules/
    // },
    {
      test: /\.html$/,
      exclude: /node_modules/,
      use: [{ 
        loader : "html-loader",
        options:{minimize:true}
      }]
    },
    {
    test: /\.(ttf|eot|svg|jpg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: srcDir,
            use: [{
                loader: 'file-loader'
            }]
    },        
    // 두 번째 룰
    {
      test: /\.(svg|png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options:{
            limit:8192,
            fallback : 'responsive-loader',
            options: {
                       adapter: require('responsive-loader/sharp')
                      },
            quality:85
          }
        }
      ]
    }]
},
node: {
  fs: 'empty'
},
  plugins:[
    new HtmlWebpackPlugin({
     template: `${publicDir}/index.html`,
      favicon:'public/aftereadLogo.png',
      historyApiFallback: true 
    }),
    new ManifestPlugin (),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }), 
    new DashboardPlugin(),
    new LinkTypePlugin(),
  //  new StyleLintPlugin()
  ],
  devServer:{
    host:'localhost',
    port: port,
    contentBase: Path.join(__dirname, 'public')
  },
  optimization:{
    minimizer: [new UglifyJsPlugin()]
  }
}