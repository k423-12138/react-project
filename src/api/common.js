import fetch from '../util/fetch'


export function getLogin(obj){
    return fetch({
        method:"POST",
        url:'/api/login',
        data:obj
    })
}

