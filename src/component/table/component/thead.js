import * as React from "react";
import * as style from "./style.css";

export class Thead  extends React.Component{
    render(){
        const {thArr=[],children,render}=this.props;
        console.log(thArr,children,render,222)
        return(
            <thead className={style["table-thead"]}>
                {
                    thArr.length
                    ? this.renderTh()
                    :children?children:render()
                }
            </thead>
        )
    }

    renderTh(){
        let thArr=this.props.thArr||[];
        const ths =  thArr.map(function (th,key) {
            return(
                <th key={key}  title={th.name} style={{'width':th.width}}>
                    {th.name}
                </th>
            )
        })
        return <tr>{this.props.children}{ths}</tr>
    }
}
