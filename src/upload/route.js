import React,{Suspense} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom';
import {lazy} from 'react'
const Auto = lazy(() => import('./autoUpload'));
const Manual = lazy(()=>import ('./manualUpload'));
const Upload = lazy(()=>import ('./index'));
export default (props)=>{
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Switch>
                <Route path={`${props.match.path}/auto`}  exact component={Auto}/>
                <Route path={`${props.match.path}/manual`} exact component={Manual}/>
                <Route path={`${props.match.path}`} exact component={Upload}/>
            </Switch>
        </Suspense>
    )
}