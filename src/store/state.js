/**
 * 定义每页显示记录条数的下拉菜单选项
 * @type {Array}
 */
const pageSizes = [5, 10, 15, 20, 50, 100]

/**
 * pageSize：定义每页默认显示记录条数
 * @type {int}
 */
const pageSize = 10

/**
 * userGroup：用户组数据
 * @type {arr}
 */
const userGroup = []

/**
 * [identity 用户身份类型]
 * @type {Array}
 */
const identity = [{
  id: "1",
  title: "统一身份认证用户"
}, {
  id: "2",
  title: "内置用户"
}]

/**
 * [保存用户登录信息]
 * @type {Object}
 */
const user = {
  userinfo: {},
  rules: []
}

/**
 * guide_show：是否显示引导
 * @type {str}
 */
const guide_show = '2'

/**
 * [sliderNav_data 当前登录用户的左侧导航权限]
 * @type {Array}
 * @author leo
 */
const sliderNav_data = []

/**
 * [methodData 传值方式]
 * @type {Object}
 * @author zhy
 */
const methodData = [{
  title: 'PUT'
}, {
  title: 'GET'
}, {
  title: 'POST'
}, {
  title: 'DELETE'
}]

/**
 * [roles 导航菜单节点]
 * @type {Object}
 * @author zhy
 */
const roles = []

/**
 * [addRouters 动态路由]
 * @type {Object}
 * @author zhy
 */
const addRouters = []

/**
 * [Routers 路由]
 * @type {Object}
 * @author zhy
 */
const routers = []

/**
 * [originalTheme 颜色主题]
 * @type {string}
 * @author zhy
 */
const originalTheme = '#409EFF'

/**
 * [last_time 记录最后操作时间戳]
 * @type {booler}
 */
const last_time = ''

/**
 * [reviewData 审核状态]
 * @author zhy 2018-05-08
 * @type {Array}
 */
const reviewData = [{
    'id': 1,
    'title': '待审核',
    'color': 'default'
  },
  {
    'id': 2,
    'title': '审核通过',
    'color': 'success'
  },
  {
    'id': 3,
    'title': '退回修改',
    'color': 'danger'
  }
]

/**
 * [officeData 学术任职 任职事项]
 * @author sy 2018-07-23
 * @type {Array}
 */
const officeData = []

/**
 * [dutyData 学术任职 担任职务]
 * @author sy 2018-07-23
 * @type {Array}
 */
const dutyData = []

/**
 * [renzhiData 期刊任职 任职事项]
 * @author sy 2018-07-23
 * @type {Array}
 */
const renzhiData = []

/**
 * [zhiwuData 期刊任职 担任职务]
 * @author sy 2018-07-23
 * @type {Array}
 */
const zhiwuData = []

/***
 * [professorData 国内外知名大学客座教授 担任职务]
 * @author sy 2018-07-23
 * @type {Array}
 */
const professorData = []

/**
 * [GenreData 公共服务D 类型]
 * @author sy 2018-07-24
 * @type {Array}
 */
const GenreData = []

/**
 *  [GenreData 主办国际会议 会议类型]
 * @author sy 2018-07-26
 * @type {Array}
 */
const meetData = []

/**
 *  [GenreData 主办国际会议 主编国际会议论文集]
 * @author sy 2018-07-26
 * @type {Array}
 */
const lunwenData = [{
  id: 2,
  title: "有"
}, {
  id: 1,
  title: "无"
}]

/**
 * [lectureData 科普宣传 类型]
 * @author sy 2018-07-27
 * @type {Array}
 */
const lectureData = []

/**
 * [propagateData 科普宣传 宣传类型]
 * @author sy 2018-07-27
 * @type {Array}
 */
const propagateData = []

/**
 * [activityCategory 活动类型 参加国际会议]
 * @author sy 2018-08-09
 * @type {Array}
 */
const activityCategory = []

/**
 * [conferenData 参加形式 参加国际会议]
 * @author sy 2018-08-09
 * @type {Array}
 */
const participationData = []

/**
 * [xisuoData 系所]
 * @author zhy 2018-07-08
 * @type {Array}
 */
const xisuoData = [];

/**
 * [nations 民族]
 * @author zhy 2018-07-16
 * @type {Array}
 */
const nations = ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族",
  "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族",
  "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族",
  "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"
]

/**
 * [LastModified 缓存时间]
 * @author zhy 2018-07-24
 * @type {Array}
 */
const LastModified = []

/**
 * [avatar 头像]
 * @author zhy 2018-08-01
 * @type {Array}
 */
const avatarData = []

const state = {
  pageSizes: pageSizes,
  pageSize: pageSize,
  user: user,
  sliderNavData: sliderNav_data,
  last_time: last_time,
  methodData: methodData,
  roles: roles,
  addRouters: addRouters,
  routers: routers,
  userGroup: userGroup,
  identity: identity,
  originalTheme: originalTheme,
  reviewData: reviewData,
  xisuoData: xisuoData,
  nations: nations,
  officeData: officeData, //学术任职 任职事项
  dutyData: dutyData, //学术任职 担任职务
  renzhiData: renzhiData, //期刊任职 任职事项
  zhiwuData: zhiwuData, //期刊任职 担任职务
  professorData: professorData, //国内外知名大学客座教授
  LastModified: LastModified,
  GenreData: GenreData, //公共服务D 服务类型
  meetData: meetData, //主办国际会议类型
  lunwenData: lunwenData, //主编国际会议论文集
  lectureData: lectureData, //科普宣传类型
  propagateData: propagateData, //科普宣传 宣传类型
  avatarData: avatarData,
  activityCategory: activityCategory, // 活动类型 参加国际会议
  participationData: participationData, //参加形式 参加国际会议
  guide_show: guide_show //第一次进系统显示引导
}

export default state
