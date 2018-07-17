const router=require("express").Router();
let checkMessages=require("../service/messages");

var messages=[];

var users=[];

router.get('/',(req,res)=>{
    res.sendfile('index.html');
});

router.post('/new_user',(req,res)=>{
    users.push(req.body);
});

router.get('/users',(req,res)=>{
    res.json(users);
});

router.post('/new_message',(req,res)=>{
    checkMessages(messages);
    messages.push(req.body);
});

router.get('/messages',(req,res)=>{
    res.json(messages);    
});





module.exports=function(app){
    app.use(router);
};