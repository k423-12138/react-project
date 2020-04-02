import React, { Component } from 'react'
import { Layout, Button, Table, Message } from 'element-react';
import { MessageBox } from 'element-react';
import { Pagination } from 'antd';
import { getList,getUpdate ,getAdd} from '../api/categry'
import Lei from '../component/Lei'
import '../css/category.css'
/* 
render: (row, column, index)=>{
          return <span><Button type="text" size="small" onClick={this.deleteRow.bind(this, index)}>移除</Button></span>
        }
*/
export class Category extends Component {
    constructor() {
        super()
        this.state = {
            show:true,//切换组件
            total: 0,
            current: 1,
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
                            <Button type="info" size="small" onClick={this.deleteRow.bind(this, 'info', row)}>编辑</Button>
                            <Button type="info" size="small" onClick={this.deleteRow.bind(this, 'del', row)}>查看子分类</Button>
                        </span>
                    }
                }
            ],
            data: [],
            list:[],//子类的数据，
            list_total:0,
            list_current:1,
            list_id:'0',//父id
            list_name:''//父姓名
        }
        this.onChange = this.onChange.bind(this)
        this.add_e = this.add_e.bind(this)//添加父类
        this.cut = this.cut.bind(this)//切换为父类列表
    }
    componentWillMount() {//请求 分类列表
        let obj = {
            pageNum: this.state.current,
            pageSize: 4
        }
        getList(obj).then((res) => {
            console.log(res);
            if (!res.data.status) {
                this.setState({
                    data: res.data.data.list,
                    total: res.data.data.total
                })
            }
        })
    }
    onChange = page => {//页数改变

        let obj = {
            pageNum: page,
            pageSize: 4
        }
        getList(obj).then((res) => {
            console.log(res);
            if (!res.data.status) {
                this.setState({
                    data: res.data.data.list,
                    total: res.data.data.total
                })
            }
        })
        this.setState({
            current: page,
        });
    };
    deleteRow(type, row) {//修改 删除
        console.log(row);
        
        if (type == 'info') {

            

            MessageBox.prompt('请输入新类名', '提示', {
                inputPattern: /\S/,
                inputErrorMessage: '不能为空'
            }).then(({ value }) => {//成功回调函数
                   
               let obj = {
                categoryId:row._id,
                categoryName:value
               }
               getUpdate(obj).then((res)=>{//修改类的请求
                    if(!res.data.status){
                        Message({
                            type: 'success',
                            message: '修改的是: ' + value
                        });
                        let list = this.state.data.find((item)=>item==row)
                         list.name = value
                         let data = this.state.data
                        this.setState({
                            data:data
                        })
                    }
               }) 
                

            }).catch(() => {
                Message({
                    type: 'info',
                    message: '取消输入'
                });
            });

        } else {//查看子分类 
            
            let obj = {
                parentId:row._id,
                pageNum: 1,
                pageSize: 4
            }
            getList(obj).then((res)=>{
                if(!res.data.status){
                    this.setState({
                        list:res.data.data.list,
                        list_total:res.data.data.total,
                        list_id:row._id,
                        list_name:row.name
                    })
                }
            })



            this.setState({
                show:!this.state.show
            })
        }
      
    }
    add_e(){
        if(this.state.show){
            MessageBox.prompt('请输入添加的分类', '添加一级分类', {
                inputPattern: /\S/,
                inputErrorMessage: '不能为空'
              }).then(({ value }) => {
                  let obj ={
                    categoryName:value
                  }
                getAdd(obj).then((res)=>{
                    if(!res.data.status){
                        Message({
                            type: 'success',
                            message: '你添加的类是: ' + value
                          });
                    let date = this.state.data
                    date.push(res.data.data)
                    this.setState({
                        data:date
                    })
                    }
                })
    
                
              }).catch(() => {
                Message({
                  type: 'info',
                  message: '取消输入'
                });
              });
        }else{//添加子分类

                MessageBox.prompt(this.state.list_name, '添加二级分类', {
                    inputPattern: /\S/,
                    inputErrorMessage: '不能为空'
                  }).then(({ value }) => {
                      let obj ={
                        parentId:this.state.list_id,  
                        categoryName:value
                      }
                    getAdd(obj).then((res)=>{
                        if(!res.data.status){
                            Message({
                                type: 'success',
                                message: '你添加的类是: ' + value
                              });
                        let date = this.state.data
                        date.push(res.data.data)
                        this.setState({
                            data:date
                        })
                        }
                    })
        
                    
                  }).catch(() => {
                    Message({
                      type: 'info',
                      message: '取消输入'
                    });
                  });

        }
        

    }
    cut(){//返回 父级组件
        this.setState({
            show:true
        })
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <Layout.Row>
                        <Layout.Col span="24">
                            <div className="grid-content bg-purple-dark cat_top">
                                <span style={{ color: '#20A0FF', marginLeft: 15 }} onClick={this.cut}> 这是一级商品分类</span>
                                <Button style={{ marginRight: 15 }} type="primary" onClick={this.add_e} >+添加分类</Button>
                            </div></Layout.Col>
                    </Layout.Row>

                    <div className="cat_main">
                        <div style={{display:this.state.show ? "block":'none'}}>
                        <Table
                            style={{ width: '100%' }}
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                            height={210}
                            highlightCurrentRow={true}
                        />
                            <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />
                        
                        </div>
                        <div style={{display:this.state.show ? "none":'block'}}>
                            <Lei 
                            list={this.state.list} list_total = {this.state.list_total} list_current={this.state.list_current} 
                            id={this.state.list_id} name ={this.state.list_name}
                            
                            ></Lei>
                        </div>
                       
                    </div>


                </div>


            </React.Fragment>
        )
    }
}