import * as React from "react";

export class Tr  extends React.Component{
    render(){
        return(
            <tr onClick={this.props.onClick}>{this.props.children}</tr>
        )
    }
    
}
