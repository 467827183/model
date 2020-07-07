import * as React from 'react';
import * as style from './style.css';
export  class NetWorkError extends React.Component {
    render() {
        if (this.props.error) {
            return (
                <div className={style["network-error"]}>
                    {"网络错误，请稍后"}
                    <span className={style["fresh"]} onClick={this.props.onFresh}>重试</span>
                </div>
            )
        }
        return null;
    }
}