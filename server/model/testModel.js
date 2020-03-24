const db = require('../dbConnect');

/**@TestModel */

exports.all = function(){
    const queryString = "select * from Customer where isDeleted = ?";
    return db.query(queryString,[0]);
}