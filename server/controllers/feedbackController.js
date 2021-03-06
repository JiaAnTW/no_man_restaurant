module.exports=class feedbackController{
    Feedback(req,res){
        try{
            var Menu = require( '../models/menu.js');
            Menu=new Menu();
            //console.log(req)
            var data=Menu.GetFeedback(req.body.id)
            data.then((value)=>{
                res.send(value);
            })
            
        }catch(error){
            console.log("FeedbackController/Feedback error: "+error);
        }
    }

    Comment(req,res){
        try{
            var Menu = require( '../models/menu.js');
            Menu=new Menu();
            Menu.Comment(req.body.id,req.body.score,req.body.content);
        }catch(error){
            console.log("FeedbackController/Comment error: "+error);
        }
    }

    Reply(req,res){
        try{
            var Menu = require( '../models/menu.js');
            Menu=new Menu();
            Menu.Reply(req.body.id,req.body.index,req.body.content);
        }catch(error){
            console.log("FeedbackController/ Reply error: "+error);
        }
    }
}