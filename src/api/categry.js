import fetch from '../util/fetch'
export function getList(obj){
        return fetch({
            method:"get",
            url:'/api/manage/category/list',
            params:obj
        })
}
export function getUpdate(obj){
    return fetch({
        method:"post",
        url:'/api/manage/category/update',
        data:obj
    })
}
export function getAdd(obj){
    return fetch({
        method:'post',
        url:'/api/manage/category/add',
        data:obj
    })
}