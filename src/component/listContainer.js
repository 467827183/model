import React, {Component} from "react";
// import {updateHashUrl} from '../helper/tool';
import EmptyData from './emptyData';
import Pagination from './pagination2.0';
import Loading from './loading'
import NetWorkError from './network'
import {Table,Thead} from './table'
export function listContainer(ListComponent, props) {
    return class ListWrap extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                pageObj: {},
                empty: false,
                loading: false,
                error: false
            };
            this.goPage = this.goPage.bind(this);
            this.fetchHandle = this.fetchHandle.bind(this);
            this.onSearch = this.onSearch.bind(this);
            this.onFresh = this.onFresh.bind(this);
            this.conditions = {};
        }

        componentDidMount() {
            let {conditions = {}} = this.props;
            this.fetchHandle(conditions);
        }

        goPage(page) {
            let conditions = {...this.conditions, page};
            this.fetchHandle(conditions);
            // const url = updateHashUrl(location.hash,{page});
            // location.replace(url)
        }
        render() {
            const {currentPage = 1, count: displayNumber = 20, totalNumber = 0, totalPage = 0} = this.state.pageObj;
            const pageObj = {currentPage, displayNumber, totalNumber, totalPage, pageGoTo: this.goPage};
            const {empty,loading,data,error} = this.state,{pageSupport}=this.props;
            const TABLE_HEADER = this.innerComponent && this.innerComponent.getTh() || [];
            // 用来区分自定义部分以及传入数组部分，by:heng
            const HeaderHtml = TABLE_HEADER[0]&&TABLE_HEADER[0].hasOwnProperty('ref')?<Thead>{TABLE_HEADER}</Thead>:<Thead thArr={TABLE_HEADER}/>
            return (
                <div>
                    <Table>
                        {data.length?HeaderHtml:null}
                        <ListComponent 
                            {...this.props}
                            ref={ele => this.innerComponent = ele}
                            onFresh={this.onFresh}
                            conditions={this.conditions}
                            pageObj={pageObj}
                            data={data}/>
                    </Table>
                    <Loading loading={loading}/>
                    <NetWorkError error={error}/>
                    <EmptyData text='暂无数据' empty={empty}/>
                    {
                        pageSupport
                        ?<div className="page__wrap">
                            <Pagination {...pageObj} />
                        </div>
                        :null
                    }
                </div>
            )
        }

        fetchHandle(conditions = {}) {
            this.conditions = conditions;
            this.setState({loading: true, empty: false, error: false, data: []});
            props.onFetch(conditions, (code, data) => {
                this.setState({loading: false});

            })
        }
        getComponent() {
            return this.innerComponent;
        }
        onSearch(conditions) {
            this.fetchHandle(conditions);
        }
        onFresh() {
            this.fetchHandle(this.conditions);
        }
        componentWillUnmount (){
            this.setState = (state,callback)=>{
                return;
            };
        }
    }
}

