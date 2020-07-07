import React from "react";
import commonRequest from "../../helper/commonRequest";
const { showPorintBox, cancelPorintBox } = stararcUI;

const styleCss={position: "absolute",color: "#0095e2",cursor: "pointer"}
let timerFlag = '',
    // 请求查询计数器
    timeOutCounts=0,
    // 请求查询最大次数
    MAX_REQS=20;

export class ExportFile extends React.Component{
    state={exporting:false}

    onClickHandle=()=>{
        const {api:{path='',method=''},params={},alias='report_path'} = this.props,{exporting}=this.state;
        if(exporting){return};

        this.setState(({exporting})=>({exporting:!exporting}),()=>{
            commonRequest(path, method, params, 'get').then((res)=>{
                if(res.ret == '0'){
                    let url = res.data[alias];

                    check_exist_path(url,(res)=>{
                        res && downloadfile(res,false);
                        this.setState(({exporting})=>({exporting:!exporting}))
                    })
                }else{
                    showPorintBox({ text:res.msg, type:'error'});
                    setTimeout(()=>{cancelPorintBox()},3000);
                    this.setState(({exporting})=>({exporting:!exporting}))

                }

            })
        });
    }
    render(){
        const {right="20px",top="10px",text='导出'} = this.props;

        return <span style={{...styleCss, right, top}} onClick={this.onClickHandle}>
            <img style={{verticalAlign:'sub'}} src={require("../../imageSource/export.png")}/> {!this.state.exporting?text:"导出中,请稍候..."}
        </span>
    }
    componentWillUnmount(){
        if(timerFlag){
            clearTimeout(timerFlag)
        }
    }
    init(){
        console.log(99999)
        this.setState({exporting:false});
        timeOutCounts=0;
        if(timerFlag){clearTimeout(timerFlag)};
    }
}

/**
     * 判断文件是否存在
     * @return {[type]} [description]
     */
    const check_exist_path=(url='',callback)=>{
        if(timeOutCounts>=MAX_REQS){
            clearTimeout(timerFlag);
            timeOutCounts=MAX_REQS;
            showPorintBox({ text:'导出文件超时', type:'error'});
            callback(null);
            return;
        }else{
            timeOutCounts++
        }

        commonRequest(API_INSURE_URL,'/index/exists_path',{url},'get').then((result)=>{
            if(result.ret == '0'){
                clearTimeout(timerFlag)
                callback(url)
            }else{
                timerFlag = setTimeout(()=>{check_exist_path(url,callback)},2000)
            }
        });
    }

//下载函数
function downloadfile(url,target=false,download=false) {
    console.log(url,download,'download')
    let aElem = document.createElement("a");
    aElem.href = url;
    aElem.style.display = "none";

    if(download){
        aElem.download = "download"
    }
    
    aElem.target=target?"_blank":'';

    fireClickEvent(aElem,url);
}
/**
 * 触发单击事件
 * @param elem 需要触发事件的DOM对象
 */
function fireClickEvent(elem,url){
    let event="";
    
    if(window.MouseEvent) {
        event = new MouseEvent('click');
    }else{
        event = document.createEvent('MouseEvents');
        event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    elem.dispatchEvent(event);
}