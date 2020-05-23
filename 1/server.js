var express = require('express');
var winston = require('winston');
var logger = require('morgan');
var log = require('./libs/log')(module);
var app = express();

app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  response.end('<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>');
});

app.listen(3000);

app.get('/api/articles', function(req, res) {
  res.send('GET');
});
app.post('/api/articles', function(req, res) {
 	res.send('POST');
});
app.get('/api/articles/:id', function(req, res) {
  res.send('GET id');
});
app.put('/api/articles/:id', function (req, res){
  res.send('PUT');
});
app.delete('/api/articles/:id', function (req, res){
  res.send('DELETE');
});

app.use(function(req, res, next){
res.status(404);
log.debug('Not found URL: %s',req.url);
res.send({ error: 'Not found' });
return;
});

app.use(function(err, req, res, next){
res.status(err.status || 500);
log.error('Internal error(%d): %s',res.statusCode,err.message); res.send({ error: err.message });
 	return;
});

app.get('/ErrorExample', function(req, res, next){
next(new Error('Random error!'));
});
