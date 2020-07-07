import React ,{useState,createRef}from 'react';
import {reqLogin} from '../ajax';
import style from './index.css'
import {LoginForm} from './login'
export default (props)=> {
    const login =({username, password})=>{
      //在这进行路由跳转
      //收集表单数据发送请求，请求成功跳转到主页，并将用户信息存储到localstorage里面
        props.history.push('/main')
    }
    return (
        <div>
            <div className={style['header']}>
                <p className={style['header—font']}>某某公司后台管理系统</p>
            </div>
            <div className={style['content']}>
                <LoginForm login={login}/>
            </div>
        </div>
    )
}


