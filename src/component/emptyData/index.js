import * as React from 'react';
import * as style from './index.css';
export class EmptyData extends React.Component{
    static defaultProps={
        text:"暂无相关数据"
    }
    render(){
        if(!this.props.empty){
            return null;
        }
        let {styles={},text,contentText}=this.props;
        return(
            <div className={style["not_data_content"]} style={styles}>
                <div className={style["not_data_img"]}></div>
                <span className={style["not_data_text"]}>{text}</span>
                <span className={style["not_data_text"]}>{contentText}</span>
                {this.props.children}
            </div>
        )
    }
}