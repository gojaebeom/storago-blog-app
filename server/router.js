const express = require("express");
const Router = express.Router();
const testController = require("./controller/testController");
const userController = require("./controller/userController");
const projectController = require("./controller/projectController");
const multer = require('multer');//파일을 중복되지 않게 해줌
const upload = multer({dest:'./upload'})




Router.get("/api/customer", testController.index);

//관리자 로그인 api
Router.post("/api/login", userController.find);
Router.get("/api/logout", userController.out);

//프로젝트 api
Router.get("/api/projects", projectController.index);
Router.get("/api/projects/:id", projectController.find);
Router.post("/api/projects", upload.single("file"), projectController.store);
Router.put("/api/projects", upload.single("file"), projectController.put);
Router.delete("/api/projects/:id", projectController.destroy);

Router.get("/api/projects_total", projectController.total);
Router.get("/api/projects_join_category", projectController.join_index);
Router.get("/api/projects_join_category/:id", projectController.join_find);
Router.put("/api/projects_like", projectController.liked_edit);


Router.get( ["/","/toy","/app","/login","/admin","/admin/store","/admin/edit/:id"] , (req, res)=>{
    res.sendFile(__base +"/build/index.html");
})
Router.get("/welcome", (req, res)=>{
    res.sendFile(__base +"/public/welcome.html");
})


module.exports = Router;