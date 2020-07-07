// import reciteWords from '../reciteWords/route';
import upLoad from '../upload/route'
import LoginForm from '../login'
import main from '../mian';
export default [
    {
        path:'/login',
        component:LoginForm
    },
    {
        path:'/main',
        component:main
    },
    {
        path:'/upload',
        component:upLoad
    }
]