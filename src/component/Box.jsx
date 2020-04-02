import {Input,Form, Message,Select} from 'element-react';
import { Drawer, Button, Icon } from 'antd';
import React, { Component } from 'react'
import {getRole,getAdd,getUp} from '../api/user'

export default class DrawerForm extends  Component {
    constructor(){
    super()    
        this.state={
            type:false,
            list:[
                {_id:'5d3a9db0a9595814c08e66a1',name:'管理员'}
            ],
            form:{
                username:'',
                password:'',
                phone:'',
                email:'',
                role_id:''
            },
            rules: {
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    // { type: 'phone', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                    // { validator: (rule, value, callback) => {
                    //     var age = parseInt(value, 10);
              
                    //     setTimeout(() => {
                    //       if (!Number.isInteger(age)) {
                    //         callback(new Error('请输入数字值'));
                    //       } else{
                    //         if (age.length <11) {
                    //           callback(new Error('号码为11位'));
                    //         } 
                    //       }
                    //     }, 1500);
                    //   }, trigger: 'change' }
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                role_id:[
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]

            }
        }
        
    }
    
   
  showDrawer = () => {
      let obj ={
        pageNum:1,
        pageSize:5
      }
    getRole(obj).then((res)=>{
        if(!res.data.status){
            this.setState({
                list:res.data.data.list,
                
            })
            this.props.onclick(true)
        }
    })
   
  };
  componentWillMount(){
    let obj01 ={
        pageNum:1,
        pageSize:5
      }
    getRole(obj01).then((res)=>{
        if(!res.data.status){
            this.setState({
                list:res.data.data.list,
                
            })
            
        }
    })
  }
  onClose = () => {
    
    this.props.onclick(false)
  };
  up_e= ()=>{//更新请求
      let obj = {
        _id:this.state.form._id,
        username:this.state.form.username,
                password:this.state.form.password,
                phone:this.state.form.phone,
                email:this.state.form.email,
                role_id:this.state.form.role_id
        
      }
    getUp(obj).then((res)=>{
        console.log(res);
        
       if(!res.data.status){
           let form ={
               username:'',
               password:'',
               phone:'',
               email:'',
               role_id:''
           }
           Message({
               message: '修改成功',
               type: 'success'
             });
             this.setState(
                 {
                   form:  form,
                  
                 }
             )
             this.props.onclick(false)
       }else{
           Message({
               showClose: true,
               message: '名字已经存在',
               type: 'error'
             });
       }
    })
  }
  onClick(e){
    e.preventDefault();
    
    this.refs.form.validate((valid) => {
        console.log(valid);
        
        if (valid) {
            console.log(this.state.form);
            let obj ={
                username:this.state.form.username,
                password:this.state.form.password,
                phone:this.state.form.phone,
                email:this.state.form.email,
                role_id:this.state.form.role_id
            }
         if(!this.state.type){
            getAdd(obj).then((res)=>{
                console.log(res);
                
                  if(!res.data.status){
                      let form ={
                          username:'',
                          password:'',
                          phone:'',
                          email:'',
                          role_id:''
                      }
                      Message({
                          message: '添加成功',
                          type: 'success'
                        });
                        this.setState(
                            {
                              form:  form,
                             
                            }
                        )
                        this.props.onclick(false)
                  }
            })
         }else{
            this.up_e()
         }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }
  render() {
      console.log(this.props.box_data);
      if(this.props.box_data.type){
          this.props.onchange(false)
        this.setState({
            form:this.props.box_data.row,
            type:this.props.box_data.type
        })
      }
      
    let list = this.state.list.map((item)=>{
        return  <Select.Option label={item.name} value={item._id} key ={item._id}></Select.Option>
    })
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> 添加用户
        </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.props.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
 <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" className="demo-ruleForm">
      <Form.Item label="用户名" prop="username">
        <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
      </Form.Item>
      <Form.Item label="密码" prop="password">
        <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
      </Form.Item>
      <Form.Item label="手机号" prop="phone">
        <Input value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')}></Input>
      </Form.Item>
      <Form.Item label="邮箱" prop="email">
        <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')}></Input>
      </Form.Item>
      <Form.Item label="活动区域" prop="role_id">
        <Select value={this.state.form.role_id} placeholder="请选择活动区域" onChange={this.onChange.bind(this, 'role_id')}>
          
         {list}
        </Select>
      </Form.Item>
    </Form>
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
            <Button onClick={this.onClose.bind(this)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this. onClick.bind(this)} type="primary">
              提交
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}



