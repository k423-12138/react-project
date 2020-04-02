import React, { Component } from 'react'
import { Layout, Button, Table, Message } from 'element-react';
import { MessageBox } from 'element-react';
import { Pagination } from 'antd'
import Treebox from '../component/Tree'
import '../css/role.css'
import { getList,getAdd } from '../api/role'
export class Role extends Component {
    constructor() {
        super()
        this.state = {
            visible:false,
            current:1,
            total:10,
            list_key:[],
            row:{},
            tree_time:{},//时间戳
            tree_list:[],//列表
            columns: [

                {
                    label: "角色名称",
                    prop: "name",
                    align: 'left',
                    width: 205
                },
                {
                    label: "创建时间",
                    align: 'left',
                    prop: "create_time",
                    width: 205
                },
                {
                    label: '授权时间',
                    align: 'left',
                    prop: 'auth_time',
                    width: 205
                },
                {
                    label: '授权人',
                    align: 'left',
                    prop: 'auth_name',
                    width: 205
                }, {
                    label: "操作",
                    prop: "address",
                    align: 'left',
                    width: 278,
                    render: (row, column, index) => {
                        
                        
                        return <span>
                            <Button type="info" size="small" onClick={this.deleteRow.bind(this,row)}>编辑</Button>
                            
                        </span>
                    }
                }
            ],
            list: []
        }
        this.list_e = this.list_e.bind(this)
    }
    //
    componentWillMount() {
            this.list_e()

    }
    list_e() {//list请求
       let  obj ={
        pageNum:this.state.current,
        pageSize:4  
    } 
    getList(obj).then((res)=>{
        if(!res.data.status){
            console.log(res.data.data.list);
            
         
           res.data.data.list.forEach((item)=>{
                item.create_time=this.time_fn(item.create_time)
                item.auth_time = this.time_fn(item.auth_time)
           })
        
           this.setState({
               list:res.data.data.list,
               total:res.data.data.total
           })
        }
    })
    }

    time_fn(data) {
        //将时间戳转化为时间
        let da = Number(data);
        da = new Date(da);
        let year = da.getFullYear() + "年";
        let month = da.getMonth() + 1 + "月";
        let date = da.getDate() + "日";
        let h = da.getHours() + "小时";
  
        data = [year, month, date, h].join("/");
      
  
        return data;
      }
      add_e=()=>{
        MessageBox.prompt('请添加名字', '提示', {
            inputPattern: /\S/,
            inputErrorMessage: '名字不能为空'
          }).then(({ value }) => {
              let obj={
                roleName:value
              }
              getAdd(obj).then((res)=>{
                  if(!res.data.status){
                    Message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                      });
                      this.list_e()
                  }
              })
           
          }).catch(() => {
            Message({
              type: 'info',
              message: '取消输入'
            });
          });
      }
    deleteRow(row) {//弹出 侧边栏 
       

        
        let  obj ={
            pageNum:this.state.current,
            pageSize:4  
        } 
        getList(obj).then((res)=>{
            if(!res.data.status){
                let list = res.data.data.list.find((item)=>item._id==item._id)
                row =list
                
                this.setState({
                    row,
                    visible:true,
                    list_key:row.menus
                })
                console.log(this.state.row);
                
            }
        })
        
              
    }
    
    onChange=(page)=>{
           
            this.list_e()
            this.setState({
                current:page
            })
    }
    render() {
        return (
            <React.Fragment>
                <div className='role_had'>
                    <Button type="primary" style={{marginLeft:15}} onClick ={this.add_e}>
                        添加
            </Button>
                </div>

                <div>

                    <Table
                        style={{ width: '100%' }}
                        columns={this.state.columns}
                        maxHeight={280}
                        data={this.state.list}
                    />
                    <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />
                </div>
                <div>
                <Treebox row={this.state.row} list_key={this.state.list_key}   visible ={this.state.visible}  onchange={()=>{this.setState({visible:false})}} />
                </div>
            </React.Fragment>
        )
    }
}