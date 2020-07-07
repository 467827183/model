import React, {Component} from "react";
import {listContainer} from "../component/listContainer";
import {Tbody} from '../component/table';

class List extends Component {

    render() {
        return (
            <Tbody>
                {this.getTr(this.props.data)}
            </Tbody>
        )
    }
    getTh = ()=>{
        return [
            {name: '企业名称', width: '25%'},
            {name: '所属地区', width: '8%'},
            {name: '行业类型', width: '11%'},
            {name: '联系人', width: '16%'},
            {name: '投保状态', width: '8%'},
            {name: '跟进人', width: '6%'},
            {name: '最近拜访时间', width: '14%'},
            {name: '投保意向', width: '12%'}
        ];
    }
    getTr=(data)=> {
        return data.map((item, key) => {
            // let time = format(item.last_wish_at, "yyyy-MM-dd");
            let status = statusChange(item.insurance_status);
            let type = typeChange(item.company_wish_type);
            return <tr key={key} onClick={(e) => this.props.handleClick(item.organID)}>
                <td title={item.addon.typeName}>{item.addon.typeName}</td>
                <td title={item.contact[0].userName + item.contact[0].phone}>{item.contact[0].userName + item.contact[0].phone}</td>
                <td title={status}>{status}</td>
                <td title={item.userName}>{item.userName}</td>
                {/* <td title={time}>{time}</td> */}
                <td title={type}>{type}</td>
            </tr>
        });
    }
}

// 投保状态过滤
function statusChange(status) {
    let statu = {
        1: '脱保',
        2: '在保',
        3: '未投保',
    };
    return statu[status];
}

// 投保意向过滤
function typeChange(type) {
    let types = {
        1: "有意向",
        2: "不认同",
        3: "同意投保",
        4: "原保险未到期",
        5: "认可"
    };
    return types[type];
}

export default listContainer(List, {onFetch: ''});