import * as XLSX from 'xlsx'
import React ,{useState,createRef}from 'react';
import datas from 'emoji-mart/data/messenger.json'
import { NimblePicker } from 'emoji-mart';
import style from './index.css'
class TimeScheduler {
  constructor() {
    this.events = [];
    this.orderCallStack = [];
    this.ownCallStack = [];
  }
  //添加执行栈函数，orderExec用于区别是顺序调用还是独立调用，注意同一个函数存在顺序调用和独立调用时需要add两次
  add(fn = () => {}, orderExec = false, timeout = 3) {
    let fnc;
    if (orderExec) {
      fnc = () => {
        setTimeout(() => {
          fn();
          this.next();
        }, timeout * 1000)
      };
    } else {
      fnc = () => {
        setInterval(() => {
          fn()
        }, timeout * 1000)
      };
    }
    this.events.push({
      fnc,
      orderExec
    })
  }
  remove(fnc = () => {}) {
    this.events = this.events.filter(item => item.fnc === fnc);
  }
  clear() { //清除存储数据及清空调用栈
    this.events = [];
    this.orderCallStack.forEach(item => {
      clearTimeout(item.fnc);
    });
    this.ownCallStack.forEach(item => {
      clearInterval(item.fnc);
    });
    this.ownCallStack = [];
    this.orderCallStack = [];
  }
  start() { //开始执行
    this.orderCallStack = this.events.filter(item => !!item.orderExec);
    this.ownCallStack = this.events.filter(item => !item.orderExec);
    this.ownCallStack.forEach(item => item.fnc());
    this.next();
  }
  stop() { //停止执行
    this.orderCallStack.forEach(item => {
      clearTimeout(item.fnc);
    });
    this.ownCallStack.forEach(item => {
      clearInterval(item.fnc);
    });
    this.ownCallStack = [];
    this.orderCallStack = [];
  }
  next() { //顺序调用栈执行函数
    console.log(this.orderCallStack,'sjo')
    let obj = this.orderCallStack.shift() || {};
    if (obj.fnc) {
      this.orderCallStack.push(obj);
      obj.fnc();
    }
  }
}
let a = () => {
  console.log("a");
}
let b = () => {
  console.log("b");
}
let c = () => {
  console.log("c");
}
const timeScheduler1 = new TimeScheduler();
timeScheduler1.add(a, true, 5);
timeScheduler1.add(b, true, 3);
timeScheduler1.add(c, true, 7);
timeScheduler1.start();

export default ()=>{
  const [data,setData] = useState([])

  function cloneobject (target){
    if(typeof target === 'object'){
      let box ={}
      for (const i in target){
        box[i] = cloneobject(target[i])
      }
      return box
    }else{
      return target
    }
  }






  let str = "I? love ?? the ?great ? ?wall in ?beijing"
  const filter = (str)=>{
    const reg1 = /[\?][a-z]/g
    const reg2 = /\?/g
    const reg3 = /\s\s*/g

   //找到符合规律的字母并转换成大写
    const fontToUpperCase = ()=>{
      const b =str.match(reg1)
      b.map((item,key)=>{
        const cs = item[1].toUpperCase()
        str = str.replace(item,cs)
      })
    }
    //将问号转换成空格
    const transformation2 = () =>{
      str = str.replace(reg2,'')
    }
    //将多个空格转换为单个空格
    const transformation = () =>{
      str = str.replace(reg3,' ')
    }
    const init=()=>{
      fontToUpperCase()
      transformation2()
      transformation()
    }
    init()
    return str
  }
  console.log(filter(str),'filter()')

    const onImportExcel=(file)=>{
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        setData(data)
        console.log(data);
        // console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        console.log('文件类型不正确');
        return;
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  }
    return (
        <div>
            {/*<div className={style["box"]}>*/}
            {/*    <div className={style["box-left"]} ></div>*/}
            {/*    <div className={style["box-right"]}>xxxxxxxxxxx</div>*/}
            {/*</div>*/}
          <form method="post" action="http://localhost:8100" encType="multipart/form-data">

            选择文件:
            <input type="file" name="f1"/> input 必须设置 name 属性，否则数据无法发送<br/>
            <br/>
            标题：<input type="text" name="title"/><br/><br/><br/>

            <button type="submit" id="btn-0">上 传</button>

          </form>
            {/*<Picker title='Pick your emoji…' emoji='point_up' />*/}
            {/*<Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />*/}
            {/*<Picker i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />*/}
          上传机构名称表:
          {/*<input type='file' accept='.xlsx,.xls' onChange={onImportExcel}/><br/>*/}
          {/*上传机构名称表:*/}
          {/*<input type='file' accept='.xlsx,.xls' onChange={onImportExcel}/><br/>*/}
          {/*上传机构名称表:*/}
          {/*<input type='file' accept='.xlsx,.xls' onChange={onImportExcel}/><br/>*/}
          {/*上传机构名称表:*/}
          {/*<input type='file' accept='.xlsx,.xls' onChange={onImportExcel}/><br/>*/}
        </div>
    )
}