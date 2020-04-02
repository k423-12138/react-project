import React, { Component } from 'react'

import { Layout, Button, Table, Message ,Cascader,Input} from 'element-react';
import { Pagination } from 'antd';
import {getList,getStatus,getSear} from '../api/shopping'
import Details from '../component/Details'
import '../css/shopping.css'
import Item from 'antd/lib/list/Item';
export class Shopping extends Component{
    constructor(){
        super()
        this.state={
            current:1,
            total:10,
            value:'',//搜索内容
            show:true,//组件切换
                options:[
                    {
                    value:'按照名称搜索',
                    label:'按照名称搜索'
                    },
                    {
                    value:'按照描述搜索',
                    label:'按照描述搜索'
                    }
                ],
                selectedOptions: ['按照名称搜索'],//搜索模式
                columns: [

                    {
                        label: "姓名",
                        prop: "name",
                        width: 210,
                        align: 'left',
    
                    },
                    {
                        label: "商品描述",
                        prop: "desc",
                        width: 280,
                        align: 'left',
                    },
                    {
                        label: "商品价格",
                        prop: "price",
                        width: 200,
                        align: 'left',
                    },
                    {
                        label: "上架操作",
                        prop: "status",
                        align: 'left',
                        width: 200,
                        render: (row, column, index) => {
                            return <span>
                                <Button size="small" onClick={this.deleteRow.bind(this, 'status', row)}>{row.status ? '下架':'上架'}</Button>
                        <span style={ {marginLeft:10,color:'#20A0FF'} }>{row.status ? '销售中':'已下架'}</span>
                            </span>
                        }
                    },
                    {
                        label: "操作",
                        prop: "status",
                        align: 'left',
                        width: 200,
                        render: (row, column, index) => {
                            return <span>
                                <Button type="info" size="small" onClick={this.deleteRow.bind(this, 'details', row)}>了解详情</Button>
                                <Button type="info" size="small" onClick={this.deleteRow.bind(this, 'info', row)}>编辑商品</Button>
                            </span>
                        }
                    }
                ],
                list: [],
                son_list:{},
                imgs:[]
        }
        this.sear = this.sear.bind(this)//搜索事件
        this.sp_up = this.sp_up.bind(this)//返回父级
        this.sp_add =this.sp_add.bind(this)//添加事件
    }
    componentWillMount(){
        let obj = {
            pageNum: this.state.current,
            pageSize: 4
        }
        getList(obj).then((res)=>{
            console.log(res.data.data.list);
            
            if(!res.data.status){
                this.setState({
                    list:res.data.data.list,
                    total:res.data.data.total
                })
            }
        })
    }
    deleteRow(type,row){//表单状态的操作
        console.log(type,row);
         
        if(type =='status' ){
            let status =!Boolean(row.status)

            let obj ={
                productId:row._id,
                status:Number(status)
            }
            getStatus(obj).then((res)=>{
                if(!res.data.status){

                    console.log('成功');
                   let list = this.state.list.find((Item)=>Item == row)
                   list.status = Number(!Boolean(list.status))
                  
                   
                   this.setState({
                       list:this.state.list
                   })

                   Message({
                    type: 'success',
                    message: ' 状态修改成功 '
                });
                }
            })
        }else if(type == 'details'){//详情界面 切换
            
               
                let str = 'http://118.24.25.7:5000/upload/'
             
                let imgs = row.imgs.map((Item)=>{
                    return Item= str +Item
                })
                //  row.imgs.forEach(element => {
                //        element = str+element
                // });
              
                this.setState({
                    show:!this.state.show,
                    son_list:row,
                    imgs:imgs    
                    })
                
        }else if(type == 'info'){//编辑界面
            let obj = {
                type:false,
                row:row
            }
            this.props.history.push({
                pathname :'/home/spadd',
                query:obj
            })
        }

    }
    onChange = page => {//页数改变

        let obj = {
            pageNum: page,
            pageSize: 4
        }
        getList(obj).then((res)=>{
            if(!res.data.status){
                this.setState({
                    list:res.data.data.list,
                    total:res.data.data.total
                })
            }
        })
        this.setState({
            current: page,
            
        });
    };
    handleChange(key, value) {//搜索模式的切换

        this.setState({ [key]: value });
      
        console.log(value);

      }
    sear(){//搜索事件
        console.log(this.state);
        let obj ={
            pageNum:1,
            pageSize:4,
            productName:this.state.value,
            productDesc:String(...this.state.selectedOptions)
        }
        getSear(obj).then((res)=>{
            if(!res.data.status){
                this.setState({
                    list:res.data.data.list,
                    current:obj.pageNum,
                    total:res.data.data.total,
                    value:''
                })
            }
        })
    }
    sp_up(type){//切换为父级
        console.log(type);
        
        this.setState({
            show:type
        })
    }
    sp_add(){
        let obj = {
            type:true
        }
        this.props.history.push({
            pathname :'/home/spadd',
            query:obj
        })
    }
    render(){
        return(
            <React.Fragment>

<div className='' style={{   display:this.state.show ? 'block':'none' }}>
        <Layout.Row style={{height:70}} >
        <Layout.Col span="12">
        <div className="grid-content bg-purple sp_top">
        <Cascader
        style={{ marginLeft: 15 }}
          options={this.state.options}
          value={this.state.selectedOptions}
          onChange={this.handleChange.bind(this, 'selectedOptions')} 
          size={'small'}
          />  
            
    <Input
    style={{ marginLeft: 15 }}
      placeholder="请输入搜索内容"
      value={this.state.value}
      onChange={(event)=>{
          this.setState({
              value:event
          })
        console.log(event)
    }}

    />   
    <Button style={{ marginLeft: 15 }} type="primary" onClick={this.sear} >搜索商品</Button>
        </div></Layout.Col>
        <Layout.Col span="12">
        <div className="grid-content bg-purple-light sp_top_r">
            
        <Button style={{ marginRight: 15 }} type="primary" onClick={this.sp_add} >+添加商品</Button>
            </div></Layout.Col>
      </Layout.Row>

     <div className='sp_main'>
                         <Table
                            style={{ width: '100%' }}
                            columns={this.state.columns}
                            data={this.state.list}
                            border={false}
                            height={250}
                            highlightCurrentRow={true}
                            stripe={true}
                        />

<Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />
         </div>       

        
               </div>

            <div style={{display:this.state.show ? "none":'block'}}>
            <Details list = {this.state.son_list} imgs={this.state.imgs} onclick={this.sp_up}/>
            </div>


            </React.Fragment>
        )
       
    }
}