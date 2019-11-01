
import React,{Component} from 'react'
// 倒计时组件
import Button from '@material-ui/core/Button';
import style from './index.css'
let timer = null;
class TimeCountDown extends Component {
  constructor(props){
      super(props);
      this.state=({
          date: 0,
          time:'0:0:0',
          states:false

      })
  }
     promote=()=>{
        const {date} = this.state;
        let d = Math.floor((date / 3600) / 24);//天
        let g = Math.floor((date - d * 24 * 3600) / 3600);//小时
        let e = Math.floor((date - d * 24 * 3600 - g * 3600) / 60);//分
        let f = (date - g * 3600) % 60;//秒
             this.setState({
                 time: `${g}:${e}:${f}`,
                 date: date + 1,
                 states:false
             });
    };
//现在的想法是在操作回调协一个标识，如何操作加没操作不动，在别的地方判断didmount好像就行 ，如何判断用一个东西存着看看两次是否一样，20秒问题
    componentDidMount() {
        timer=setInterval(()=>this.promote(),1000);
        let noMove=0;
        document.body.onmousemove=function(){
            clearTimeout(noMove);
            noMove=setTimeout(function(){
                console.log(11111)//正常要20000
            },3000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        clearInterval(timer);
    }

    Stop=()=>{
      clearInterval(this.timer);
      clearInterval(timer);
      this.setState({
          states:true
      })
    };
    Open=()=>{
        const {states} = this.state;
        if(states){
            this.timer=setInterval(()=>this.promote(),1000);
        }
    };
    render() {
        const {time} = this.state;
         return(
             <div className={style['content']}>
                 <div className={style['time']}>{time}</div>
                 <div className={style['buttonBig']}>
                     <Button ariant="contained" onClick={()=>this.Stop()}>停止</Button>
                     <Button ariant="contained" onClick={()=>this.Open()} >开始</Button>
                 </div>
             </div>
         )
    }
}

export default TimeCountDown;