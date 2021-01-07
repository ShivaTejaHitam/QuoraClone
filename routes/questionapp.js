var express = require('express');
var router = express.Router();
var user_controller=require('../controllers/userController');
var question_controller=require('../controllers/questionController');
var answer_controller=require('../controllers/answerController');
var comment_controller=require('../controllers/commentController');


router.get('/',comment_controller.comment_get);
router.post('/',comment_controller.comment_post);

router.get('/signup',user_controller.user_create_get);
router.post('/signup',user_controller.user_create_post);

router.get('/login',user_controller.user_login_get);
router.post('/login',user_controller.user_login_post);

router.get('/askquestion',question_controller.askquestion_get);
router.post('/askquestion',question_controller.askquestion_post);

router.get('/giveanswer',answer_controller.giveanswer_get);
router.post('/giveanswer',answer_controller.giveanswer_post);




module.exports = router;
