import '../static/style/components/studyLine.css'
import {Row,Col,Icon,List} from 'antd'
import React, {useEffect, useState} from "react";
import Home from "../pages";
import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from "next/link";

 const StudyLine = (res)=>{
     const [ typelist , setTypeList ] = useState([]);
     useEffect(()=>{
        fetchData()
     },[])
     const fetchData = async ()=>{
         const result = await axios(servicePath.getTypeInfo).then(
             (res)=>{
                 return res.data.data }
         )
         console.log(result)
         setTypeList(result)
     }
    return (
        <div className="comm-box">
          <div className="ls-main-title">文章分类</div>
            {
                   typelist && typelist.map((item, index) => {
                       return <Link href={{pathname: '/', query: { title: item.name, type: item.id}}} key={index} prefetch><a style={{width: "100%"}} target="_top" key={index}>
                           <Row className="sl-row">
                               <Col span={22} className="sl-title"><Icon type="book"/>  {item.name}({item.count})</Col>
                               <Col span={2}  className="sl-icon"><Icon type="right" /></Col>
                           </Row>
                       </a>
                       </Link>
                     })

            }
        </div>
    )
 }

 export default StudyLine
