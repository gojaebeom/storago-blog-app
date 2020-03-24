const db = require('../dbConnect');

/**@TestModel */

exports.find = function(user_id, user_pw){
    const queryString = "select * from users where user_id = ? and user_pw = ?";
    return db.query(queryString,[user_id, user_pw]);
}