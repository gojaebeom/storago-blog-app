const mysql = require("mysql");
const dbInfo = require("./config.json");
//.config파일은 .gitignore에 의해 업로드 되지 않으니 config.json파일을 만들어 db정보를 입력하자

const connection = mysql.createConnection({
    host:dbInfo.host,
    user:dbInfo.user,
    password:dbInfo.password,
    database:dbInfo.database,
    port:dbInfo.port,
    dateStrings:'date'
})

exports.query = function(query, params){
    return new Promise((resolve, reject)=>{
        connection.query(query, params, function(err, result){
            if(err) reject(err);
            else resolve(result);
        });
    });
}

