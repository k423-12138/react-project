//定义 comment 的action 的地方

import {FN,ADD} from './action-type'
//在实际开发中，会把action定义一个函数 返回一个对象export let addEvent= function(obj){
   


export let fnEvent  = function(){
    return{
        type:FN,
       
    }
}
export let fnAdd = function(obj){
        return{
            type:ADD,
            name:obj
        }
}