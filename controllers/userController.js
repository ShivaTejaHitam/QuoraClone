const dbConn=require('../config/db_config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

exports.user_create_get=(req,res)=>{
  res.render('user_form',{title:'SignUp page',message:''});
};

exports.user_create_post= (req,res)=>{
    console.log(req.body);
    const {email,FirstName,LastName,PASSWORD,confirmpassword,Bio}=req.body;
    dbConn.query('SELECT email FROM users WHERE email=?',[email],async (error,results)=>{
      if(error)
      {
        console.log(error);
      }
      
      if(results.length > 0)
      {
          return res.render('user_form',{message:'User with this email already exists'});
      }

      else if(PASSWORD!==confirmpassword)
      {
        return res.render('user_form',{message:'Password and Confirm Password do not match'});
      }

      let hashedPassword=await bcrypt.hash(PASSWORD,8);
      console.log(hashedPassword);

      dbConn.query('INSERT INTO users SET ?',{email:email,FirstName:FirstName,LastName:LastName,PASSWORD:hashedPassword,Bio:Bio},(error,results)=>{
          if(error)
          {
            console.log(error);
          }
          else
          {
            return res.render('user_form',{message:'User is successfully registered'});
          }

      });
    }); 
};

exports.user_login_get=(req,res)=>{
  res.render('user_login',{title:'login page',message:''});
};

exports.user_login_post=async (req,res)=>{
  try{

      const {email,PASSWORD}=req.body;

      dbConn.query('SELECT * FROM users WHERE email=?',[email],async(error,results)=>{

        console.log(results);
        if(!results || !(await bcrypt.compare(PASSWORD,results[0].PASSWORD)))
        {
            res.status(401).render('user_login',{message:'Invalid Email Or Password'});
        }
        else
        {
          req.session.user_sess=results[0].email;
          console.log("Session created "+req.session.user_sess);
          res.redirect('/questionapp');
        }
      });
  }
  catch(error){
    console.log(error);
  }
};











