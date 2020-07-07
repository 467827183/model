##pagination

>des 极安2.0翻页

##code block
```
import Pagination from '@stararc-enterprise/pagination';
/**
 *翻页演示
 *currentPage:     当前页  number类型  
 *totalPage:       翻页总数 number类型  
 *isShow           默认值true 为false时不显示当前页和翻页总数提示
 *displayNumber:   当前显示几条数据 number类型  Required(必传)
 *totalNumber:     数据总数 number类型  Required(必传)
 *pageGoTo:        翻页方法  func类型  Required(必传)
 *textAlign:'end', 传递当前值 更改显示位置 默认是 end  string类型
 *styleCss:{}      可以传递styleCss 更改翻页样式 
 */
class Readme extends Component{
    render(){
        let {currentPage,totalPage,totalNumber}=this.props,
        return(
            <div>
                <div className="common-page-content">
                    <Table>
                        <TableHeader thArr={th}/>
                        <TableBody bodyData={list} clickEvent={this.clickEvent} tdArr={tdArr}/>
                    </Table>
                </div>
                <div className="common-page-area">
                    <Pagination currentPage={currentPage} displayNumber={this.getOptions()['count']} totalPage={totalPage}  pageGoTo={this.pageGoto} totalNumber={totalNumber}/>
                </div>
            </div>
        )
    }
    pageGoto(page){
        let {getList}=this.props,data=this.getOptions();
        data.page=page;
        getList&&getList(data);
    }
    getOptions(){
        return{
            page:1,
            count:10
        }
    }
}
```