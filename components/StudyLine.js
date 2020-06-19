import '../static/style/components/studyLine.css'
import {Row,Col,Icon,List} from 'antd'

 const StudyLine = ()=>{
    return (
        <div className="comm-box">
          <div className="ls-main-title">文章分类</div>
            <List
                split = {false}
                size = "small"
                dataSource={[{id:"adf",title:"sdf"},{id:"qwer",title:"tyi"}]}
                renderItem={item => (
                    <List.Item>
                        <a style={{width:"100%"}} href="https://jspang.com/detailed?id=56" target="_blank">
                            <Row className="sl-row">
                                <Col span={22} className="sl-title"><Icon type="book"/>  {item.title}</Col>
                                <Col span={2}  className="sl-icon"><Icon type="right" /></Col>
                            </Row>
                        </a>
                    </List.Item>
                )}
            />
        </div>
    )
 }

 export default StudyLine
