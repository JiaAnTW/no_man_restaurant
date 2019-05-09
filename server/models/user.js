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

    Regist(req, res){ //add a new data
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
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
                username: req.body["username"],
                //image: (req.body["image"]==null)?null:this.Image(req.body["image"],"dish_"+new_id),
                password: req.body["password"]
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
    }

    Edit(req, res){ //add a new data
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
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
    }

    UpdateHistory(id,data){
        const set=new Promise((resolve,reject)=>{
            this.con.query('SELECT history FROM user WHERE id =?',id, function(err, rows) {
                if (err) {
                    return(err);
                }
                var history=rows;
                //console.log(history[0].history)
                //if(history[0].history==''){
                    history={
                        record:[]
                    };
                //}
                //else{
                   //history=JSON.parse(history[0].history);
                //}
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

    }

    AddBill(id,bill){    
        let data=JSON.stringify(bill);
        this.con.query('UPDATE user SET wait = ? WHERE id = ?', [data,id], function(err, rows) {
            if (err) {
                console.log(err)
                return(err);
            }
        })
        //this.UpdateHistory(id,data);
    }

}

