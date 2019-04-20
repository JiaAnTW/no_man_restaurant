/* eslint-disable */
module.exports=class menu{
    constructor(){
        this.mysql=require("mysql");
        this.con=this.mysql.createConnection({
            host: "localhost",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupb"
        });
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
            res.send(data);
        });
    }

    Add(req, res){ //add a new data
        console.log(req.body)
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
                image: req.body["image"],
                price: req.body["price"]
            };
            this.con.query('INSERT INTO menu SET ?', data, function(err, rows) {
                if (err) {
                    return(err);
                }
            });
        }
        getMaxId();//前面只是定義函式，我們還是要呼叫一次。
    }

    Delete(req, res){
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
        this.con.query('DELETE FROM menu WHERE id = 999',function(err, rows) {
            if (err) {
                return(err);
            }
        });
    }
}

