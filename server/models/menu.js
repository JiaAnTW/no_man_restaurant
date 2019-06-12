/* eslint-disable */
module.exports=class menu{
    constructor(){
        this.mysql=require("mysql");
        this.con=this.mysql.createConnection({//宣告menu的member data叫做con 
            host: "localhost",
            //host: "http://luffy.ee.ncku.edu.tw",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupB"
        });
        this.Image=this.Image.bind(this);
        this.GetFeedBack=this.GetFeedback.bind(this)
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
            this.con.query('SELECT * FROM menu', function(err, rows) {
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
                name: req.body["name"],
                //image: (req.body["image"]==null)?null:this.Image(req.body["image"],"dish_"+new_id),
                image: req.body["image"],
                price: req.body["price"],
                detail: req.body["detail"],
                type: req.body["type"]
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
                name: req.body["name"],
                image: (req.body["image"]==null)?null:this.Image(req.body["image"],"dish_"+req.body["id"]),
                image: req.body["image"],
                price: req.body["price"],
                detail: req.body["detail"],
                type: req.body["type"]
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

    Image(image,filename){
        var base64ToImage = require('base64-to-image');
        var base64Str = image;
        var path ='../../src/assets/';
        var optionalObj = {'fileName': filename, 'type':'png'};
        base64ToImage(base64Str,path,optionalObj);
        return(filename);  
    }

    Comment(id,score,content){
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(err){
                var dt=new Date();
                const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
                console.log("Menu/Comment: database connect error at "+time);
        }
        console.log("get "+content)
        const startAdd=()=>{
            var dt=new Date();
            const data={
                feedback:{
                    comment:{
                        date:dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate(),
                        score: score,
                        content: content
                    },
                    reply:{
                        date:null,
                        content: null                    
                    }
                }
            };
            data.feedback=JSON.stringify(data.feedback)
            this.con.query('UPDATE menu SET ? WHERE id = ?', [data,id], function(err, rows) {
                if (err) {
                    console.log(err)
                    return(err);
                }
            });
        }
        try{
            startAdd();
        }catch(error){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Comment: Update data to database fail at "+time);
            console.log(error)
        }
    }

    GetFeedback(id){
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(err){
                var dt=new Date();
                const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
                console.log("Menu/GetFeedback: database connect error at "+time);
                console.log(error)
        }
        try{
            //console.log("id is "+id)
            const getData=new Promise((resolve)=>{
                var output;
                this.con.query('SELECT feedback FROM menu WHERE id =?',id, function(err, rows) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if(rows[0].feedback){
                        var data = JSON.parse(rows[0].feedback);
                        resolve(data);
                    }
                    else
                        resolve(null);
                });
            })
            return getData;
        }catch(error){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/GetFeedback: get data error at "+time);
            console.log(error)
        }
    }


    Reply(id,content){
        try{
            this.con.connect(function(err) {
                if (err) {
                    return('connecting error');
                }
            });
        }catch(err){
                var dt=new Date();
                const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
                console.log("Menu/Reply: database connect error at "+time);
        }
        console.log("get "+content)
        const startAdd=(data)=>{
            var dt=new Date();
            data.feedback.reply.date=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
            data.feedback.reply.content=content;
            data.feedback=JSON.stringify(data.feedback)
            this.con.query('UPDATE menu SET ? WHERE id = ?', [data,id], function(err, rows) {
                if (err) {
                    console.log(err)
                    return(err);
                }
            });
        }
        try{
            this.getData.then((value)=>{startAdd(value);})
        }catch(error){
            var dt=new Date();
            const time=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate()+"/"+dt.getHours()+"/"+dt.getMinutes();
            console.log("Menu/Reply: Update data to database fail at "+time);
            console.log(error)
        }
    }
}

