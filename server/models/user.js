/* eslint-disable */
module.exports=class user{
    constructor(){
        this.mysql=require("mysql");
        this.con=this.mysql.createConnection({
            //host: "localhost",
            host: "luffy.ee.ncku.edu.tw",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupB"
        });
        
    }
    Login(req,res){
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });

        var da=req.body['username'];
        this.con.query('SELECT * FROM user WHERE username =?',da, function(err, rows) {
            if (err) {
                res.send({state:"登入失敗",token:null});
                console.log(err);
                return(err);
            }
        
            var data = rows;
            const user={
                id: data.id,
                username: data.username,
                password: data.password
            }
            const jwt=require('jsonwebtoken');
            const token=jwt.sign({ user, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, 'my_key');
            res.send({state:"登入成功",token:token});
        });
    }

    Index(req, res){ //show all the data
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
    
        var token=req.body['token'];
        if (token) {
            const jwt=require('jsonwebtoken');
            jwt.verify(token, 'my_key', function (err, decoded) {
              if (err) {
                res.send({state:"warning"})
              } else {
                req.decoded = decoded;
                res.send({state:"你是會員"})
              }
            })
        }
        else {
            res.send({state:"尚未登入"})
          }
    
    }

}

