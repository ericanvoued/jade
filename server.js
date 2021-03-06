const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const pathLib = require('path');
const multer = require('multer');
const consolidate = require('consolidate')

// const ejs = require('ejs');
// const pug = require('pug');

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
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest:'./www/upload'}).any())
server.use('/upload', (req, res, next) => {

    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
    fs.rename(req.files[0].path,newName,function (err,data) {
        if(err){
            console.log(err)
        } else {
            console.log(data)
        }
    })
    console.log(req.query, req.body, req.cookies, req.session);
})

//配置模版引擎=>哪种模版引擎  ，模版文件的位置，输出的东西
//输出什么东西
server.set('view engine','html')
//模版文件放在哪
server.set('views', './views');
//哪种模版引擎
server.engine('html',consolidate.ejs)

//接收用户请求
server.get('/index',(req,res) =>{
    // if(req.session.userid){//登陆过
    //
    // }else {               //没有登陆
    //
    // }
    res.render('1.ejs',{name:'chen'})
})


//static
server.use(expressStatic('./www'))


































