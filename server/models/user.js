/* eslint-disable */
module.exports=class user{
    constructor(){
        this.mysql=require("mysql");
        this.con=this.mysql.createConnection({
            host: "localhost",
            //host: "luffy.ee.ncku.edu.tw",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupB"
        });
        this.UpdateHistory=this.UpdateHistory.bind(this)
    }
    Login(req,res){
        try{
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
        }catch(err){
            
        }
        try{
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
        }catch(error){
            
        }
    }

    Index(req, res){ //show all the data
        try{
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
        }catch(error){

        }
    }

    Regist(req, res){ //add a new data
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(error){

        }
        try{
            const getMaxId=()=>{
                var number=-1;
                this.con.query('SELECT MAX(`id`) FROM user', function(err, results) {
                    if (err) {
                        return(err);
                    }
                    number=results[0]["MAX(`id`)"];
                    startAdd(number+1);//因為js的非同步特性，我們必須要這樣呼叫
                });
            }
            const startAdd=(new_id)=>{
                const data={
                    id: new_id,
                    username: (req.body["username"])?req.body["username"]:null,
                    //image: (req.body["image"]==null)?null:this.Image(req.body["image"],"dish_"+new_id),
                    password: (req.body["password"])?req.body["password"]:null,
                    phone: (req.body["phone"])?req.body["phone"]:null
                };
                this.con.query('INSERT INTO user SET ?', data, function(err, rows) {
                    if (err) {
                        return(err);
                    }
                    else
                        res.send('註冊成功')
                });
            }
            getMaxId();//前面只是定義函式，我們還是要呼叫一次。
        }catch(error){

        }
    }

    Edit(req, res){ //add a new data
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(error){

        }
        try{
            const startAdd=()=>{
                const data={
                    id: req.body["id"],
                    name: req.body["name"],
                    //image: (req.body["image"]==null)?null:this.Image(req.body["image"],"dish_"+req.body["id"]),
                    photo: req.body["image"],
                };
                console.log(data)
                this.con.query('UPDATE user SET name = ? WHERE id = ?', [data.name,data.id], function(err, rows) {
                    if (err) {
                        return(err);
                    }
                });
                this.con.query('UPDATE user SET photo = ? WHERE id = ?', [data.photo,data.id], function(err, rows) {
                    if (err) {
                        return(err);
                    }
                });
            }
            startAdd();
        }catch(error){

        }
        
    }

    History(req,res){
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(error){

        }
        try{
            const id=req.body.id
            this.con.query('SELECT history FROM user WHERE id =?',id, function(err, rows) {
                if (err) {
                    res.send({state:"fail",data:null});
                    //console.log(err);
                    return;
                }
                var data = JSON.parse(rows[0].history);
                //console.log(data.record);
                res.send({state:"success",data: data.record});
            });            
        }catch(error){

        }
        
    }

    Wait(req,res){
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(error){

        }
        try{
            const id=req.body.id
            this.con.query('SELECT history FROM user WHERE id =?',id, function(err, rows) {
                if (err) {
                    res.send({state:"fail",data:null});
                    console.log(err);
                    return;
                }
                var data = JSON.parse(rows[0].history);
                //console.log(data.record);
                res.send({state:"success",data: data.record[data.record.length-1]});
            });
        }catch(error){

        }

    }

    UpdateHistory(id,data){
        try{
            var history={};
            const set=new Promise((resolve,reject)=>{
                this.con.query('SELECT history FROM user WHERE id =?',id, function(err, rows) {
                    if (err) {
                        return(err);
                    }
                    //console.log(history[0].history)
                    if(rows[0]===null){
                        history={
                            record:[]
                        };
                    }
                    else{
                       history=JSON.parse(rows[0].history);
                    }
                    history.record.push(data);
                    history=JSON.stringify(history)
                    resolve(history)
                })
            });
            set.then((history)=>{
                console.log(history)
                this.con.query('UPDATE user SET history = ? WHERE id = ?', [history,id], function(err, rows) {
                    if (err) {
                        return(err);
                    }
                })
                this.con.query('UPDATE user SET wait = ? WHERE id = ?', ['',id], function(err, rows) {
                    if (err) {
                        return(err);
                    }
                })
            });
        }catch(error){

        }


    }

    AddBill(id,bill){
        try{
            let data=JSON.stringify(bill);
            this.con.query('UPDATE user SET wait = ? WHERE id = ?', [data,id], function(err, rows) {
                if (err) {
                    console.log(err)
                    return(err);
                }
            })
        }catch(error){

        }    
    }

}

