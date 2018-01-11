// eg: C:\Users\user\Desktop\temp\z.js

console.log('__filename: ', __filename); // C:\Users\user\Desktop\temp\z.js

console.log('__dirname: ', __dirname); // C:\Users\user\Desktop\temp



var path = require('path');

console.log('path.dirname: ', path.dirname(__dirname + '\\a\\b.html')); // C:\Users\user\Desktop\temp\a\b.html

console.log('path.basenme: ', path.basename(__filename)); // z.js

console.log('path.basenme: ', path.basename(__filename, '.js')); // z



var url = require('url');

var x = 'http://www.zuche.com/order/aa.html?a=1&b=2#haha';

console.log('url.parse: ', url.parse(x)); // 若传第二个参数true，则query会变为对象

// Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.zuche.com',
//   port: null,
//   hostname: 'www.zuche.com',
//   hash: '#haha',
//   search: '?a=1&b=2',
//   query: 'a=1&b=2',
//   pathname: '/order/aa.html',
//   path: '/order/aa.html?a=1&b=2',
//   href: 'http://www.zuche.com/order/aa.html?a=1&b=2#haha'
// }



var qs = require('querystring');

var y = 'name=bh&age=28&sex=female';

console.log('qs.parse: ', qs.parse(y)); // { name: 'bh', age: '28', sex: 'female' }


