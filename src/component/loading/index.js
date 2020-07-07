/**
 * Created by GuYang on 2017/6/29.
 */
import * as React from 'react';
import * as  style from './style.css';

export class Loading extends React.Component {
    render() {
        if (this.props.loading) {
            return (
                <div className={style["loading"]}>加载中。。。</div>
            )
        }
        return null;
    }
}