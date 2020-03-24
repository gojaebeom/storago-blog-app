import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/contentBox.scss';
import '../css/totalBox.scss';
import '../css/explanationBox.scss';
import * as base from '../Url';

/*****************  Home   ********************/
export default function ContentBox(props){
    const [projects, setProjects] = useState('');
    
    const ProjectAPI = useCallback(async ()=>{
        try{
            if(props.params)  return await axios.get(`${base.url}/api/projects_join_category/${props.params}`)
            else  return await axios.get(`${base.url}/api/projects_join_category`)      
        }catch(e){
            console.log(e);
        }
    },[props.params]);

    useEffect(()=>{
        ProjectAPI().then(res=>{
            setProjects(res.data);
        });
    },[setProjects, ProjectAPI]);


    // const ProjectAPI = async ()=>{
    //     try{
    //         if(props.params)  return await axios.get(`${base.url}/api/projects_join_category/${props.params}`)
    //         else  return await axios.get(`${base.url}/api/projects_join_category`)      
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

    const changeLiked = async (id, liked)=>{
        await axios.put(`${base.url}/api/projects_like`,
        liked===0 ? {id,liked:1} : {id,liked:0})
        .then(res=>{
            ProjectAPI().then(res=>{
                setProjects(res.data);
            });
        })
    }

    return(
        <>
            {
                props.total ?
                <div className="total-back-wrap">
                    <div className="total-wrap">
                        <p>{props.total.total}</p>
                        <h1>총 게시물</h1>
                    </div>
                    <div className="total-wrap">
                        <p>{props.total.toyTotal}</p>
                        <h1>토이프로젝트</h1>
                    </div>
                    <div className="total-wrap">
                        <p>{props.total.appTotal}</p>
                        <h1>어플리케이션</h1>
                    </div>
                    <div className="total-wrap">
                        <p>{props.total.myTotal}</p>
                        <h1>잡동사니</h1>
                    </div>
                </div>
                : null  
            }
            {
                props.explanation ? 
                <div className="explanation-wrap">
                    {props.explanation}
                </div>
                : null
            }
            {projects ?
            projects.map(data=>{
                return(
                    <ContentBoxChild
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        url={data.url}
                        down_url={data.download_url}
                        video_url={data.video_url}
                        img={data.img}
                        comment={data.comment}
                        category={data.name}
                        category_id={data.category_id}
                        updated_at={data.updated_at}
                        changeLiked={changeLiked}
                        liked={data.isLiked}
                    />
                )
            })
        : 
        <p className="loading-wrap">
            <i className="ri-send-plane-2-fill"></i>
            데이터 로딩중...
        </p>
        }
        {
            props.footer ? <footer>{props.footer}</footer> : null
        }

        </>
    )
}

/*****************  ContentBox    ********************/
const ContentBoxChild = (props) => {

    const clickAlert= () =>{
        alert('다운로드 받을 파일이 없습니다!');
    }

    return (
        <div className="content-wrap">
        <div className="top-wrap">
            <div className="title-wrap">
                <span>{props.title}</span>
            </div>
            <div className="category-wrap">
                {
                props.category_id === 1 &&
                <Link to="/toy">
                    <i className="ri-attachment-2"></i>{props.category}
                </Link>
                }
                {
                props.category_id === 2 &&
                <Link to="/app">
                    <i className="ri-attachment-2"></i>{props.category}
                </Link>
                }
                {
                props.category_id === 3 &&
                <Link to="/odds">
                    <i className="ri-attachment-2"></i>{props.category}
                </Link>
                }
            </div>
        </div>

        <div className="date-wrap">{props.updated_at}</div>

        <div className="comment-wrap">
            {props.comment}

            <div className="link-wrap">
                <span><a href={props.url}  rel="noopener noreferrer" target="_blank">{props.url}</a></span>
            </div>
            
        </div>
        {
            props.img ?
            <div className="img-wrap">
                <img src={base.url+props.img} alt="img"/>
                
            </div>  
            : null
        }
        {
        props.video_url ? 
            <div className="video-wrap">
                <video controls width="90%">
                    <source src={props.video_url} type="video/mp4"/>
                </video>
            </div>
            : null
        }
        <div className="bottom-wrap">
            <LikeButton 
                changeLiked={props.changeLiked} 
                liked={props.liked} 
                id={props.id}
            />
            { props.down_url ?
                <a href={props.down_url} download>
                    <i title="다운로드" className="ri-download-cloud-fill"></i>
                </a>
                :
                <i title="다운로드" className="ri-download-cloud-fill" onClick={clickAlert}></i>
            }
            
        </div>
    </div>
    );
};

const LikeButton = ({liked, changeLiked, id})=>{

    const clickHeartBtn = () =>{
        changeLiked(id, liked);
    }

    return(
        <span title="마음만 받는 하트" onClick={clickHeartBtn}>
            { liked===0 ? <i className="ri-heart-fill"></i>:<i className="ri-heart-add-fill"></i> }
        </span>
    )
}

