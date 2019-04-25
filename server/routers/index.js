/* eslint-disable */

//Prepare for required stuffs
var Menu = require( '../models/menu.js');
const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const port=8081;
app.listen(port);
app.use(express.static(path.resolve(__dirname, '../../dist')));

//view
app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8')
    res.send(html)
})

console.log("Start running UIDD2019 noman resturant app at: [ localhost:"+port+" ]")

//api
Menu=new Menu();
app.get('/api/get/menu', (...args)=> Menu.Index(...args));
app.post('/api/post/add', (...args)=> Menu.Add(...args));
//app.post('/api/post/add', function(req,res){
    //console.log(req.body["name"])
//});

const line_pay = require("line-pay");

const pay = new line_pay({
    channelId: "1567873613",
    channelSecret: "7121812b7e2a57010730d79eedc3aa01",
    isSandbox: true
});
 

app.post("/pay", pay.middleware({
    productName: "媽祖託夢器",
    amount: 1,
    confirmUrl: "loacalhost:8081/#/Home",
    currency: "TWD",
    orderId: "9487",
}), (req, res, next) => {
    // Now payment should have been completed.
    res.send("Payment has been completed.");
});