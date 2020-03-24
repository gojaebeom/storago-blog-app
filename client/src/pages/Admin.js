import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import * as base from '../Url';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const Admin = (props) => {

    const [projects, setProjects] = useState('');

    useEffect(()=>{
        projectAPI().then(res=>{
            setProjects(res.data);
        });
    },[setProjects]);

    const projectAPI = async ()=>{
        try{
            return await axios.get(`${base.url}/api/projects`);
        }catch(e){
            console.log(e);
        }
    }

    const projectRefresh = ()=>{
        projectAPI().then(res=>{
            setProjects(res.data);
        });
    }


    if(!props.isLogged) return <Redirect to="/"/>
    if(!projects) return <p>데이터 로딩중...</p>
    return (
        <>
            <StoreButton/>
            <ProjectTable projects={projects} projectRefresh={projectRefresh} totalRefresh={props.totalRefresh}/>
        </>
    );
};

export default Admin;

function StoreButton(){
    return(
        <Link to="admin/store">
            <Button style={{margin:20}} type="submit" variant="contained" color="primary">
                게시물 추가
            </Button>
        </Link>
    )
}

function ProjectTable(props){

    const useStyles = makeStyles({
        table: {
          minWidth:1000,
        },
      });
      
    const classes = useStyles();

    return(
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>게시번호</TableCell>
                    <TableCell>img</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>카테고리 번호</TableCell>
                    <TableCell>url</TableCell>
                    <TableCell>수정</TableCell>
                    <TableCell>삭제</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.projects.map(row => (
                    <ProjectTableBody
                        key={row.id}
                        id={row.id}
                        title={row.title}
                        category_id={row.category_id}
                        img={row.img}
                        url={row.url}
                        projectRefresh={props.projectRefresh}
                        totalRefresh={props.totalRefresh}
                    />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function ProjectTableBody(props){

    return(
        <TableRow>
            <TableCell>{props.id}</TableCell>
            <TableCell>
               {props.img ? <img style={{width:50, height:50, borderRadius:3}} src={base.url+props.img} alt="img"/> : <p>없음</p>} 
            </TableCell>
            <TableCell>{props.title}</TableCell>
            <TableCell>{props.category_id}</TableCell>
            <TableCell>{props.url}</TableCell>
            <TableCell>
                <EditButton id={props.id}/>
            </TableCell>
            <TableCell>
                <DestroyButton id={props.id} projectRefresh={props.projectRefresh} totalRefresh={props.totalRefresh}/>
            </TableCell>
        </TableRow>
    )
}

function EditButton(props){
    return(
        <Link to={"admin/edit/"+props.id}>
            <button>
                수정
            </button>
        </Link>
    )
}

function DestroyButton(props){
    const clickDestroy= async () =>{
        try{
            await axios.delete(`${base.url}/api/projects/${props.id}`)
            .then(()=>{
                props.projectRefresh();
                props.totalRefresh();
            });
        }catch(e){
            console.log(e);
        }
    }
    return(
        <button onClick={clickDestroy}>삭제</button>
    )
}


