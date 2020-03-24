import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import '../css/form.scss';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as base from '../Url';

const Login = (props) => {

    const [login, setLogin] = useState({
        user_id:'',
        user_pw:'',
        log_state:'',
        log_Check:false
    });

    const {user_id, user_pw, log_state, log_Check} = login;

    const loginAPI = async()=>{
        try{
            const url = `${base.url}/api/login`;
            return await axios.post(url,{
                user_id,
                user_pw
            });
        }catch(e){
            console.log(e);
        }  
    }

    const submitForm = (e) =>{
        e.preventDefault();
        loginAPI()
        .then(res=>{
            if(res.data){
                setLogin({
                    ...login,
                    log_Check:true
                });
                window.sessionStorage.setItem('adminInfo',res.data);
                props.loginCheck(true);
            }
            else setLogin({
                ...login,
                log_state:'로그인 실패!'
            })
        })
    }

    const changeValue = (e) =>{
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }

    if(log_Check) return <Redirect to="/"/>
    return (
        <form onSubmit={submitForm}>
            <h1 className="formName">관리자 로그인</h1>
            <label htmlFor="user_id">관리자 ID</label>
            <input type="text" id="user_id" name="user_id" value={user_id} onChange={changeValue} />
            <label htmlFor="user_pw">관리자 PW</label>
            <input type="password" id="user_pw" name="user_pw" value={user_pw} onChange={changeValue} />
            <span className="log-state">{log_state}</span>
            <div className="button-wrap">
                <Button type="submit" variant="contained" color="primary">
                    로그인
                </Button>
            </div>
            
        </form>
    );
};

export default Login;