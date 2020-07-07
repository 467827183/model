import * as React from "react";
export class Td extends React.Component{
    render(){
        return(
            <td onClick={this.props.onClick} title={this.props.title}>
                {
                    this.props.value
                    ? this.props.value
                    : this.props.children
                }
            </td>
        )
    }
}
