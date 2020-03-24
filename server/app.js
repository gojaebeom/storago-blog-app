const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const method_override = require("method-override");//put, delete 사용하기 위한 모듈
const session = require("express-session");
const cors = require("cors");

global.__base = __dirname + '/';


//정적파일을 다루는 경로 설정
app.use('/image',express.static('./upload'));
app.use('/public',express.static('./public'));
app.use(express.static('./build'));


//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//rest full api 중 put, delete 기능을 사용하기위해 
//form에선 get,post밖에 사용할 수없지만 모듈을 추가시켜 put,delete사용가능
app.use(method_override('_method'));

//cors
app.use(cors());
// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     next();
// });

//session
app.use(session({
    secret:"@#@$MYSIGN#@$#$",
    resave:false,
    saveUninitialized:true
}));

//라우팅관리
const route = require("./router");
app.use("/", route);


const port = 4000;
app.listen(port, ()=>console.log(`server is running on ${port}`));