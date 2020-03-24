//React or External library
import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

//My Component
import Header from './pages/Header';
import ContentBox from './pages/ContentBox';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProjectStore from './pages/ProjectStore';
import ProjectEdit from './pages/ProjectEdit';
import * as base from './Url';

//App Component : 최상위 컴포넌트
function App(){

    const [loginInfo, setLoginInfo] = useState({
        adminInfo:'',
        isLogged:false
    })
    const {adminInfo, isLogged} = loginInfo;

    const [total, setTotal] = useState({
        total:'',
        toyTotal:'',
        appTotal:'',
        myTotal:''
    });

    const totalAPI = async ()=>{
        try{
            return await axios.get(`${base.url}/api/projects_total`);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        totalAPI().then(res=>{
            const data = res.data;
            setTotal((total)=>({
                ...total,
                total:data[3].count,
                toyTotal:data[0].count,
                appTotal:data[1].count,
                myTotal:data[2].count
            }));
        });

        if(sessionStorage.getItem('adminInfo')){
            const admin = window.sessionStorage.getItem('adminInfo');
            setLoginInfo((loginInfo)=>({
                ...loginInfo,
                adminInfo:admin,
                isLogged:true
            }));
        }
    },[setTotal,setLoginInfo]);

    

    const totalRefresh = async () =>{
        totalAPI().then(res=>{
            const data = res.data;
            setTotal({
                ...total,
                total:data[3].count,
                toyTotal:data[0].count,
                appTotal:data[1].count,
                myTotal:data[2].count
            });
        });
    }

    const logout = async () =>{
        try{
            return await axios.get(`${base.url}/api/logout`);
        }catch(e){
            console.log(e);
        }
    }

    const loginCheck = (logCheck)=>{
        if(logCheck){
            const admin = window.sessionStorage.getItem('adminInfo');
            setLoginInfo({
                ...loginInfo,
                adminInfo:admin,
                isLogged:true
            });
        }else{
            window.sessionStorage.clear();
            setLoginInfo({
                ...loginInfo,
                adminInfo:'',
                isLogged:false
            });
            logout().then(res=>{
                console.log(res.data);
            })
        }  
    }
    const toyExplanation = 
    `이 홈페이지에서 다루는 Toy Project의 의미는 홈페이지 제작과는 별개로 작은 프로젝트들을 만들어보고, 
    실력을 향상시키는데 목적이 있습니다.`;
    const appExplanation = 
    `배운 기술등을 활용하여 만든 web Application을 분류한 페이지 입니다. 
    `;
    const oddsExplanation = `분류되지않는 여러 게시물들을 모아둔 페이지 입니다.`;
    const footer = '본 홈페이지는 React와 Express로 만들어졌습니다.';

    return(
        <div className="app">
            <Router>
                <header>
                    <Header
                        adminInfo={adminInfo}
                        isLogged={isLogged}
                        loginCheck={loginCheck}
                    />
                </header>
                <main>
                    <Route exact path="/">
                        {total ? <ContentBox total={total} footer={footer}/> : <ContentBox footer={footer}/>}
                    </Route>
                    <Route path="/toy">
                        <ContentBox params={1} explanation={toyExplanation}/>
                    </Route>
                    <Route path="/app">
                        <ContentBox params={2} explanation={appExplanation}/>
                    </Route>  
                    <Route path="/odds">
                        <ContentBox params={3} explanation={oddsExplanation}/>
                    </Route> 
                    <Route exact path="/admin">
                        <Admin isLogged={isLogged} totalRefresh={totalRefresh}/>
                    </Route>
                    <Route path="/admin/edit/:id" component={ ProjectEdit } />
                    <Route path="/admin/store">
                        <ProjectStore isLogged={isLogged} totalRefresh={totalRefresh}/>
                    </Route>
                    <Route path="/login">
                        <Login loginCheck = {loginCheck}/>
                    </Route>
                </main>
            </Router>
        </div>     
    )
}

export default App;

