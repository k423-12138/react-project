import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button,Form,Input } from 'element-react';
import {getLogin} from '../api/common'
import {fnAdd} from '../store/actions/comment'
import '../page/login.css'
import 'element-theme-default';


 class Login extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          form: {
            pass: '',
            name:'',
            status:1
          },
          rules: {

            pass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { len: 5, message: '长度为5位 ', trigger: 'blur' }
            ],
            name:[
                { required: true, message: '请选择活动区域', trigger: 'change' },
                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
            ]
          }
        };
      }
      
      handleSubmit(e) {
        e.preventDefault();
      
        this.refs.form.validate((valid) => {
          if (valid) {
            let obj = {username:this.state.form.name,
                        password:this.state.form.pass
            }
            let history =this.props.history
            getLogin(obj).then((res)=>{
                    console.log(res);
                    if(!res.data.status){
                       //console.log(this.props);
                    //    this.setState({
                    //     status:res.data.status,

                    //    })
                       
                        //sessionStorage.setItem('name',res.data.data.username)
                       
                        this.props.dispatch(fnAdd(res.data.data.username))
                        history.push("/home") 
                    }
                   
            })
            console.log(this.state);
            
           
            //
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      
      handleReset(e) {
        e.preventDefault();
      
        this.refs.form.resetFields();
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      }
      
      render() {
        console.log(this.props);
        
        return (
            <div className='all'>
             <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" className="demo-ruleForm">
            <Form.Item label="账号" prop="name">
        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
      </Form.Item>
            <Form.Item label="密码" prop="pass">
              <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
              <Button onClick={this.handleReset.bind(this)}>重置</Button>
            </Form.Item>
          </Form>
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
)(Login)//组件名 也可以是 容器组件下的 子组件名字
