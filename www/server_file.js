const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const pathLib = require('path');

var objMulter = multer({dest: './www/upload/'});
var server = express();

server.use(objMulter.any())


server.use(bodyParser({extended: false}))
server.post('/', function (req, res) {
    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
    fs.rename(req.files[0].path,newName,function (err,data) {
       if(err){
           console.log(err)
       } else {
           console.log(data)
       }
    })
    console.log(req.files)
})

server.listen(8083)

