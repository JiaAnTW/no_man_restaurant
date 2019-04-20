
module.exports=class menu{
    constructor(){
    }

    Index(req, res){
        const mysql=require("mysql");
        const con=mysql.createConnection({
            host: "localhost",
            user: "uidd2019_groupb",
            password: "JjKxenffSYSbc546",
            database: "uidd2019_groupb"
        });
        con.connect(function(err) {
            if (err) {
                return('connecting error');
            }
        });
    
        con.query('SELECT * FROM menu', function(err, rows) {
            if (err) {
                return(err);
            }
            var data = rows;
            res.send(data);
        });
    }
}

