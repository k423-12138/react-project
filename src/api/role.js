import fetch from '../util/fetch'
export function getList(obj){
        return fetch({
            method:'get',
            url:'/api/manage/role/list',
            params:obj
        })
}
export function getAdd(obj){
    return fetch({
        method:'post',
        url:'/api/manage/role/add',
        data:obj

    })
}
export function getUp(obj){
    return fetch({
        method:'post',
        url:'/api/manage/role/update',
        data:obj
    })
}