import React, { Component ,lazy,Suspense}  from 'react';
import { BrowserRouter as Router, Route, Link ,NavLink ,Redirect,Switch} from 'react-router-dom'
import Login from './logo'
import  Home from './Home'
///const Login =lazy(()=> import('./logo'))

export default class All extends Component{
    constructor(){
        super()
    }
    render()
    {
        return(
            <div>
            <Switch>
            <Route path='/login' component={Login}></Route>
             <Route path='/home' component={Home}></Route>
             <Redirect from='/' to="/login"/>
            </Switch>
            
            </div>
           
        )
    }
}