/* eslint-disable */

//Prepare for required stuffs
const bodyParser=require('body-parser');
const cors=require('cors');
const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const port=8081;

app.listen(port);
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//view
app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8')
    res.send(html)
})

console.log("Start running UIDD2019 noman resturant app at: [ localhost:"+port+" ]")

//api
var Menu = require( '../models/menu.js');
Menu=new Menu();
app.get('/api/get/menu', (...args)=> Menu.Index(...args));
app.post('/api/post/add', (...args)=> Menu.Add(...args));
app.put('/api/post/edit', (...args)=> Menu.Edit(...args));
app.delete('/api/post/menu', (...args)=> Menu.Delete(...args));


var feedback = require( '../controllers/feedbackController.js');
feedback =new feedback();
app.post('/api/get/feedback', (...args)=> feedback.Feedback(...args));
app.post('/api/post/comment', (...args)=> feedback.Comment(...args));
app.post('/api/post/reply', (...args)=> feedback.Reply(...args));




var User = require( '../models/user.js');
User=new User();
app.post('/api/post/login', (...args)=> User.Login(...args));
app.post('/api/post/index',(...args)=> User.Index(...args));
app.post('/api/post/user/edit',(...args)=> User.Edit(...args));
app.post('/api/post/user/regist',(...args)=> User.Regist(...args));
app.post('/api/get/user/history',(...args)=> User.History(...args));
app.post('/api/get/user/wait',(...args)=> User.Wait(...args));


var Pay = require( '../controllers/payController.js');
Pay=new Pay();
app.post('/api/post/pay', (...args)=> Pay.LinePay(...args));
app.post('/api/post/pay/confirm', (...args)=> Pay.LinePayConfirm(...args));
app.post('/api/post/pay/test', (...args)=> Pay.payTest(...args));



