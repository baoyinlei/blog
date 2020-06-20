import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col, Icon, Breadcrumb, BackTop, Skeleton, Affix} from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Rightmi from '../components/Rightmi'
import '../static/style/pages/detailed.css'

import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'
import StudyLine from "../components/StudyLine";





const Detailed = (props) =>{

  let articleContent=props.article_content
  if(!props.data.contentHtml){
    console.log('渲染完成，但什么都没有')

    return false
  }
  useEffect( ()=>{

    setTimeout(()=>{
      myFuction()
    },100)






  },[])

  const [html,setHtml] = useState(props.data.contentHtml)
  const [tocify,setTocify] = useState(new Tocify())
  const [loading,setLoading] = useState(true)


  const myFuction = async ()=>{

      let newhtml =await marked(props.data.content)
      setHtml(newhtml)
      setLoading(false)
      //console.log(tocify.render())

  }


  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({

    renderer: renderer,

    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,

    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  });




  return (
    <>
      <Head>
        <title>小鸡腿</title>
        <meta name="description" content={props.data.title}></meta>
        <link rel="icon" href="https://byl-blog.oss-cn-hangzhou.aliyuncs.com/common/favicon.ico" mce_href="http://byl-blog.oss-cn-hangzhou.aliyuncs.com/common/aecce4ac5c3d24c78e47f93da4c6102.jpg" type="image/x-icon" />
      </Head>
        <Affix offsetTop={0}>
      <Header />
        </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}   >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.data.typeStr}</Breadcrumb.Item>
                  <Breadcrumb.Item> {props.data.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {props.data.title}
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> {props.data.createTime}</span>
                  <span><Icon type="folder" /> {props.data.typeStr}</span>
                  <span><Icon type="fire" /> {props.data.viewNumber}</span>
                </div>

                  <div className="detailed-content"
                    dangerouslySetInnerHTML = {{__html:html}}   >


                  </div>


             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6} >
            <Affix offsetTop={60}>
          <Author />
          <StudyLine/>
            </Affix>
          {/*<Advert />
          <Rightmi/>*/}

            {/*<div>

              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                <Skeleton loading={loading} active paragraph={{ rows: 6 }} >
                <div className="toc-list">
                {tocify && tocify.render()}
                </div>
                </Skeleton>
              </div>


            </div>*/}


        </Col>
      </Row>
      {/*<Footer/>*/}
      <BackTop />


   </>
  )
  //{tocify && tocify.render()}

}

Detailed.getInitialProps = async(context)=> {
    let date = new Date();


    let month = date.getMonth();
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time = month + '/' + day + '/' + hour + ':' + minute + ':' + second


    console.log('----->' + time + ':Visit the details page,parameter=' + context.query.id)
    //把ID强制转换成数字

    let id = parseInt(context.query.id)
    const promise = new Promise((resolve) => {
        axios({
            url: servicePath.getArticleById+id,
        }).then(
            (res) => {
                resolve(res.data)
            }
        )
    })
return await promise

}

export default Detailed
