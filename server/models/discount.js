/* eslint-disable */
module.exports=class discount{
    constructor(){
        this.mysql=require("mysql");
        this.con=this.mysql.createConnection({//宣告menu的member data叫做con 
            host: "localhost",
            //host: "http://luffy.ee.ncku.edu.tw",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupB"
        });
    }

    Index(req, res){ //show all the data
        try{
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
        }catch(err){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Index: database connect error at "+time);
        }
        try{
            this.con.query('SELECT * FROM discount', function(err, rows) {
                if (err) {
                    return(err);
                }
                var data = rows;
                res.send(data);
            });
        }catch(err){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Index: Get data from database error at "+time); 
        }
    }

    Add(req, res){ //add a new data
        try{
        this.con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
        }catch(err){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Add: database connect error at "+time);
        }
        const getMaxId=()=>{
            var number=-1;
            this.con.query('SELECT MAX(`id`) FROM menu', function(err, results) {
                if (err) {
                    return(err);
                }
                number=results[0]["MAX(`id`)"];
                try{
                    startAdd(number+1);//因為js的非同步特性，我們必須要這樣呼叫
                }catch(err){
                    var dt=new Date();
                    const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
                    console.log("Menu/Add: Add data to database fail at "+time);
                }
            });
        }
        const startAdd=(new_id)=>{
            const data={
                id: new_id,
                reason: req.body["reason"],
                policy: req.body["policy"],
                con: req.body["condition"],
                x: req.body["x"],
                y: req.body["y"],
                selectA: req.body["selectA"],
                selectB: req.body["selectB"]
            };
            this.con.query('INSERT INTO menu SET ?', data, function(err, rows) {
                if (err) {
                    return(err);
                }
            });
        }
        try{
            getMaxId();//前面只是定義函式，我們還是要呼叫一次。
        }catch(error){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Add: Get max id from database fail at "+time);
        }
    }

    Edit(req, res){ //add a new data
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(err){
                var dt=new Date();
                const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
                console.log("Menu/Edit: database connect error at "+time);
        }
        const startAdd=()=>{
            const data={
                id: req.body["id"],
                reason: req.body["reason"],
                policy: req.body["policy"],
                con: req.body["condition"],
                x: req.body["x"],
                y: req.body["y"],
                selectA: req.body["selectA"],
                selectB: req.body["selectB"]
            };
            this.con.query('UPDATE menu SET ? WHERE id = ?', [data,data.id], function(err, rows) {
                if (err) {
                    return(err);
                }
            });
        }
        try{
            startAdd();
        }catch(error){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Edit: Update data to database fail at "+time);
        }
    }



    Delete(req, res){
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(err){
                var dt=new Date();
                const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
                console.log("Menu/Delete: database connect error at "+time);
        }
        try{
            this.con.query('DELETE FROM menu WHERE id = ?',req.body['id'],function(err, rows) {
            if (err) {
                return(err);
                }
            });
        }catch(err){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Delete: delete data fail at "+time);
        }
    }
}
