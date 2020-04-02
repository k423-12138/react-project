import {createStore, combineReducers} from 'redux'
import {comment,zhiWei} from './reducers/comment'

let tol = combineReducers({
        comment,
      
})
let  store = createStore(tol)


export default store  