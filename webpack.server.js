/**
 * Created by monty.ma on 17/6/2.
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpack_config = require('./webpack.config.js');

const __port = 4000;    //端口

let entry = webpack_config.entry;
let config_keys = Object.keys(webpack_config.entry);

config_keys.forEach(elem => {
    console.log(entry[elem]);
});
