/* eslint-disable */
module.exports=class menu{
    constructor(){
        this.mysql=require("mysql");
        this.con=this.mysql.createConnection({
            host: "localhost",
            //host: "http://luffy.ee.ncku.edu.tw",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupb"
        });
        this.Image=this.Image.bind(this);
    }

    Index(req, res){ //show all the data
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
    
        this.con.query('SELECT * FROM menu', function(err, rows) {
            if (err) {
                return(err);
            }
            var data = rows;
            //data.forEach(element => {
                //if(element.image!=null){
                    //console.log('../../src/assets/dish/'+element.image+'.png')
                    //const path='../../src/assets/dish/'+element.image+'.png';
                    //element.image=require(path);
                //}
            //});
            res.send(data);
        });
    }

    Add(req, res){ //add a new data
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
        const getMaxId=()=>{
            var number=-1;
            this.con.query('SELECT MAX(`id`) FROM menu', function(err, results) {
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
                name: req.body["name"],
                //image: (req.body["image"]==null)?null:this.Image(req.body["image"],"dish_"+new_id),
                image: req.body["image"],
                price: req.body["price"],
                detail: req.body["detail"]
            };
            this.con.query('INSERT INTO menu SET ?', data, function(err, rows) {
                if (err) {
                    return(err);
                }
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
                image: req.body["image"],
                price: req.body["price"],
                detail: req.body["detail"]
            };
            this.con.query('UPDATE menu SET ? WHERE id = ?', [data,data.id], function(err, rows) {
                if (err) {
                    return(err);
                }
            });
        }
        startAdd();
    }



    Delete(req, res){
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
        this.con.query('DELETE FROM menu WHERE id = ?',req.body['id'],function(err, rows) {
            if (err) {
                return(err);
            }
        });
    }

    Image(image,filename){
        var base64ToImage = require('base64-to-image');
        var base64Str = image;
        var path ='../../src/assets/';
        var optionalObj = {'fileName': filename, 'type':'png'};
        base64ToImage(base64Str,path,optionalObj);
        return(filename);  
    }
}

