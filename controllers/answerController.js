var dbConn=require('../config/db_config');



exports.giveanswer_get=(req,res)=>{
    res.render('answer_form',{title:'Give Answer page'});
  };

exports.giveanswer_post=(req,res)=>{
  console.log(req.body);
  const {content}=req.body;
  const em=req.session.user_sess;
  dbConn.query('INSERT INTO answers(question_id,content,email) VALUES (?,?,?)',[1,content,em],(error,results)=>{
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log("Answer Posted Successfully");
        res.redirect('/questionapp');
      }
  });
};
