
var fs = require('fs');
var http = require('http');
var send = require('send');

var icon = require('./icon');

module.exports = exports = showlove;

var ASSETS = [
  '/deviceshake.js',
  '/ubuntu.woff'
];

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function showlove(opts) {

  var vars = {
    'title': escape(opts.title),
    'color-fill': opts['color-fill'],
    'color-stroke': opts['color-stroke'],
    'phrases': JSON.stringify(opts.phrases),
    'timestamp': Date.now()
  };

  var app = function (req, res) {

    function error(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Internal server error' + '\n\n' + err.stack);
    }

    function nothing() {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Not found');
    }

    function asset() {
      var o = { root: __dirname + '/../assets' };
      send(req, req.url, o).on('error', error).pipe(res);
    }

    function template(name) {
      fs.readFile(__dirname + '/../assets/' + name, function (err, buf) {
        if (err) { return error(err); }

        res.end(buf.toString().replace(/\{\{([a-z-]+)\}\}/g, function (_, name) {
          return vars[name];
        }));
      });
    }

    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.setHeader('Allow', 'GET');
      res.end('Method not allowed');
      return ;
    }

    if (~ASSETS.indexOf(req.url)) {
      asset();
      return ;
    }

    if ((r = /^\/icon-([0-9]+)\.png/.exec(req.url))) {
      res.setHeader('Content-Type', 'image/png');
      icon({
        size: parseInt(r[1]),
        shape: opts.icon,
        fill: opts['color-fill'],
        stroke: opts['color-stroke']
      }).pipe(res);
      return ;
    }

    if ('/' === req.url) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      template('index.html');
      return ;
    }

    if ('/cache.appcache' === req.url) {
      res.setHeader('Content-Type', 'text/cache-manifest');
      template('cache.appcache');
      return ;
    }

    nothing();
  };

  app.listen = function () {
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };

  return app;
}
