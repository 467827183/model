import React from 'react'

import {Route,Switch} from 'react-router-dom';
import login from './login'
import HomePage from './homePage/index'
import routers from './routers/router';
import {map} from 'lodash';
export default ()=>{
    return (
        <Switch>
            <Route path="/" exact component={login} />
            {
                map(routers,item=>(
                    <Route path={item.path} key={item.path} component={HomePage} />
                ))
            }
        </Switch>
    )
}