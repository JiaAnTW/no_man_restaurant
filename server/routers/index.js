/* eslint-disable */
//Main
var Menu = require( '../models/menu.js');
const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const port=8081;
app.listen(port);
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8')
    res.send(html)
})

console.log("Start running UIDD2019 noman resturant app at: [ localhost:"+port+" ]")


//api
Menu=new Menu();
app.get('/api/get/menu', Menu.Index)
