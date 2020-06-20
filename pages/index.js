import React,{useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Row, Col ,Tag, List ,Icon ,BackTop ,Spin ,Affix ,Card} from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Rightmi from '../components/Rightmi'
import StudyLine from '../components/StudyLine'
import '../static/style/pages/index.css'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'
import  servicePath  from '../config/apiUrl'
import CountUp from 'react-countup'


const Home = (res) =>{
  const [ mylist , setMylist ] = useState( res.data);
  const [ topList , setTopList ] = useState( res.topList);
  const [ bibidaoList , setBibidaoList ] = useState( res.bibidaoList);
  const [ loading,setLoading] =useState(false);
  const [title, setTitle] = useState(res.title?res.title:"最新文章");
  const [type, setType] = useState();





  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  });

  const goLoading= ()=>{

    setLoading(true)
  }

  return (
    <>

      <Head>
        <title>小鸡腿的博客</title>
        <meta name="description" content="小鸡腿的博客"></meta>
        <link rel="icon" href="https://byl-blog.oss-cn-hangzhou.aliyuncs.com/common/favicon.ico" mce_href="https://byl-blog.oss-cn-hangzhou.aliyuncs.com/common/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={0}>
        <Header/>
      </Affix>


        <Row className="comm-main" type="flex" justify="center">
          <Col  xs={24} sm={24} md={18}  >

              <div className="comm-left">


                <List
                  header={<div className="list-header">{title}</div>}
                  itemLayout="vertical"
                  dataSource={mylist}
                  renderItem={item => (
                    <List.Item>
                      <Spin spinning={loading}>
                      <div className="list-title" onClick={goLoading} >
                        <Link  href={{pathname:'/detailed',query:{id:item.id}}} >
                          <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                          {
                              item.isTop === 1? <span style={{color:"red"}}><Icon type="calendar" /> 置顶</span>:''
                          }

                        <span><Icon type="calendar" /> {item.createTime}</span>
                        <span><Icon type="folder" /> {item.typeStr}</span>
                        {/*<span><Icon type="fire" /><CountUp end={item.view_count} />人</span>*/}
                      </div>
                      <div className="list-context"
                          dangerouslySetInnerHTML={{__html:item.introduction}}
                      >
                      </div>
                      {/*<div className="list-go">
                          <Icon type="file" /> &nbsp;
                          <span className={"ant-tag ant-tag-red"}>置顶</span>
                          <span  onClick={goLoading} onClick={goLoading}>
                            <Link href={{pathname:'/detailed',query:{id:item.id}}} >
                              <a>查看全文 </a>
                            </Link>
                          </span>
                      </div>*/}
                      </Spin>
                    </List.Item>
                  )}
                />

              </div>
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={6} >
              <Affix offsetTop={60}>
                <Author />
              {/*<Rightmi/>*/}
              <StudyLine/>
              {/*<Advert />*/}

            </Affix>

          </Col>
        </Row>

      {/*<Footer/>*/}
      <BackTop />
   </>
  )

}

Home.getInitialProps = async (context)=>{

  let date=new Date();


  let month=date.getMonth();
  let day=date.getDate();

  let  hour=date.getHours();
  let minute=date.getMinutes();
  let second=date.getSeconds();
  let time=month+'/'+day+'/'+hour+':'+minute+':'+second

  const promise = new Promise((resolve)=>{
      axios({
          url: servicePath.indexBlogList,
          headers:{'Content-type':'application/json',},
          data: {
              title: context.query.title?context.query.title:"",
              type: context.query.type?context.query.type:"",
          },
      }).then(
          (res)=>{
              if (context.query.title) {
                  res.data.title = context.query.title
              }
              resolve(res.data)
          }
      )
  })
  return await promise
}

export default Home
