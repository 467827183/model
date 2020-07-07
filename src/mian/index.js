import React from 'react';
import {Link,Switch,Redirect,Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ReciteWords from '../reciteWords';
import upload from '../upload/route';
import Table from '../table'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar:{
        height:'8%'
    },
    ul:{
        display:'flex'
    },
    li:{
        height: '50px',
        textAlign: 'center',
        lineHeight: '50px',
        width: '300px'
    },
    a:{
        display:'block',
        width: '100%',
        height:'100%',
        color:'white'
    }

}));
//table暂时封印，有需要拿出来在修改
const listArray=[
    {title:'上传',link:'/main/upload'},
    {title:'搜索',link:'/main/upload'},
    {title:'文档',link:'/main/reciteWords'},
    {title:'背单词',link:'/main/reciteWords'},
    {title:'生词本',link:'/main/newWords'},
];
export default ()=> {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <ul className={classes.ul}>
                    {
                        listArray.map((item,key)=>{
                            return <li className={classes.li} key={key}> <Link className={classes.a} to={`${item.link}`}>{item.title}</Link></li>
                        })
                    }
                </ul>
            </AppBar>
            <Switch>
                <Route path="/main/upload" component={upload} />
                <Route path="/main/reciteWords" component={ReciteWords} />
                <Route path="/main/table" component={Table} />
                <Redirect to="/main/upload"/>
            </Switch>
        </div>
    );
}