import * as React from 'react';
import * as style from './index.css';

export class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.pagingConstruct=this.pagingConstruct.bind(this);
        this.renderDefaultInfo = this.renderDefaultInfo.bind(this);
    }

    static defaultProps={
        currentPage:1,
        totalPage:1,
        displayNumber:20,
        totalNumber:0
    };

    render(){
        const {renderInfo}=this.props;
        return(
            <div className={style["paginate-container"]}>
                <div className={style["pagination"]}>
                    {
                        renderInfo
                        ? renderInfo()
                        : this.renderDefaultInfo()
                    }
                    {
                        this.props.currentPage==1
                        ? <a href="javascript:void(0)" className={style["page_disabled"]}>上一页</a>
                        : <a href="javascript:void(0)" onClick={e=>this.pagingConstruct(this.props.currentPage-1)} className={style["page_up"]}>上一页</a>
                    }
                    {this.getPage()}
                    {
                        this.props.currentPage==this.props.totalPage
                        ? <a href="javascript:void(0)" className={style["page_disabled"]}>下一页</a>
                        : <a href="javascript:void(0)" onClick={e=>this.pagingConstruct(this.props.currentPage+1)} className={style["page_un"]}>下一页</a>
                    }
                </div>
            </div>
        )
    }

    /**
     * 额外信息说明,如果props里不包含renderInfo则使用renderInfo,否则使用该方法渲染
     */
    renderDefaultInfo(){
        return(
            <span className={style["page_prompt"]}>共{this.props.totalNumber}条，每页显示{this.props.displayNumber}条</span>
        )
    }

    getPage(){
        let {totalPage}=this.props,isHiddenExist=0,data=[],self=this,
            currentPage=Number(this.props.currentPage);
        for (let i=1;i<=totalPage;i++){
            data.push(i);
        }
        return data.map(function (item,key) {
            if(item==currentPage){
                return <span key={key} className={style["page_current"]}>{item}</span>
            }else{
                //如果是页首，页尾，当前页的前后三页则不省略。
                if(item<3||item<(currentPage+3)&& item > (currentPage - 3)||  item > (totalPage - 2)){
                    isHiddenExist = 0;
                    return <span  key={key} className={style["page_number"]} onClick={e=>self.pagingConstruct(item)}>{item}</span>;
                }
                //否则就构造...
                else{
                    if (isHiddenExist == 0) {
                        isHiddenExist = 1;
                        return <span  className={style["page_ellipses"]} key={key}>...</span>
                    }
                }
            }
        });
    }
    pagingConstruct(page){
        let {pageGoTo}=this.props;
        pageGoTo&&pageGoTo(page);
    }
}

