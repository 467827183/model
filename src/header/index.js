import React from "react";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    content:{
        height:'70px',
        width:'100%'
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
export default (props)=>{
    const classes = useStyles();
    return(
        <div className={classes.content}>
            登陆
        </div>
    )
}