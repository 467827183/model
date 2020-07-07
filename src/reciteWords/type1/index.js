import React,{useState,useEffect,createRef,useCallback} from 'react'
import style from './style.css'
import Timer from '../../component/time'
let arr=[];
let a = new Set();
export default (props)=>{
    const [data, setData] = useState(
        [{id:0,context:[{key:'A',value:'第1题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:1,context:[{key:'A',value:'第2题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:2,context:[{key:'A',value:'第3题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:3,context:[{key:'A',value:'第4题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:4,context:[{key:'A',value:'第5题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:5,context:[{key:'A',value:'第6题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:6,context:[{key:'A',value:'第7题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:7,context:[{key:'A',value:'第8题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:8,context:[{key:'A',value:'第9题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:9,context:[{key:'A',value:'第10题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}
            ,{id:10,context:[{key:'A',value:'第11题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]}]
    );
    const [value,setValue] = useState(null);
    const [errs,setErrs] = useState([]);
    const [errStatus,setErrStatus] = useState(false);
    const [currentErr,setCurrentErr] = useState(0);
    const [currentWords,setCurrentWords] = useState(0);
    const [numberStatus,setNumberStatus] = useState(true);
    const [finish,setFinish] = useState(false);
    const stopTime = createRef();
    //data请求的问题这些东西都是从单词本里面出来的，
    //传递id对象单词本里面的东西
    //技术问题：定时间暂停
    //限定时间没有操作记错，问题判断在哪
    useEffect(() => {
        judgeShow();
        if(errStatus&&currentErr>=errs.length){
            setErrStatus(false);
            a.forEach((item)=>{
                arr=arr.filter((items)=>{
                    return items.id!==item
                })
            });
            setErrs(arr);
            setCurrentErr(currentErr+1);
            a.clear();
        }
        if(currentWords>=data.length-1&&finish&&errs.length===0){
            setFinish(true);
            }
        if(currentWords>=data.length-1&&finish){
            //在这还得除非那个东西
            const r = window.confirm('是否进行下一阶段训练,选否则返回生词本');
            if(r){
                props.history.push('/homePage/reciteWords/2');
            }else{
                props.history.push('/homePage/newWords');
            }
        }
    }, [currentWords, errStatus, currentErr, judgeShow, errs.length, data.length, finish, props.history]);
    const handleClick=(item)=> {
        if(errStatus){
            //就说明进入的是错误复习逻辑
            if(!item.YN){
                stopTime.current.Stop();
                setValue(item);
                let err=errs[currentErr];
                if(JSON.stringify(errs).indexOf(JSON.stringify(err))===-1){
                    // 再次出错是不会进入这个循环的
                    arr.push(err);
                    setErrs(arr);
                }
                //xxx保存了错误题目
                //每做五道题到xx里面找题重新渲染页面，然后在继续之前的题目
                setNumberStatus(false);
                return alert('错误')
            }
            alert('正确');
            setCurrentErr(currentErr+1);
            if(numberStatus){
                a.add(errs[currentErr].id);
            }
            setValue(null);
            setNumberStatus(true);
            //再这发送请求下一题
            stopTime.current.Stop();
        }else{
            if(!item.YN){
                setValue(item);
                let err=data[currentWords];
                if(JSON.stringify(errs).indexOf(JSON.stringify(err))===-1){
                    arr.push(err);
                    setErrs(arr);
                }
                stopTime.current.Stop();
                return alert('错误')
            }
            alert('正确');
            judgeShow()
            // if(currentWords+1>=data.length&&errs.length===0&&!finish){
            //     const r = window.confirm('是否进行下一阶段训练,选否则返回生词本');
            //     if(r){
            //         props.history.push('/homePage/reciteWords/2');
            //     }else{
            //         props.history.push('/homePage/newWords');
            //     }
            // }
            if(currentWords!==0&&(currentWords+1)%5===0&&errs.length){
                setCurrentErr(0);
                //他现在
                //改变显示的题目
                setErrStatus(true);
            }
             setValue(null);
             if(currentWords!==data.length-1){
                setCurrentWords(currentWords+1);
             }
            //再这发送请求下一题
            stopTime.current.Stop();
        }
    };
    const judgeShow=(useCallback(()=>{
            const Remainder = data.length%5;//余数
            const integer= Math.floor(data.length/5);//整数
          if(currentWords+1>integer*5){
            //不是在这判断者最多改变状态
                if(currentWords+1-(integer*5)%Remainder===0){
                    //改变显示题目
                    setFinish(false);
                    setErrStatus(true);
                }
            }
    }));
    // judgeShow()
    const context=()=>{
        return  'adj,水的,水上的,水生的,水系的asdasdasdas';
    };
    //此地方需要接口 传递参数就是当前单词吧，
    //上面想法不对这个数据是根据背单词来的
    return (
        <div className={style['content']}>
            <header>单词回炉修炼1</header>
            <section>{`词义：${context()}`}</section>
            <section>请选择单词</section>
            <section className={style['timer']}>
                <Timer ref={stopTime}/>
            </section>
            <section className={style['wordsCenter']}>
                {
                    <ul>
                        {
                            errStatus?errs.length&&currentErr>=errs.length?errs[currentErr-1].context.map((item,index)=>(
                                <li onClick={()=>handleClick(item,index)} key={index} className={style['styleColor']} style={value ? {color:(item && item.YN) ? 'green' : 'red'} : {}}>{item.key}:{item.value}</li>
                            )):errs[currentErr].context.map((item,index)=>(
                                <li onClick={()=>handleClick(item,index)} key={index} className={style['styleColor']} style={value ? {color:(item && item.YN) ? 'green' : 'red'} : {}}>{item.key}:{item.value}</li>
                            )): data[currentWords].context.map((item,index)=>(
                                <li onClick={()=>handleClick(item,index)} key={index} className={style['styleColor']} style={value ? {color:(item && item.YN) ? 'green' : 'red'} : {}}>{item.key}:{item.value}</li>
                            ))
                        }
                    </ul>
                }
            </section>
        </div>
    )
}