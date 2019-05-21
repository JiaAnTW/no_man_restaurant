/* eslint-disable */
module.exports=class payController{
    constructor(){
        this.lineInfo={
            productName: "媽祖託夢器",
            amount: 1,
            confirmUrl: "loacalhost:8081/#/Home",
            currency: "TWD",
            orderId: 150,
            productImageUrl: "https://img5.cna.com.tw/www/WebPhotos/1024/20190418/337616899030.jpg",
            transactionId:0
        }
    }

    LinePay(req,res){
        var dt=new Date();
        var id='0'+dt.getFullYear()+(dt.getMonth()+1)+dt.getDate()+dt.getHours()+dt.getMinutes()+dt.getSeconds();
        const linePay = require("line-pay");
        const pay = new linePay({
            channelId: "1567873613",
            channelSecret: "7121812b7e2a57010730d79eedc3aa01",
            isSandbox: true
        });
        let reservation={
            productName: req.body.productName,
            amount: req.body.amount,
            confirmUrl: req.body.confirmUrl,
            currency: "TWD",
            orderId: id,
            productImageUrl: "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/18221834_1136737619771427_1060780281938077441_n.png?_nc_cat=102&_nc_ht=scontent-tpe1-1.xx&oh=4faa96ee84ba513ed60f1ade0a16ef42&oe=5D6D36F7",
        }
        pay.reserve(reservation).then((response) => {
            this.lineInfo.transactionId = response.info.transactionId;
            this.lineInfo.amount= 50;
            this.lineInfo.currency="TWD";
            let data={
                url:response.info.paymentUrl.web,
                transactionId: response.info.transactionId
            };
            res.send(data);
        })
    }
    LinePayConfirm(req,res){
        const linePay = require("line-pay");
        const pay = new linePay({
            channelId: "1567873613",
            channelSecret: "7121812b7e2a57010730d79eedc3aa01",
            isSandbox: true
        });
        let confirmation = {
            transactionId: this.lineInfo.transactionId,
            amount: req.body.amount,
            currency: this.lineInfo.currency
        }
        pay.confirm(confirmation).then((response) => {
            res.send(response.returnMessage);
            //var User = require( '../models/user.js');
            //User=new User();
            var bill={
                productName:this.lineInfo.productName,
                amount: this.lineInfo.amount,
                startTime: Date.now(),
                getTime: -1
            }
            //User.addBill(req.body.id,bill)
        })

    }
}