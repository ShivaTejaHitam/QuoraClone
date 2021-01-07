var dbConn=require('../config/db_config');



exports.comment_get=(req,res)=>{
    
    dbConn.query('SELECT questions.content as QC,answers.content as AC FROM questions INNER JOIN answers ON questions.question_id=answers.question_id LIMIT 1',(error,results)=>{
      if(error)
      {
        console.log(error);
      }
      else{
        var resu=results;
        return res.render('index',{title:'Give Comment page',resu:resu});
      }
    });

};

exports.comment_post=(req,res)=>{
  console.log(req.body);
  const {content}=req.body;
  const em=req.session.user_sess
  dbConn.query('INSERT INTO comments(content,answer_id,email) VALUES (?,?,?)',[content,1,em],(error,results)=>{
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log("comment Posted Successfully");
        res.redirect('/questionapp');
      }
  });
};