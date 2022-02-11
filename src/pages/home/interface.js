// 登录
// api/user/login
// Post
// body: {
//   userName: string
//   password: number
//}


// 重置密码
// api/user/resetPassword
// Post
// body: {
//    old: number
//    new: number
//    repeat: number
// }

// 首页
// api/home
// Get || Post  
// Get的返回body和Post的请求body
// body: {
//     product: [ // 产品轮播图
//         { id:1,title:地质大数据,desc:地质大数据描述读后感，闪电发货根据宽度防火规范时代光华kg是读后感打发时间可更换},
//         { id:2,title:地质大数据11111,desc:地质大数据描述读后感，闪电发货根据宽度防火规范时代光华kg是读后感打发时间可更换},
//         { id:3,title:城市地质,desc:地质大数dsgdfgffg虢述读后感，闪电发货根据宽度防火规范时代光华kg是读后感打发时间可更换}
//     ],
//     solve: { // 解决方案
//       title: '解决方案'
//       list: [
//         { id:1,title:检测集成解决方案,desc:地质大数据描述读后感，闪电发货根据宽度防火规范时代光华kg是读后感打发时间可更换},
//         { id:2,title:三维扫描解决方案,desc:地质大数据描述读后感，闪电发货根据宽度防火规范时代光华kg是读后感打发时间可更换}, 
//         { id:3,title:海洋解决方案,desc:地质大数据描述读后感，闪电发货根据宽度防火规范时代光华kg是读后感打发时间可更换},
//       ]
//     },
//     news: { // 新闻咨询
//         title: '新闻咨询', // 一级标题
//         company: {
//            title: '公司新闻',// 一级标题
//            list: [1, 2, 3],
//         },
//         industry: {
//            title: '行业新闻',// 一级标题
//            list: [1, 2, 3],
//         },
//     },
//     partner: ['http://dj.sdgfhjh.com/a.jpg']
// }

// 获取产品模块
// api/product
// Get
// Get 请求参数  api/product?type=1&status=1&pageSize=10&page=1  // 参数均可缺省,分别代表产品类型，是否已发布
// Get 返回参数
// body: {
//   title: '产品列表',
//   bgUrl: 'http://dj.sdgfhjh.com/a.jpg',
//   imgUrl: 'http://dj.sdgfhjh.com/b.gif',
//   list: [
//     { id: 1, type: 1, title: '产品一', status: 1},
//     { id: 2, type: 1, title: '产品二', status: 0},
//   ]
// }

// 修改产品模块
// api/product
// Post
// 请求参数，同Get接口的返回参数
// body: {
//   title: '产品列表',
//   bgUrl: 'http://dj.sdgfhjh.com/a.jpg',
//   imgUrl: 'http://dj.sdgfhjh.com/b.gif',
//   list: [
//     { id: 1, type: 1, title: '产品一', status: 1},
//     { id: 2, type: 1, title: '产品二', status: 0},
//   ]
// }

// 新增一个产品 
// api/product/new
// Post
// 请求body: {
//   title: '产品三',
//   type: 1,
//   desc: '这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好',
//   html: 'html字符串'
// }
// 请求成功要同步到api/product接口，并且该条数据 status为0

// 编辑一个产品 
// api/product/id: 1
// Post
// 请求body: {
//   title: '产品三',
//   type: 1,
//   desc: '这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好这个产品非常非常好',
//   html: 'html字符串'
// }
// 请求成功要同步到api/product接口，并且该条数据 status为0

// 修改产品的状态
// api/product/changeStatus
// Post
// 请求body: {
//   id: number,
//   status: 1
// }
// 请求成功要同步到api/product接口

// 删除产品
// api/product
// Delete
// 请求body: {
//   id: number,
// }
// 请求成功要同步到api/product接口


// 解决方案模块
// 和产品模块基本一致
// api/solve
// api/solve/new
// api/solve/changeStatus


// 新闻模块
// 获取新闻列表
// api/news
// Get
// Get 请求参数  api/product?category=company&status=1&keyword=地质&startTime=2021-09-29&endTime=2022-01-01&filterId:1,2,3 
// 请求参数均可缺省,分别代表新闻类型是公司或行业新闻，是否已发布，关键字搜索，开始时间和结束时间, 新闻ID
// Get 返回参数
// body: {
//   title: {
//     company: '公司咨询',
//     industry: '行业咨询',
//   },
//   list: [
//     { type: 'company', title: '新闻一', publishTime: '2020-08-09'，desc: '新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一',
//       status: 1, coverUrl: 'http://dj.sdgfhjh.com/cover.jpg', 
//       isOffsiteLink: true, offsiteLinkUrl: 'http:www.weixin.com/news/1.html'
//     }, // 外链新闻
//     { type: 'industry, title: '新闻二', publishTime: '2020-08-10'，desc: '新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一新闻一',
//       status: 0, coverUrl: 'http://dj.sdgfhjh.com/cover.jpg', isOffsiteLink: false},
//   ]
// }

// 修改新闻模块
// api/news
// Post
// 请求参数，同Get接口的返回参数
// body: {
//   title: {
//     company: '公司咨询',
//     industry: '行业咨询',
//   },
// }


// 新增一个新闻
// api/news/new
// Post
// 请求body: {
//   title: '新闻三',
//   type: conpany,
//   desc: '新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三',
//   publishTime: '2020-08-09',
//   coverUrl: 'http://dj.sdgfhjh.com/cover.jpg', 
//   isOffsiteLink: true, 
//   offsiteLinkUrl: 'http:www.weixin.com/news/1.html'   
//   html: 'html字符串' // outsiteLink和html互斥
// }
// 请求成功要同步到api/news接口，并且该条数据 status为0


// 新增一个新闻
// api/news/new/id: 1
// Post
// 请求body: {
//   title: '新闻三',
//   type: conpany,
//   desc: '新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三新闻三',
//   publishTime: '2020-08-09',
//   coverUrl: 'http://dj.sdgfhjh.com/cover.jpg', 
//   isOffsiteLink: true, 
//   offsiteLinkUrl: 'http:www.weixin.com/news/1.html'   
//   html: 'html字符串' // outsiteLink和html互斥
// }

// 请求成功要同步到api/news接口，并且该条数据 status为0


// 修改新闻的状态
// api/news/changeStatus
// Post
// 请求body: {
//   id: number,
//   status: 1
// }
// 请求成功要同步到api/product接口

// 删除产品
// api/news
// Delete
// 请求body: {
//   id: number,
// }
// 请求成功要同步到api/product接口



// 关于我们模块
// api/about
// Get || Post
// Get返回参数和Post请求参数
// body: {
//   banner: {
//     title: '关于我们',
//     bgUrl: 'http://dj.sdgfhjh.com/a.jpg',
//     imgUrl: 'http://dj.sdgfhjh.com/b.gif',
//   },
//   introduction: {
//     desc: '我们的使命是HGF都很高恢复的更好地发鬼地方挂号费端口号',
//     title: '企业介绍'
//   },
//   values：{
//     title: '价值观',
//     list: [
//       {
//         title: '愿景一',
//         desc: 'sdjghfdjhdhgdfhg ',
//         imgUrl: 'http://dj.sdgfhjh.com/b.gif'
//       },
//       {
//         title: '愿景二',
//         desc: 'sdjghfdjhdhgdfhg ',
//         imgUrl: 'http://dj.sdgfhjh.com/b.gif'
//       },
//     ]
//   },
//   credentials: [
//      {
//        title: '证书一',
//        imgUrl: 'http://dj.sdgfhjh.com/b.gif'
//      },
//   ]
//  history: [
//      {
//        date: '2010-08-20',
//       title: '里程碑一',
//       desc: 'dsghjhkfdhgfhgkjh'
//     },
//     {
//       date: '2010-08-02',
//       title: '里程碑二',
//       desc: 'dsghjhkfdhgfhgkjh'
//     },
// ]
// }


// 关于招贤纳士
// api/recruit
// Get || Post
// Get返回参数和Post请求参数
// body: {
//   title: '招贤纳士',
//   bgUrl: 'http://dj.sdgfhjh.com/a.jpg',
//   imgUrl: 'http://dj.sdgfhjh.com/b.gif',
//   list: [{
//     job: '前端开发工程师',
//     require: ['要求一防抖和改动后分隔符', '要求二继续分化个开发工具'],
//     duties: ['职责一防抖和改动后分隔符', '职责二继续分化个开发工具'],
//     email: '3284354@qq.com'
//   }],
// }


// 联系我们
// api/contact
// Get || Post
// Get返回参数和Post请求参数
// body: {
//     title: '联系我们',
//     bgUrl: 'http://dj.sdgfhjh.com/a.jpg',
//     imgUrl: 'http://dj.sdgfhjh.com/b.gif',
//     tel: ['1274673464376', '983453984757'],
//     email: ['3284354@qq.com']
//     fax: '0057-3245874375'
// }