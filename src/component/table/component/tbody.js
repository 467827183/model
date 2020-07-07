import * as React from "react";
import * as style from "./style.css";

export class Tbody extends React.Component{
    render(){
        return(
            <tbody className={style["table-tbody"]}>
                {this.props.children}
            </tbody>
        )
    }
    
}