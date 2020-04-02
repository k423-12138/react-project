 import React, { Component } from 'react'
 import {Tag} from 'element-react'
 import '../css/details.css'
/* http://118.24.25.7:5000/upload/*/

 export default class Details extends Component{
     constructor(){
         super()
     }
     up_e(){
         this.props.onclick(true)
     }

     render(){
         let imgs =this.props.imgs.map((item)=>{
             return <img src={item} alt="这是个垃圾图片"  key={item}/>
         })
         return(
             <div>
                 <div className='hand'>
                     <div style={{marginLeft:10}}  onClick={this.up_e.bind(this)}>
                     <i className='el-icon-arrow-left' ></i>
                     </div>
                   
                    <span style={{color:'#58B7FF',marginLeft:10}}>商品详情</span>
                 </div>
                <ul className='deta_ul'>
                    <li>
                    <Tag type="primary">商品名称</Tag>
                    <span>{this.props.list.name}</span>
                    </li>
                    <li>
                    <Tag type="primary">商品价格</Tag>
         <span>{ this.props.list.price}</span>
                    </li>
                    <li>
                    <Tag type="primary">商品分类</Tag>
         <span>{this.props.list.desc}</span>
                    </li>
                    <li>
                    <Tag type="primary">商品图片</Tag>

                    <div className='deta_imgs'>
                          {imgs}
                    </div>
                    </li>
                    <li>
                    <Tag type="primary">商品详情</Tag>
         <span>{this.props.list.detail}</span>
                    </li>
                </ul>
             </div>
         )
     }
 }