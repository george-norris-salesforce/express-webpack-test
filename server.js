const express = require('express');
const config = require('./webpack.config');
const webpack = require('webpack');
const { resolve } = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');

const assetsDir = resolve(__dirname, './assets');
const compiler = webpack(config);
const staticAssetHandler = express.static(assetsDir);

const app = express();

app.use('/assets', staticAssetHandler);

webpackDevMiddleware(compiler, {
  publicPath: config.devServer
});

app.use(webpackDevMiddleware);

app.set('port', 5000);

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.listen(app.get('port'), () => {
  console.log('app starting..');
});


module.exports = app;
