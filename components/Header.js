import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import '../static/style/components/header.css'
import {Row,Col, Menu, Icon} from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const Header = () => {

    return (

            <div className="header">
                <div className="header-center">
                    <Row type="flex" justify="center">
                        <Col  xs={24} sm={24} md={16} >
                            <span className="header-logo">
                                <Link href={{pathname:'/'}}>
                                    <a>写代码还房贷 </a>
                                </Link>

                            </span>
                            <span className="header-txt"> </span>
                        </Col>

                        <Col className="memu-div" xs={0} sm={0} md={8} >
                           <Row type='flex'>
                               <Col xs={0} sm={0} md={6}  >
                                    <Link  href={{pathname:'/'}} >
                                        <a target="_top"><Icon type='home' /> 博客首页</a>
                                    </Link>
                               </Col>
                               <Col xs={0} sm={0} md={6}  >
                                    <Link href={"#"}>
                                        <a onClick={() => alert("未完成")}><Icon type='youtube' /> 文章归档</a>
                                    </Link>
                               </Col>
                           </Row>
                        </Col>
                    </Row>
                </div>
            </div>

    )
}

export default Header
