import React from 'react';
import {Link,Switch,Redirect,Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ReciteWords from '../reciteWords';
import NewWords from '../newWords';
import HeaderLogin from  '../header';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar:{
        height:50
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
const listArray=[
    {title:'首页',link:'/homePage/reciteWords'},
    {title:'课程',link:'/homePage/reciteWords'},
    {title:'文档',link:'/homePage/reciteWords'},
    {title:'背单词',link:'/homePage/reciteWords'},
    {title:'生词本',link:'/homePage/newWords'},
];
export default function SimpleTabs() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HeaderLogin/>
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
                <Route path="/homePage/newWords" component={NewWords} />
                <Route path="/homePage/reciteWords" component={ReciteWords} />
                <Redirect to="/homePage/newWords"/>
            </Switch>
        </div>
    );
}