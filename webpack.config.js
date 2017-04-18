/**
 * Created by monty on 2017/4/18.
 */

const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

//获取入口
let getEntry = (glob_path) => {

    let files = glob.sync(glob_path);
    let entries = {};


    files.forEach(elem => {
        entries[elem.split('/')[3]] = elem
    });

    return entries;
};
let entries = getEntry('./views/pages/**/**.js');

let chunks = Object.keys(entries);

let dirname = __dirname;

//webpack核心配置
let webpack_option = {
    entry: entries,
    output: {
        path: path.join(dirname, 'static'),
        publicPath: '/static/',
        filename: 'scripts/[name].min.js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                //配置css的抽取器、加载器。'-loader'可以省去
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
            },
            {
                test: /\.less$/,
                //配置less的抽取器、加载器。中间!有必要解释一下，
                //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
                //你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
                loader: ExtractTextPlugin.extract('css-loader!less-loader')
            },
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html-loader?attrs=img:src img:data-src"
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'vendors',
            chunk: chunks,
            minChunks: 3
        }),
        new ExtractTextPlugin('styles/[name].min.css'),
    ]
};

//生成html
let generateHtml = (html_path) => {

    let files_path = glob.sync(html_path);
    let option, file, pathname;

    files_path.forEach(elem => {

        file = elem.split('/')[4];
        pathname = elem.split('/')[3];

        option = {
            filename: `./${file}`, //生成的html存放路径，相对于path
            template: elem, //html模板路径

            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', pathname],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                // collapseWhitespace: true //删除空白符与换行符
            }

        };
        webpack_option.plugins.push(new HtmlWebpackPlugin(option));
    });
};
generateHtml('./views/pages/**/**.html');


module.exports = webpack_option;




