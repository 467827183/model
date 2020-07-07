/*
 * @Author: liheng 
    风控科技-塔吊
 */
// import Service from '../helper/service';
// import commonRequest from '../helper/commonRequest';
// import {requestSuccessHandle} from "../helper/requestHandle"
// //获取列表
// export const get_list = (params = {}, callback) => {
//     return commonRequest('API_INSURE_URL', '/hardware/search', params, 'get').then((r) => {
//         requestSuccessHandle(r, callback);
//     }, () => {
//         callback(999);
//     })
// };
// // 塔吊详情
// export const get_details = (params, callback) => {
//     return commonRequest(API_INSURE_URL, '/hardware_relation/show', params, 'get').then((r) => {
//         if (Number(r.ret) === 0) {
//             return r.data
//         }
//     })
// };