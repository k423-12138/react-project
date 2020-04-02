import React, { Component } from 'react'
import { Layout, Button,Input,Form, Message,Select,Upload,Dialog,} from 'element-react';
import {getList} from '../api/categry'
import {getAdd} from '../api/shopping'
import '../css/spadd.css'
export class Spadd extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
            dialogImageUrl: '',
            dialogVisible: false,
            list:[],//分类列表 
          form: {
            name: '',
            region: '',
            price:'',
            delivery: false,
            resource: '',
            desc: '',
            detail:''
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
            price:[
                { required: true, message: '价格不正确', trigger: 'blur' },
               
                // { validator: (rule, value, callback) => {
                   
                    
                //     var price = parseInt(value, 10);
          
                //     setTimeout(() => {
                //       if (!Number.isInteger(price)) {
                //         callback(new Error('请输入数字'));
                //       } 
                //     }, 1000);
                //   }, trigger: 'change' }

            ],
            region: [
              { required: true, message: '请选择商品分类', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写描述详情', trigger: 'blur' }
            ],
            detail: [
                { required: true, message: '请填写商品详情', trigger: 'blur' }
              ]
          }
        };
      }
    componentWillMount(){
        
       let  str = this.props.location.query
     
        if(!str.type){
            let row = str.row
            this.setState({
                form:row
            })
        }
        let  obj = {
            pageNum:1,
            pageSize:6
        }
        getList(obj).then((res)=>{
            if(!res.data.status){
                this.setState({
                    list:res.data.data.list
                })
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.form,this.state.list);
       
        this.refs.form.validate((valid) => {
          if (valid) {
        
            let obj ={
                categoryId:this.state.form.region,
                name:this.state.form.name,
                desc:this.state.form.desc,
                price:this.state.form.price,
                detail:this.state.form.detail,
                pCategoryId:'0'
            }
            getAdd(obj).then((res)=>{
                console.log(res);
                
                    if(!res.data.status){
                        this.props.history.push('/home/shopping')
                        Message({
                            type: 'success',
                            message: ' 添加成功 '
                        });
                    }else{
                        Message.error('大哥求求你，你输入错了');
                    }
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      
      handleReset(e) {
        e.preventDefault();
        let form =  {
            name: '',
            region: '',
            price:'',
            delivery: false,
            resource: '',
            desc: '',
            detail:''
          }
          this.setState({
              form:form
          })
        this.refs.form.resetFields();
      }
      
      onChange(key, value) {
        this.setState({
          form: Object.assign({}, this.state.form, { [key]: value })
        });
      }
      handleRemove(file, fileList) {
        console.log(file, fileList);
      }
      
      handlePictureCardPreview(file) {
        this.setState({
          dialogImageUrl: file.url,
          dialogVisible: true,
        })
      }
      sp_f(){
        this.props.history.push('/home/shopping')
      }
    render(){

        let list = this.state.list.map((item)=>{
            return  <Select.Option label={item.name} value={item._id} key={item._id}></Select.Option>
        })
        const { dialogImageUrl, dialogVisible } = this.state;
      
        return(
            <div>
               <div className='sp_add_had'>
                <span onClick={this.sp_f.bind(this)}>
                <i className='el-icon-arrow-left' ></i>
                </span>
                <span style={{marginLeft:15}}>
                    添加商品
                </span>
               </div>
               
               <div >
               <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" className="demo-ruleForm">
      <Form.Item label="商品名称" prop="name">
        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
      </Form.Item>
      <Form.Item label='商品价格' prop='price'>
      <Input value={this.state.form.price} onChange={this.onChange.bind(this, 'price')}></Input>
      </Form.Item>
      <Form.Item label="商品描述" prop="desc">
        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
      </Form.Item>
      <Form.Item label="商品分类" prop="region">
        <Select className='sp_add_se' value={this.state.form.region} labelPosition='left'  placeholder="请选择活动区域" onChange={this.onChange.bind(this, 'region')}>
         {list}
        </Select>
      </Form.Item>
      <Form.Item label="图片上传">

        <Upload
        action="http://118.24.25.7:5000/manage/img/upload"
        listType="picture-card"
        onPreview={file => this.handlePictureCardPreview(file)}
        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
      >
        <i className="el-icon-plus"></i>
      </Upload>
      <Dialog
        visible={dialogVisible}
        size="tiny"
        onCancel={() => this.setState({ dialogVisible: false })}
      >
        <img width="100%" src={dialogImageUrl} alt="" />
      </Dialog>

      </Form.Item>

      <Form.Item label="商品详情" prop="detail">
        <Input type="textarea" value={this.state.form.detail} onChange={this.onChange.bind(this, 'detail')}></Input>
      </Form.Item>
      <Form.Item >
        <Button type="primary" onClick={this.handleSubmit.bind(this)}>立即创建</Button>
        <Button onClick={this.handleReset.bind(this)}>重置</Button>
      </Form.Item>
    </Form>
               </div>


            </div>
        )
    }
}