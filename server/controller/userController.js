const userModel = require("../model/userModel");

exports.find = async (req, res)=>{
    try{
        console.log(req.body);
        const user_id = req.body.user_id;
        const user_pw = req.body.user_pw;
        let user_find = await userModel.find(user_id, user_pw);
        if(user_find[0]){
            const sess = req.session;
            sess.username = user_find[0].name
            console.log(sess);
            res.send(sess.username);
        }else{
            console.log("잘못된 로그인 입니다!");
            res.send(false);
        }
    }catch(e){
        console.log(e);
    }
}

exports.out = function(req, res){
    req.session.destroy(function(err){
        req.session;
     });
     res.send(true);
}