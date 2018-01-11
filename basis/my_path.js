var path = require('path');

// eg: 文件路径为 C:\Users\user\Desktop\temp\z.txt
var p = __dirname + '\z.txt';

console.log(p);

// 文件名
console.log('basename: ', path.basename(p)); // z.txt

// 文件路径
console.log('dirname: ', path.dirname(p)); // C:\Users\user\Desktop\temp

// 文件扩展名
console.log('extname: ', path.extname(p)); // .txt

// 文件路径组合
console.log('format: ', path.format({dir:'C:\\path\\dir', base: 'file.txt'})); // C:\path\dir\file.txt

// 文件路径分解
console.log('parse: ', path.parse('C:\\path\\dir\\file.txt')); 
// {
// 	root: 'C:\\',
// 	base: 'file.txt',
// 	ext: '.txt',
// 	name: 'file'
// }

// 是否是绝对路径
console.log('isAbsolute: ', path.isAbsolute(p)); // true

// 路径组合
console.log('join: ', path.join('/foo', 'bar', 'baz/asdf', '../abc')); // \foo\bar\baz\abc

// 规范化路径
console.log('normalize: ', path.normalize(p)); // C:\Users\user\Desktop\temp\z.txt

// 从from路径到to路径的相对路径
console.log('relative: ', path.relative('/data/a/b/bbb', '/data/a/c/ccc')); // ..\..\c\ccc

// 类似cd命令
console.log('resolve: ', path.resolve('/foo', '/bar', 'baz')); // C:\bar\baz 

// 路径分隔符，在linux是 /，在windows上是 \
console.log('sep: ', path.sep);	// \

// path设置的分隔符，在linux是 :，在windows上是 ;
console.log('sep: ', path.delimiter); // ;

