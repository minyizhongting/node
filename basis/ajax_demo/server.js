var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(request,response){
	var pathname = url.parse(request.url).pathname;
	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			console.log(err);
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data.toString());
		}
		response.end();
	})
	
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");