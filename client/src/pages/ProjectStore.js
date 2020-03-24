import React, {useState} from 'react';
import '../css/form.scss';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import * as base from '../Url';

export default function ProjectEdit({isLogged,totalRefresh,match}){
    const [success, setSuccess] = useState(false);
    const [project, setProject] = useState({
        title:'',
        comment:'',
        category_id:'',
        url:'',
        video_url:'',
        download_url:'',
        fileName:'',
        file:null
    });

    const projectAdd = async () =>{
        try{
            const url = `${base.url}/api/projects`;
            const formData = new FormData();
                formData.append("file", project.file);
                formData.append("title", project.title);
                formData.append("comment", project.comment);
                formData.append("url", project.url);
                formData.append("video_url", project.video_url);
                formData.append("download_url", project.download_url);
                formData.append("category_id", project.category_id);
                const config = {
                    headers:{
                        'content-type':'multipart/form-data'
                    }
                }
            return await axios.post(url,formData,config);
        }catch(e){
            console.log(e);
        }
    }

    const submitForm = e =>{
        e.preventDefault();
        projectAdd().then(()=>{
            setSuccess(true);
            totalRefresh();
        });
    }

    const changeValue = e =>{
        setProject({
            ...project,
            [e.target.name]:e.target.value
        })
    }

    const changeFile =(e)=>{
        setProject({
            ...project,
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    if(!isLogged) return <Redirect to="/"/>
    if(success) return <Redirect to="/admin"/>
    return(
        <form onSubmit={submitForm}>
            <h1 className="formName">게시물 추가</h1>
            <label htmlFor="file">이미지 추가</label>
            <input type="file" id="file" name="file" file={project.file} value={project.fileName} onChange={changeFile}/>
            <label htmlFor="title">제목</label>
            <input type="text" id="title" name="title" value={project.title} onChange={changeValue}/>
            <label htmlFor="comment">내용</label>
            <textarea name="comment" id="comment" rows="5" value={project.comment} onChange={changeValue}/>
            <label htmlFor="url">URL</label>
            <input type="text" id="url" name="url" value={project.url} onChange={changeValue}/>
            <label htmlFor="video_url">video_URL</label>
            <input type="text" id="video_url" name="video_url" value={project.video_url} onChange={changeValue}/>
            <label htmlFor="download_url">download_URL</label>
            <input type="text" id="download_url" name="download_url" value={project.download_url} onChange={changeValue}/>
            <label htmlFor="category_id">카테고리</label>
            <select name="category_id" id="category_id" value={project.category_id} onChange={changeValue}>
                <option value="">카테고리 선택</option>
                <option value="1">토이프로젝트</option>
                <option value="2">어플리케이션</option>
                <option value="3">잡동사니</option>
            </select>

            <div className="button-wrap">
                <Button type="submit" variant="contained" color="primary">
                    추가
                </Button>
            </div>
        </form>
    )
}