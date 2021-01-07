var dbConn=require('../config/db_config');



exports.askquestion_get=(req,res)=>{
    res.render('question_form',{title:'Ask Question page'});
  };

exports.askquestion_post=(req,res)=>{
    console.log(req.body);
    const {content}=req.body;
    const em=req.session.user_sess
    console.log("The current user is "+em);
    dbConn.query('INSERT INTO questions(content,email) VALUES (?,?)',[content,em],(error,results)=>{
        if(error)
        {
          console.log(error);
        }
        else
        {
          console.log("Question Posted Successfully");
          return res.render('index',{message:'Question Posted successfully'});
        }
    });
  };