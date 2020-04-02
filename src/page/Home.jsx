import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link ,NavLink ,Redirect} from 'react-router-dom'
import {Menu ,Layout, Form} from 'element-react';
import'../css/home.css'
import {Page} from './Page'
import {Role} from './Role'
import {Shopping} from './Shopping'
import {User} from './User'
import {Category} from './Category'
 import {Spadd} from './Spadd'
 import {connect} from 'react-redux'
 import {fnEvent} from '../store/actions/comment'
 class Home extends Component{
    constructor(){
        super()
        this.state={
            name:''
        }
    }
    componentWillMount(){
        // let name =  sessionStorage.getItem('name')
        // if(name === null){
        //    this.props.history.push("/login") 
        // }else{
        //     console.log(name);
        // }
        
        
    }
    onSelect() {

    }
    onOpen() {

    }
    
    onClose() {
    
    }
    render(){
        this.props.dispatch(fnEvent())
   console.log();
   if(this.props.name!='admin'){
       this.props.history.push("/login") 
   }
    return (

        <div>
            <div className='home_had'>
        <Menu defaultActive="1" className="el-menu-demo had" mode="horizontal" onSelect={this.onSelect.bind(this)}>
    <Menu.Item index="1">admin</Menu.Item>
        <Menu.Item index="3">订单管理</Menu.Item>
        </Menu>
            </div>
         
        <div className="">
        <Layout.Row className="tac">
      <Layout.Col span={8}>
      
      
      <Menu defaultActive="2" className="el-menu-vertical-demo  home_side" style={{height: 800}} onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)} theme="dark">
      
      <Menu.Item  index='0'>
       <img className="img_side" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1466416495,689922136&fm=26&gp=0.jpg"/>

      </Menu.Item>
      <Menu.Item index="4">
          <NavLink to="/home/page">
          首页
          </NavLink>
          
          
    </Menu.Item>


        <Menu.SubMenu index="1" title={<span><i className="el-icon-menu"></i>商品</span>}>
     
            <Menu.Item index="1-1">
                <NavLink to='/home/category'>
                品类管理
                </NavLink>
               
                </Menu.Item>
            <Menu.Item index="1-2">
                <NavLink to='/home/shopping'>
                商品管理
                </NavLink>
              
                </Menu.Item>
       
        </Menu.SubMenu>
       
        <Menu.SubMenu index="2" title={<span><i className="el-icon-star-on"></i>用户</span>}>
          
            <Menu.Item index="2-1">
                <NavLink to='/home/user'>
                用户管理
                </NavLink>
               
                
                </Menu.Item>
            <Menu.Item index="2-2">
                <NavLink to='/home/role'>
                权限管理
                </NavLink>
              
                
                </Menu.Item>
      
        </Menu.SubMenu>
        <Menu.SubMenu index="3" title={<span><i className="el-icon-setting"></i>订单</span>}>
        
            <Menu.Item index="3-3">订单管理</Menu.Item>
        
        </Menu.SubMenu>
      </Menu>
      </Layout.Col>
    </Layout.Row>
        </div>
        <div className='main'>
        <Route path='/home/page' component={Page}></Route>
        <Route path='/home/category' component={Category}></Route>
        <Route path='/home/shopping' component={Shopping}></Route>
        <Route path='/home/user' component={User}></Route>
        <Route path='/home/role' component={Role}></Route>
        <Route path='/home/spadd' component={Spadd}></Route>
        </div>
        </div>
    )
    }
}


const mapStateToProps =(state)=>{
    // console.log(state);
     
     return{//映射配置
         name:state.comment
     }
  }
  
  
  export default connect(
     mapStateToProps//就把store 的state映射到组件上props上
     //映射数据，把仓库的state映射到 组件的props上
  )(Home)//组件名 也可以是 容器组件下的 子组件名字
  