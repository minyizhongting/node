var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var server = http.createServer(function(req,res) {

	var urlObj = url.parse(req.url);
	// console.log(urlObj);

	if (urlObj.pathname == '/index.html') {

		var rs = fs.createReadStream('./index.html');
		rs.pipe(res);
	
	} else if (urlObj.pathname == '/index') {	// get
		
		console.log(urlObj.query);
		res.write(urlObj.query);
		res.end();

	} else if (urlObj.pathname == '/login') {	// post
		
		req.on('data', function(chunk) {

			var qsObj = qs.parse(chunk.toString());
			console.log(qsObj);
			if (qsObj.user == '11' && qsObj.pass == '22') {
				res.write('user success');
				res.end();
			} else {
				res.write('user failed');
				res.end();
			}

		})

	} else {

		res.end('error page');

	}

	// res.end();

});

server.listen(8888, function() {
	console.log('server success');
});


