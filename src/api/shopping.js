import fetch from '../util/fetch'
export  function getList(obj){
        return fetch({
            method:'get',
            url:'/api/manage/product/list',
            params:obj
        })
}
export function getStatus(obj){
        return fetch({
            method:'post',
            url:'/api/manage/product/updateStatus',
            data:obj
        })
}
export function getSear(obj){
    return fetch({
        method:'get',
        url:'/api/manage/product/search',
        params:obj
    })
}
export function getAdd(obj){
    return fetch({
        method :'post',
        url:'/api/manage/product/add',
        data:obj
    })
}