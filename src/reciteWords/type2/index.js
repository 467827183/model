import React,{useState,useEffect,createRef} from 'react'
import style from './style.css'
import Timer from '../../component/time'
  function App(props){
    const [data, setData] = useState([[{key:'A',value:'acd',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}],[{key:'A',value:'第二题',YN:true},{key:'B',value:'acd',YN:false},{key:'C',value:'bcd',YN:false},{key:'D',value:'scd',YN:false}]]);
    const [value,setValue] = useState(null);
    const [currentWords,setCurrentWords] = useState(0);
    const stopTime = createRef();

    //data请求的问题这些东西都是从单词本里面出来的，
    //传递id对象单词本里面的东西
    //技术问题：定时间暂停
    //限定时间没有操作记错，问题判断在哪
    useEffect(() => {
        setValue(null);
        if(currentWords>=data.length){
            const r = window.confirm('是否进行下一阶段训练,如果选否将会重制题目');
            if(r){
                props.history.push('/homePage/reciteWords/3');
               console.log(props,'props')
            }else{
                setCurrentWords(0)
            }
        }
    }, [currentWords, data.length, props]);
     const handleClick=(item,index)=> {
         if(!item.YN){
             setValue(item);
             stopTime.current.Stop();
             return alert('错误')
         }
         alert('正确');
         setCurrentWords(currentWords+1);
         //再这发送请求下一题
         stopTime.current.Stop();
    };
    const context=()=>{
        return  'adj,水的,水上的,水生的,水系的asdasdasdas';
    };
    //此地方需要接口 传递参数就是当前单词吧，
    //上面想法不对这个数据是根据背单词来的

    return (
        <div className={style['content']}>
            <header>单词回炉修炼2</header>
            <section>{`词义：${context()}`}</section>
            <section>请选择单词</section>
            <section className={style['timer']}>
                <Timer ref={stopTime}/>
            </section>
            <section className={style['wordsCenter']}>
            {
                <ul>
                    {
                        data[data[currentWords]?currentWords:currentWords-1].map((item,index)=>(
                            <li onClick={()=>handleClick(item,index)} key={index} className={style['styleColor']} style={value ? {color:(item && item.YN) ? 'green' : 'red'} : {}}>{item.key}:{item.value}出自行车自行车自行车自行车自行车</li>
                        ))
                    }
                </ul>
            }
            </section>
        </div>
    )
}
export default function Counter() {
    const [count, setCount] = useState(0);
   
    useEffect(() => {
        const id = setInterval(() => {
            
            setCount(count=>{
             
                return count+1});
        }, 1000);
        return ()=>{
            clearInterval(id)
        }
    },[]);
    document.body.addEventListener('onClick',  (event) => {
        const eventFix = getEvent(event);
        console.log(eventFix,'eventFix')
        if (!eventFix) {
            return;
        }
        this._handleEvent(eventFix);
    }, false)
    const handle=()=>{
        console.log(111)
    }
    return <h1 onClick={handle}>{count}</h1>;
}