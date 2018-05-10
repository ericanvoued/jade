const express = require('express');
const mysql = require('mysql')

var server = express()

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3306',
    password:'123qwe',
    database:'20180511'
})

db.query("SELECT * FROM 'user_table';",  (err,data)=>{
    if(err){
        console.log('失败了')
    }else {
        console.log('成功了')
    }
})


//mulu1: /user/
var routeUser = express.Router();

routeUser.get('/1.html',function (req,res) {  //http://localhost:8084/user/1,html
    res.send('user1')
})

routeUser.get('/2.html',function (req,res) {  //http://localhost:8084/user/2,html
    res.send('user2')
})


server.use('/user',routeUser)


//mulu2 /article

var routeArtical = express.Router();



routeArtical.get('/1',function (req,res) { //http://localhost:8084/artical/1
    res.send('article')
})

server.use('/artical', routeArtical)


server.listen(8084)


