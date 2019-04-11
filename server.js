const express = require('express');
const config = require('./webpack.config');
const webpack = require('webpack');
const { resolve } = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');

const assetsDir = resolve(__dirname, './assets');
const compiler = webpack(config);
const staticAssetHandler = express.static(assetsDir);

const app = express();
const viewsDir = resolve(__dirname, '../dist/views');

app.set('views', viewsDir);
app.use('/assets', staticAssetHandler);
app.set('view engine', 'pug');

app.use(webpackDevMiddleware(compiler, config.devServer));
app.set('port', 5000);

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(app.get('port'), () => {
  console.log('app starting..');
});


module.exports = app;
