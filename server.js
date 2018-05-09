const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const pug = require('pug');

var server = express();

server.listen(8081)


/**
 * 使用cookie
 * 使用session
 * post数据
 * static参数
 */

server.use(cookieParser('dsadasdasdas'))

var arr = [];
for (var i = 0; i < 100000; i++) {
    arr.push('keys_' + Math.random())
}
server.use(cookieSession({
    name: 'my_session',
    keys: arr,
    maxAge: 20 * 3600 * 1000
}))

//post
server.use(bodyParser.urlencoded({extended: false}))
server.use('/', (req, res, next) => {

    console.log(req.query, req.body, req.cookies, req.session);
})


//static
server.use(status('./www'))


































