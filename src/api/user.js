import fetch from '../util/fetch'
export function getList(obj){
    return fetch({
        method:'get',
        url:'/api/manage/user/list',
        params:obj
    })
}
export function  getDel(obj){
    return fetch ({
        method:'POST',
        url:"/api/manage/user/delete",
        data:obj
    })
}
export function getRole(obj){
    return fetch({
        method:'get',
        url:'/api/manage/role/list',
        params:obj
    })
}
export function getAdd(obj){
    return fetch({
        method:'post',
        url:'/api/manage/user/add',
        data:obj
    })
}
export function getUp(obj){
    return fetch({
        method :'post',
        url:'/api/manage/user/update',
        data:obj
    })
}