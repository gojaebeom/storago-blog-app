const projectModel = require("../model/projectModel");

exports.index = async (req, res)=>{
    try{
        let project_all = await projectModel.all();
        res.send(project_all);
    }catch(e){
        console.log(e);
    }
}

exports.find = async (req, res)=>{
    try{
        console.log(req.params);
        let project_find = await projectModel.find(req.params.id);
        res.send(project_find);
    }catch(e){
        console.log(e);
    }
}

exports.store = async (req, res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        let image;
        if(req.file === undefined){
            image = null;
        }else{
            image = '/image/'+ req.file.filename;
        }
        const title = req.body.title;
        const url = req.body.url;
        const download_url = req.body.download_url;
        const video_url = req.body.video_url;
        const comment = req.body.comment;
        const category_id=req.body.category_id;
        await projectModel.store(image,title,url,download_url,video_url,comment,category_id);
        res.send(true);

    }catch(e){
        console.log(e);
    }
}

exports.put = async (req, res)=>{  
    try{
        console.log(req.file);
        console.log(req.body);
        let image;
        if(req.file === undefined){
            image = "";
        }else{
            image = '/image/'+ req.file.filename;
        }
        const id = parseInt(req.body.id);
        const title =req.body.title;
        const category_id = req.body.category_id;
        const url = req.body.url;
        const download_url = req.body.download_url;
        const video_url = req.body.video_url;
        const comment =req.body.comment;
        await projectModel.edit(image,title,url,download_url,video_url,comment,category_id,id);
        res.send(true);
    }catch(e){
        console.log(e);
    }
}

exports.destroy = async (req, res)=>{
    try{
        console.log(req.params.id);
        await projectModel.destroy(req.params.id);
        res.send("삭제성공");
    }catch(e){
        console.log(e);
    }
}

exports.join_index = async (req, res)=>{
    try{
       let projects_join_category = await projectModel.category_join_all();
       res.send(projects_join_category);
    }catch(e){
        console.log(e);
    }
}

exports.join_find = async (req, res)=>{
    try{
       console.log(req.params);
       let projects_join_category = await projectModel.category_join_find(req.params.id);
       res.send(projects_join_category);
    }catch(e){
        console.log(e);
    }
}

exports.liked_edit = async (req, res)=>{
    try{
        console.log(req.body);
        const id = req.body.id;
        const liked = req.body.liked;
        await projectModel.likeEdit(liked, id);
        res.send(true);
    }catch(e){
        console.log(e);
    }
}

exports.total = async (req, res)=>{
    try{
        const total = await projectModel.total();
        console.log(total);
        res.send(total);
    }catch(e){
        console.log(e);
    }
}