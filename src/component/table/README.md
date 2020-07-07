###des 页面内通用的带有阴影的表格

```
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './index.css';

/**
 * table壳
 */
export class Table extends Component{
    render(){
        return(
            <table className={style["common-table"]}>
                {this.props.children}
            </table>
        )
    }
}

/**
 * table表头
 */
export class TableHeader  extends Component{
    render(){
        return(
            <thead className={style["table-thead"]}>
                <tr>
                    {this.props.children}
                    {this.getTh()}
                </tr>
            </thead>
        )
    }
    getTh(){
        let thArr=this.props.thArr||[];
        return thArr.map(function (th,key) {
            return(
                <th key={key}  title={th.name} style={{'width':th.width}}>
                    {th.name}
                </th>
            )
        })
    }
}

TableHeader.PropTypes={
    thArr:PropTypes.array
}

/**
 * table表格内容
 */
export class TableBody extends Component{
    render(){
        return(
            <tbody className={style["table-tbody"]}>
                {this.props.children}
                {this.getContent()}
            </tbody>
        )
    }
    getContent(){
        let {bodyData=[],tdArr=[]}  = this.props,self=this;
        return bodyData.map((item,key)=>{
            return(
                <TableTr {...self.props} clickEvent={id=>{this.handleClick(item.id)}} key={key} item={item} tdArr={tdArr}>
                    {
                        this.props.extRows ?
                            this.props.extRows[key] : null
                    }
                </TableTr>
            )
        })
    }
    // 行点击事件 确保数据流的行数据中有 id 字段 否则无法触发
    handleClick(id){
        let { clickEvent } = this.props;
        id && clickEvent && clickEvent(id)
    }
}

/**
 *table表格tr
 */
export class TableTr  extends Component{
    render(){
        return(
            <tr onClick={this.props.clickEvent}>
                {this.getTdContent()}
                {this.props.children}
            </tr>
        )
    }
    getTdContent(){
        let {tdArr=[],item} = this.props;
        return tdArr.map((td,key)=>{
            return(
                <td key={key} title={item[td]}  onClick={this.props.onClick}>{item[td]}</td>
            )
        })
    }
}

/**
 *table表格td
 */
export class TableTd extends Component{
    render(){
        return(
            <td>
                {this.props.children}
            </td>
        )
    }
}
```