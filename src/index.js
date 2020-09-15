import React from 'react'

import {Route,Switch,Redirect} from 'react-router-dom';
import router from './routers/router' 
export default ()=>{
    const onAuthorizedRoute = (Component) => props => {
    return  <Component {...props}/>
};
    return (
        <Switch>
        {
            router.map((item)=>{
                return  <Route key={item.path} path={item.path}  render={onAuthorizedRoute(item.component)}/>
            })
        }
        <Redirect from='/' to='/main'/>
        </Switch>
    )
}

