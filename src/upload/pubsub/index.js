import React, {Component} from "react";
// 500元订单
var order500 = function(orderType, pay, stock){
    if(orderType === 1 && pay === true){
        console.log('500元定金预购，得到100元优惠券')
    }else{
        return 'nextSuccessor'
    }
}

// 200元订单
var order200 = function(orderType, pay, stock){
    if(orderType === 2 && pay === true){
        console.log('200元定金预购，得到50元优惠券')
    }else{
        return 'nextSuccessor'
    }
}

// 普通订单
var orderNormal = function(orderType, pay, stock){
    if(stock > 0){
        console.log('普通购买，无优惠券')
    }else{
        console.log('手机库存不足')
    }
}
var Chain = function( fn ){
    this.fn = fn;
    this.successor = null
}
Chain.prototype.setNextSuccessor = function(successor){
    console.log(successor,'successor')
    // 这个方法是把请求给链条的下一个
    return this.successor = successor
}
Chain.prototype.passRequest = function(...args){ // 传递请求给某个节点
    var ret = this.fn(...args);
    if(ret === 'nextSuccessor'){
        console.log(this.successor,'this.successor')
        return this.successor && this.successor.passRequest(...args)
    }
    return ret
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
console.log(chainOrder500,'chainOrder500')
chainOrder500.passRequest(3, true, 500); // 输出：500元定金预购，得到100元优惠券
// chainOrder500.passRequest(2, true, 500); // 输出：200元定金预购，得到50元优惠券
// chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
// chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足

export default class extends Component {
    constructor(props) {
        super(props);
    }
    EventEmit = function() {
        this.events = {};
        this.on = function(name, cb) {
            if (this.events[name]) {
                this.events[name].push(cb);
            } else {
                this.events[name] = [cb];
            }
        };
        this.trigger = function(name, ...arg) {
            if (this.events[name]) {
                this.events[name].forEach(eventListener => {
                    eventListener(...arg);
                });
            }
        };
    };
    MessageCenter = {

    }


//采购部


//总经理


//董事长

    Client=()=> {
        let cgb = new CGBHandler();
        let zjl = new ZJLHandler();
        let dsz = new DSZHandler();
        cgb.setNext(zjl);
        zjl.setNext(dsz);
        cgb.handleRequest(800000);
    }

    render() {
        console.log(this.MessageCenter,'MessageCenter')
        return (
            <div onClick={this.Client}>4654654</div>
        )
    }
}