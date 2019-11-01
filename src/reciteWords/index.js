import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom';
import type1 from "./type1";
import type2 from "./type2";
import type3 from "./type3";
import type4 from "./type4";
import type5 from "./type5";
export default (props)=>{
    return (
        <Switch>
            <Route path={`${props.match.path}/1`} component={type1}/>
            <Route path={`${props.match.path}/2`} component={type2}/>
            <Route path={`${props.match.path}/3`} component={type3}/>
            <Route path={`${props.match.path}/4`} component={type4}/>
            <Route path={`${props.match.path}/5`} component={type5}/>
            <Redirect  to={`${props.match.path}/1`}/>
        </Switch>
    )
}