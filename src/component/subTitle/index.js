import React, {Component} from 'react';
import style from './index.css';

/**
 * 子模块头部
	<SubTitle title={"保险产品基本信息"}></SubTitle>
 * 
 */
export default class SubTitle extends Component{
	render() {
		let {title="副标题",styleCss={},styleCssTitle={},subtitle='',state} = this.props;

		return (
			<div className={style["sub-title"]} style={styleCss}>
				<span style={styleCssTitle}>{title}</span>
				{
					state!==3&&<p className={style['styleCssSubTitle']}>{subtitle}</p>
				}
				{this.props.children}
			</div>
		);	
	}
}