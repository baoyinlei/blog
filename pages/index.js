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
  const [ type , setType ] = useState( res.type);
  const [ bibidaoList , setBibidaoList ] = useState( res.bibidaoList);
  const [ loading,setLoading] =useState(false)





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
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={0}>
        <Header/>
      </Affix>


        <Row className="comm-main" type="flex" justify="center">
          <Col  xs={24} sm={24} md={18}  >

              <div className="comm-left">


                <List
                  header={<div className="list-header">最新文章</div>}
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
                        <span><Icon type="calendar" /> {item.createTime}</span>
                        <span><Icon type="folder" /> Java基础</span>
                        {/*<span><Icon type="fire" /><CountUp end={item.view_count} />人</span>*/}
                      </div>
                      <div className="list-context"
                          dangerouslySetInnerHTML={{__html:item.introduction}}
                      >
                      </div>
                      {/*<div className="list-go">
                          <Icon type="file" /> &nbsp;
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
            <Author />
            <Affix offsetTop={60}>
              {/*<Rightmi/>*/}
              <StudyLine/>
              {/*<Advert />*/}

            </Affix>

          </Col>
        </Row>

      <Footer/>
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



  console.log('----->'+time+':Visit the Index page')


  const promise = new Promise((resolve)=>{
      axios(servicePath.indexBlogList).then(
          (res)=>{
              console.log("==============")
              console.log(res.data)
              resolve(res.data)
          }
      )
  })

  return await promise
}

export default Home
