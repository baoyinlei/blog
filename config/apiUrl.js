let ipUrl = 'http://localhost:8080/blog/'
//let ipUrl = 'http://192.168.0.105:7001/default/'

let servicePath = {
    indexBlogList:ipUrl + 'indexBlogList' ,  //  首页文章列表接口
    getArticleById:ipUrl + 'getDetailById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:ipUrl + 'indexType',         // 文章分类信息
    getListById:ipUrl + 'getListById/',         // 根据类别ID获得文章列表
    getAllPartCount:ipUrl + 'getAllPartCount',         // 获得所有集数和访问数
    getListBBD:ipUrl + 'getListBBD',         // 大胖逼逼叨的列表

}

export default servicePath;
