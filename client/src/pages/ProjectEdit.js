import React, {useState, useEffect, useCallback} from 'react';
import '../css/form.scss';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as base from '../Url';
import { Redirect } from 'react-router-dom';


export default function ProjectEdit({match,totalRefresh}){
    const [success, setSuccess] = useState(false);
    const [project, setProject] = useState({
        title:'',
        created_at:'',
        updated_at:'',
        comment:'',
        category_id:'',
        url:'',
        download_url:'',
        fileName:'',
        file:null
    });

    const projectFind = useCallback(async ()=>{
        try{
            return await axios.get(`${base.url}/api/projects/${match.params.id}`);
        }catch(e){
            console.log(e);
        }  
    },[match.params.id]);



    useEffect(()=>{
        projectFind().then(res=>{
            const data = res.data[0];
            console.log(data);
            setProject((project)=>({
                ...project,
                title:data.title,
                created_at:data.created_at,
                updated_at:data.updated_at,
                comment:data.comment,
                category_id:data.category_id,
                url:data.url,
                video_url:data.video_url,
                download_url:data.download_url,
            }));
        });
    },[setProject,projectFind]);

    const projectUpdate = async () =>{
        try{
            const url = `${base.url}/api/projects`;
            const formData = new FormData();
                formData.append("id", match.params.id);
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
            return await axios.put(url,formData,config);
        }catch(e){
            console.log(e);
        }
    }

    const submitForm = e =>{
        e.preventDefault();
        projectUpdate().then((res)=>{
            setSuccess(true);
        });
    }


    const changeValue = (e) =>{
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


    //if(!isLogged) return <Redirect to="/"/>
    if(success) return <Redirect to="/admin"/>
    if(!project) return <p>데이터 로딩중...</p>
    return(
        <form onSubmit={submitForm}>
            <h1 className="formName">게시물 수정</h1>
            <label htmlFor="file">이미지 추가</label>
            <input type="file" id="file" name="file" file={project.file} value={project.fileName} onChange={changeFile}/> 
            <label htmlFor="title">제목</label>
            <input type="text" id="title" name="title" value={project.title} onChange={changeValue}/>
            <label htmlFor="created_at">생성 날짜(수정불가)</label>
            <input type="text" id="created_at" value={project.created_at} readOnly/>
            <label htmlFor="updated_at">수정 날짜(수정불가)</label>
            <input type="text" id="updated_at" value={project.updated_at} readOnly/>
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
                    수정
                </Button>
            </div>
        </form>
    )
}