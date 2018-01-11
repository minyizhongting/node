var express = require('express');
var qs = require('querystring');

var app = new express();

app.get('/index.html', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/index', function(req, res) {
	// console.log(req.query);
	res.send(req.query);
});

app.post('/login', function(req, res) {
	console.log(req.path);
	req.on('data', function(chunk) {
		console.log(chunk.toString());
		var qsObj = qs.parse(chunk.toString());
		res.send(qsObj);
	});
});

app.all('*', function(req, res) {
	// console.log(req.path);
	res.sendFile(__dirname + req.path);
});


app.listen(8888,function() {
	console.log('server success');
});






