import React, { Component } from 'react'
import { Layout, Button, Table, Message } from 'element-react';
import { Pagination } from 'antd';
import {getList,getDel} from '../api/user'
import { MessageBox } from 'element-react';
import DrawerForm from '../component/Box'
import '../css/user.css'
export class User extends Component{
    constructor(){
        super()
        this.state = {
            current:1,
            total:10,
            visible: false,//box组件是否显示
            columns: [

                {
                  label: "用户名",
                  prop: "username",
                  width: 220,
                  align: 'left',
                },
                {
                  label:'邮箱',
                  prop :'email'  ,
                  width:220,
                  align:'left',

                },
                {
                 label:'电话',
                 prop:'phone',
                 width:220,
                 align:'left'   
                },
                {
                    label: "创建日期",
                    prop: "create_time",
                    width: 220,
                    align:'left'
                  },
               
                {
                    label: "操作",
                    prop: "address",
                    align: 'left',
                    width: 216,
                    render: (row, column, index) => {
                        return <span>
                            <Button type="info" size="small" onClick={this.deleteRow.bind(this, 'info', row)}>编辑</Button>
                            <Button type="danger" size="small" onClick={this.deleteRow.bind(this, 'del', row)}>删除</Button>
                        </span>
                    }
                }
              ],
              list:[],
              box:{
                  type:false,
                  row:{}
              },//box组件数据
        }
        this.list_e = this.list_e.bind(this)
    }
    componentWillMount(){
            this.list_e()
    }
    list_e(){
        let  obj  = {
            pageNum:this.state.current,
            pageSize:4
          }

          getList(obj).then((res)=>{
                if(!res.data.status){
                   
                       res.data.data.list.forEach((item)=>{
                                item.create_time = this.time_fn(item.create_time)
                       })
                       let list = res.data.data.list
                 
                       
                        this.setState({
                            list
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
    deleteRow(type,row){
        console.log(row);
        
        if(type == 'info'){//这是编辑页面

                let box = {
                    type:true,
                    row:row
                }
                this.setState({
                    box,
                    visible:true
                })

        }else{//这是删除操作 
                
            MessageBox.confirm('该用户将删除 ? ,是否继续', '提示', {
                type: 'warning'
              }).then(() => {
                let obj ={
                    userId:row._id
                }
                getDel(obj).then((res)=>{
                        if(!res.data.status){
                            Message({
                                type: 'success',
                                message: '删除成功!'
                              });
                              this.list_e()
                        }else{
                            Message({
                                type: 'info',
                                message: '删除失败'
                              });
                        }
                })
               
              }).catch(() => {
                Message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
        }
    }
    onChange(){

    }
    add(){
        MessageBox.prompt('请输入邮箱', '提示', {
            inputPattern: /\S/,
            inputErrorMessage: '邮箱格式不正确',
            inputPattern: /\S/,
            inputErrorMessage: '邮箱格式不正确',
            
          }).then(({ value }) => {
            Message({
              type: 'success',
              message: '你的邮箱是: ' + value
            });
          }).catch(() => {
            Message({
              type: 'info',
              message: '取消输入'
            });
          });
    }
    box_e(type){//控制

            
            this.setState({
                visible:type
            })
            this.list_e()
    }
    box_data(type){
        let box={
            type:false,
            row:{}
        }
            this.setState({
                box
            })
    }
    render(){
        return(
            <React.Fragment>
              <div>
                  <div className='user_had'>
                  
                  <DrawerForm onclick={this.box_e.bind(this)} onchange={this.box_data.bind(this)} box_data={this.state.box} visible={this.state.visible} />

                  </div>
                  <div>

                  <Table
                  border={true}
      style={{width: '100%'}}
      columns={this.state.columns}
      maxHeight={300}
      data={this.state.list}
    />
 <Pagination current={this.state.current} onChange={this.onChange.bind(this)}  total={this.state.total} />
                  </div>

                
              </div>
            </React.Fragment>
        )
    }
}