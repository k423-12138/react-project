import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';
import {Tree, Loading,Message} from 'element-react'
import React, { Component } from 'react'
import {getUp} from '../api/role'
export default  class Treebox extends Component {
    constructor(){
        super()
        this.state={
            list_key:[],
            visible: false ,
            data: [{
                id: '/home',
                label: '首页',
               
              }, {
                id: '/goods',
                label: '商品',
                children: [{
                  id:'/category',
                  label: '品类管理'
                }, {
                  id: '/product',
                  label: '商品管理'
                }]
              }, {
                id: "/users",
                label: '用户',
                children: [{
                  id:"/user",
                  label: '用户管理'
                }, {
                  id:'/role',
                  label: '权限管理'
                }]
              }],
              options: {
                children: 'children',
                label: 'label'
              },
        }
    }

  //state = { };
  componentDidUpdate(){
    console.log(this.props.row);
    
    
    
   
    
    
        
   }
  showDrawer = () => {
      this.props.onclick()
   this.props.onchange()
  };

  onClose = () => {
    this.props.onchange()
  };
  getCheckedNodes(){

    
    
    let menus =[]
    this.tree.getCheckedNodes().forEach((item)=>{
        menus.push(item.id)
    })

    
    let obj ={
        menus,
        _id:this.props.row._id,
        auth_time:this.props.row.auth_time,
        auth_name:this.props.row.auth_name
    }

    getUp(obj).then((res)=>{
        console.log(res);
        
        if(!res.data.status){
            this.props.onchange()
            Message({
                type: 'success',
                message: '提交成功 ' 
              });
        }
    })
    
}
  render() {
    
    console.log(this.props.list_key);
    
    const { data, options } = this.state
    return (
      <div>
       
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.props.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          
          <Tree
        ref={e=>this.tree = e}
        data={data}
        options={options}
        isShowCheckbox={true}
        highlightCurrent={true}
        nodeKey="id"
        defaultExpandedKeys={this.props.list_key}
        defaultCheckedKeys={this.props.list_key}
      />



          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={()=>this.getCheckedNodes()} type="primary">
              提交
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}



