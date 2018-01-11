var fs = require('fs');

// 文件是否存在(已废弃)
fs.exists('z.txt', function(bol) {
	console.log(bol);
});


// 文件是否存在/可访问
fs.access('z.txt', function(err) {
	console.log(err ? 'no access' : 'can read/write');
});


// 将文件相对路径转为绝对路径
fs.realpath('z.txt', function(err, path) {
	if (err) {
		console.error(err);
	} else {
		console.log(path);
	}
});


// 文件重命名
fs.rename('z.txt', 'zz.txt', function(err) {
	if (err) {
		console.error(err);
	}
});


// 读写文件流
var rs = fs.createReadStream('z.txt');
var ws = fs.createWriteStream('zz.txt');
rs.pipe(ws);


// 读目录 同步
var path = require('path');
var arr = [];

var files = fs.readdirSync(__dirname);
files.forEach(function(file) {
	if (path.extname(file) == '.txt') {
		arr.push(file);
	}
});
console.log(arr);


// 读目录 异步
fs.readdir(__dirname, function(err, files) {
	if (err) {
		throw err;
	}
	console.log('files: ', files);
});


// 读文件
fs.readFile('z.txt', 'utf-8', function(err, data) {
	if (err) {
		throw err;
	}
	console.log(data);
});


// 写文件  flag:a即append，flag:w即write
var data = 123123;
fs.writeFile('zz.txt', data, {
	flag: 'a'
}, function(err) {
	if (err) {
		throw err;
	}
});


// 删除文件
fs.unlink('zz.txt', function(err) {
	if (err) {
		console.error(err);
	}
});


// 监视文件变动 (不同平台不一致)
fs.watch('z.txt', (eventType, filename) => {
	console.log(`事件类型是： ${eventType}`);
	if (filename) {
		console.log(`提供的文件名 ${filename}`);
	} else {
		console.log(`未提供文件名`);
	}
});


// 监视文件变动 (不要监视太多，内存会暴涨)
fs.watchFile('z.txt', (current, previous) => {
	console.log(`the current mtime is: ${current.mtime}`);
	console.log(`the previous mtime was: ${previous.mtime}`);
});
