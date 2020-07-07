import * as React from "react";
import * as style from "./style.css";

export class Table extends React.Component{
    render(){
        let {className=''}=this.props;
        const classes = [style["common-table"],className].join(" ");
        return(
            <table className={classes}>
                {this.props.children}
            </table>
        )
    }
}