const db = require('../dbConnect');

/**@TestModel */

exports.all = function(){
    const queryString = "select * from projects where isDeleted = ?";
    return db.query(queryString,[0]);
}

exports.find = function(id){
    const queryString = "select * from projects where isDeleted = ? and id=?";
    return db.query(queryString,[0,id]);
}

exports.store = function(img,title,url,download_url,video_url,comment,category_id){
    const queryString = 
    "insert into projects(img, title, url,download_url,video_url,comment, category_id, created_at, updated_at, isDeleted ,isLiked) values(?,?,?,?,?,?,?,now(),now(),0,0)";
    return db.query(queryString,[img,title,url,download_url,video_url,comment,category_id]);
}

exports.edit = function(img,title,url,download_url,video_url,comment,category_id,id){
    const queryString ="update projects set img=?, title=?, url=?, download_url=?,video_url=?, comment=?, category_id=?, updated_at=now() where id=?";
    return db.query(queryString,[img,title,url,download_url,video_url,comment,category_id,id]);
}

exports.destroy = function(id){
    const queryString = "update projects set deleted_at = now(), isDeleted = 1 where id =?";
    return db.query(queryString,[id]);
}

exports.category_join_all = function(){
    const queryString = "select p.id, p.title, p.img, p.comment, p.url, p.video_url, p.updated_at, p.isLiked , p.category_id, p.download_url, c.name from projects p left join categories c on p.category_id = c.id where p.isDeleted = 0 order by updated_at DESC";
    return db.query(queryString);
}

exports.category_join_find = function(id){
    const queryString = "select p.id, p.title, p.img, p.comment, p.url, p.video_url, p.updated_at , p.isLiked , p.category_id, p.download_url, c.name from projects p left join categories c on p.category_id = c.id where p.category_id = ? and p.isDeleted = 0 order by updated_at DESC";
    return db.query(queryString,[id]);
}

exports.likeEdit = function(liked , id){
    const queryString ="update projects set isLiked=? where id=?";
    return db.query(queryString,[liked,id]);
}

exports.likeFind = function(id){
    const queryString = "select isLiked from projects where id=?";
    return db.query(queryString, [id]);
}

exports.total = function(){
    const queryString = `select category_id, count(*) as count from projects where isDeleted = '0' group by category_id with rollup`;
    return db.query(queryString);
}