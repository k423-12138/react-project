
import React, { Component } from 'react';
import { Layout, Button, Table, Message,Pagination } from 'element-react';
import { MessageBox } from 'element-react';
export  class Page extends Component {
        constructor(){
            super()
            this.state={
                currentPage:1,
                pageSize:4
            }
        }
        onCurrentChange(cur){
            console.log(cur);
            
        }
        render(){
            return(
                <div>
                  <div className="block">
        <span className="demonstration">大于 7 页时的效果</span>
        <Pagination layout="prev, pager, next"  pageSize={this.state.pageSize} currentPage={this.state.currentPage}  onClick={this.onCurrentChange.bind(this,this.state.currentPage)} total={100}/>
      </div>
                </div>
            )
        }
}
// <Pagination current={this.state.current} onChange={this.onChange} total={this.state.total} />