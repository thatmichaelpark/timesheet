var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

var employees = require('./routes/employees');
var times = require('./routes/times');

//var root = '../animated transitions example/';
//var root = './public/';
//app.use('/', express.static(root));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/timesheets', {native_parser:true});

// Make our db accessible to our router
app.use( function ( req, res, next ) {
	req.db = db;
	next();
});
app.use('/employee', employees);
app.use('/times', times);

app.listen(80);
/**
var root = '../';

function start() {
	function onRequest(request, response) {
		var postData = '';
		var pathname = url.parse(request.url).pathname;
		console.log('request received for ' + pathname);
		route(pathname, response);
	}

	http.createServer(onRequest).listen(8888);
	console.log('server has started on port 8888.');
}

function route(pathname, response) {
	var re = /\.(\w+$)/;
	var matches = pathname.match(re);
	var mimetypes = {
		html: 'text/html',
		css: 'text/css',
		js: 'application/javascript',
		json: 'application/json'
	};
	var mimetype = mimetypes[ matches ? matches[1] : ''];
	if (!mimetype) mimetype = 'text/plain';

	var filename = root + pathname;
	if (fs.existsSync(filename)) {
		response.writeHead(200, {'Content-Type': mimetype});
		fs.createReadStream(filename).pipe(response);
	} else {
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('404: ' + pathname + ' not found');
		response.end();
	}
}

start();
//exports.start = start;
**/