import React, {Component} from "react";
import style from "./index.css";
import SubTitle from "../subTitle";
import fmt from "../fmt-date";
// import {ExportFile} from '../export-file';
// const {BigImg}=stararcUI;
// const apiObj = {
//     path: "API_INSURE_URL",
//     method: '/company_project/att_zip'
// };

export class DetailComponent extends Component {
    setDetail=(data={})=>{
        const {detailObj,detail,imgTitle,state,wrap} = this.props
        return detailObj.map((item,index)=>{
            return (
                <NetLayout
                    state={state}
                    key={index}
                    labelName={`${item.name}：`}
                    // content={data[item.label]}
                    noData={item.noData}
                    detail={detail}
                    img={item.img}
                    width={item.width}
                    imgTitle={item.imgTitle}
                    stamp={item.stamp}
                    month={item.month}
                    wrap={wrap}
                    last={item.last}
                    children={item.children}
                    height={item.height}
                />
            )
        })
    };
    render() {
        let {detail = {},title,state,subtitle='',downLoad=false} = this.props;
        return (
            <div className={style["detail-content"]}>
            {
                downLoad? <div className={style["detail-download"]}>
                    {/* <ExportFile
                        api={apiObj}
                        params={{id}}
                        alias={'path'}
                        text={'资料下载'}
                       /> */}
                       xxx
            </div>:null
            }            
                <SubTitle title={title} state={state}  subtitle={subtitle} styleCss={{marginBottom: "15px",fontWeight: "bold"}}/>
                {this.setDetail(detail)}
            </div>
        )
    }
}
class NetLayout extends Component {

    render(){
        let {width = "50%", minWidth = "auto",detail=null,type} = this.props;
        let styleCss = {width, minWidth};
        // let url = this.props.detail.id?this.props.detail[imgTitle]:[];
        let url = []
        if(!url){
            url=[]
        }
        return (
            <div style={styleCss} title={this.props.content} className={style[wrap?"net_noLayout":"net_layout"]}>
                {this.props.labelName ?
                    <label ref={ele=>this.netLabel=ele}> {this.props.labelName}</label> : null}
                {
                    detail?fontTemplete[type](this.props):''
                }
            </div>
        );
    }

}
const big_img=(imgArr = [], index)=> {
    let newImgArr = [];
    imgArr = imgArr || [];
    imgArr.map((img) => {
        newImgArr.push({
            id: img.attachment_id,
            path: img.attachment_path
        })
    });
    // BigImg(newImgArr, index);
};
const fontTemplete = {
    img:({detail,imgTitle})=>{
        let url = detail[imgTitle];
        return url.map((l, key) => {
            return (
                <img className={style["attachment-img"]} key={key} src={l.thumbnail_path}
                     onClick={e => big_img(url, key)}/>
            )
        })
    },
    text: ({content,last,noData})=>{
        return <span className={last?style['net_layout-noWrap']:style['net_layout-wrap']}>
                    {content?content:noData}
               </span>
    },
    date: ({content,last,noData,temp})=> {
        return <span className={last?style['net_layout-noWrap']:style['net_layout-wrap']}>
                    {content?fmt(content,temp):noData}
               </span>
    },
}