import React, { Component } from 'react';
import { Layout, Button, Table, Message } from 'element-react';
import { MessageBox } from 'element-react';
import { Pagination } from 'antd';
import {getList,getUpdate} from '../api/categry'
export default class Lei extends Component {
        constructor(){
            super()
            this.state={
                current:1,
                show_list:true,
                columns: [

                    {
                        label: "姓名",
                        prop: "name",
                        width: 800,
                        align: 'left',
    
                    },
    
                    {
                        label: "操作",
                        prop: "address",
                        align: 'left',
                        width: 280,
                        render: (row, column, index) => {
                            return <span>
                                <Button type="info" size="small" onClick={this.deleteRow.bind(this,row)}>编辑</Button>
                            </span>
                        }
                    }
                ],
                list:[]
            }
            this.onChange=this.onChange.bind(this)//编辑
            this.getlist = this.getlist.bind(this)
        }
        getlist(){
            let obj={
                parentId:this.props.id,
                pageNum:1,
                pageSize:4
            }
            getList(obj).then((res)=>{
                if(!res.data.status){
                    this.setState({
                        list:res.data.data.list,
                        show_list:false
                    })
                }
            })
        }
        deleteRow(row){
            MessageBox.prompt(this.props.name, '修改', {
                inputPattern: /\S/,
                inputErrorMessage: '不能为空'
              }).then(({ value }) => {
                let obj = {
                    categoryId:row.id,
                    categoryName:value
                }
                getUpdate(obj).then((res)=>{
                    if(!res.data.status){
                        Message({
                            type: 'success',
                            message: '更新的是: ' + value
                          });
                          
                      
                    }
                })
               

              }).catch(() => {
                Message({
                  type: 'info',
                  message: '取消输入'
                });
              });
        }
        onChange = page => {//页数改变
                console.log(page);
                
        }
        render(){
            return(
                <div>
                   <Table
                            style={{ width: '100%' }}
                            columns={this.state.columns}
                            data={this.state.show_list? this.props.list:this.state.list}
                            border={true}
                            height={210}
                            highlightCurrentRow={true}
                        />
                    <Pagination current={this.state.current} onChange={this.onChange} total={30} />    
                </div>
            )
        }
}
