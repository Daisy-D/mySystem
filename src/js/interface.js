// const context = 'http://101.200.233.12:8076';//本地地址
const context = ""
const uploadService = 'https://resource.elearnmooc.com'

var interfaceUrl = {
    // insertSession: {
    //     insertSession: 'http://101.200.233.12:8076/demo/insertSession'//session
    // },
    uploadService: {
        upload: uploadService + '/UploadService/rest/restService/upload?maxsize=20971520'//上传文件
    },
    background: {
        queryFocusImgList: context + '/background/queryFocusImgList.do',//焦点图列表
        editFocusImg: context + '/background/editFocusImg.do',//新增/修改焦点图
        moveFocusImg: context + '/background/moveFocusImg.do',//焦点图上移下移
        deleteFocusImg: context + '/background/deleteFocusImg.do',//焦点图删除
    },
    statisticsCtrl: {
        teaStatistics: context + '/statisticsCtrl/teaStatistics.do',//教师工作量统计列表
        exportTeaStatistics: context + '/statisticsCtrl/exportTeaStatistics.do',//导出教师工作量统计列表
        oneTeaStatistics: context + '/statisticsCtrl/oneTeaStatistics.do',//单个教师工作量统计
        exportOneTeaStatistics: context + '/statisticsCtrl/exportOneTeaStatistics.do',//导出单个教师工作量统计
        courseStatistics: context + '/statisticsCtrl/courseStatistics.do',//课程统计列表
        exportCourseStatistics: context + '/statisticsCtrl/exportCourseStatistics.do',//导出课程统计列表
        oneCourseStatistics: context + '/statisticsCtrl/oneCourseStatistics.do',//单个课程统计
        exportOneCourseStatistics: context + '/statisticsCtrl/exportOneCourseStatistics.do',//导出单个课程统计
        stuStatistics: context + '/statisticsCtrl/stuStatistics.do',//学生统计列表
        exportStuStatistics: context + '/statisticsCtrl/exportStuStatistics.do',//导出学生统计列表
        oneStuStatistics: context + '/statisticsCtrl/oneStuStatistics.do',//单个学生学习统计
        exportOneStuStatistics: context + '/statisticsCtrl/exportOneStuStatistics.do'//导出单个学生学习统计
    },
    course: {
        courseTrend: context + '/course/courseTrend',//课程管理-课程点击趋势
        welcomeAllCourse: context + '/course/welcomeAllCourse',//课程管理-最受欢迎的课程TOP10
        welcomeNNCourse: context + '/course/welcomeNNCourse'//课程管理-最受男女欢迎的课程TOP5
    },
    teacherDisplay: {//首页教师显示管理
        list: context + "/background/getTeacherList.do", //首页展示教师列表
        add: context + "/background/addIndexTeacher.do", //首页添加教师暨修改教师
        delete: context + "/background/delIndexTeacher.do" //首页删除教师
    },
    courseList: {//首页课程排序管理
        list: context + "/background/queryIndexCourseList.do", //分类列表
        course: context + "/background/getCourseByName.do" , //获取备选课程
        add: context + "/background/addCourseIndex.do", //分类添加课程
        move: context + "/background/moveIndexType.do", //首页分类移动顺序
        del: context + "/background/delCourseIndex.do", //分类删除内部课程
        show: context + "/background/hiddenShowIndexType.do", //控制模块显示和隐藏
        diyModule: context + "/background/addIndexType.do", //添加自定义分类
        hadModule: context + "/background/getIndexTypeList.do" ,//添加已有分类
        changeName: context + "/background/editModuleName.do", //修改分类名称
        delModule: context + "/background/deleteIndexType.do", //删除分类
        addHadModule: context + "/background/addExistIndexType.do"// 添加已有分类
    },
    courseAdmin: {//课程列表管理
        list: context + "/course/courseAdmin", //课程管理课程列表查询
        term: context + "/course/termInfo", //学期展开
        switch: context + "/course/stopCourse"//启用或停用课程展示
    },
    userManage: {//用户管理
        userList: context +'/userManage/userList.do',//用户列表
        userGroupList: context +'/userManage/userGroupList.do',//用户组列表
        resetPassword: context +'/userManage/resetPassword.do',//批量重置密码
        batchBlacklist: context +'/userManage/batchBlacklist.do',//批量拉进黑名单
        exportUser: context +'/userManage/exportUser.do',//导出用户
        addUser: context +'/userManage/addUser.do',//添加用户
        getUserInfo: context +'/userManage/queryUserInfo.do',//获取用户信息
        schoolList: context +'/userManage/schoolList.do',//学校列表
        majorList: context +'/userManage/professionList.do',//专业列表
        gradeList: context +'/userManage/gradeList.do',//年级列表
        jobtitleList: context +'/userManage/jobtitleList.do',//职称列表
        userGroupUserList:context + '/userManage/userGroupUserList.do',//用户组列表
        addUserGroupUser: context +'/userManage/addUserGroupUser.do',//添加本组用户
        removeUserGroupUser: context +'/userManage/removeUserGroupUser.do',//批量移除用户
        importUserList: context +'/userManage/importUserList.do',//导入用户地址
        importUserListBack: context +'/userManage/importStatisList.do',//返回导入用户列表
        checkUserEmail:context +'/userManage/checkUserEmail.do',//校验邮箱
        checkUserName:context +'/userManage/checkUserName.do',//校验用户名
        importTemplateLink:'https://resource.elearnmooc.com/UploadService/upload/SPOCUserTemplate.xlsx',//用户管理模板地址
    },
    bbsManage: {//论坛管理
        importFilterBatch:context + '/discussStatistics/importFilterContent',//批量导入过滤内容
        importFilterBatchList: context +'/discussStatistics/importFilterContentInfo',//批量导入过滤内容统计列表
        addFilter:context + '/discussStatistics/addFilterContent',//添加过滤内容
        filterList: context +'/discussStatistics/filterContentTypeList',//过滤内容分类列表
        searchFilter: context +'/discussStatistics/searchFilterContent',//搜索过滤内容
        deleteFilterBatch: context +'/discussStatistics/deleteFilterContent',//批量移除过滤内容
        importTemplateLink:'https://resource.elearnmooc.com/UploadService/upload/filtertest.xlsx',//过滤内容导入模板地址
    },
    classifyManage: {//首页分类管理
        courseTypeList: context + '/background/courseTypeList.do', //首页分类列表
        editCourseType: context + '/background/editCourseType.do', //新增/修改分类
        deleteCourseType: context + '/background/deleteCourseType.do', //分类删除
    },
    financialStatistics:{//财务管理
        financeStatistics: context + '/finance/financeStatistics', //财务统计
    },
    financeManageDetails:{//财务详情
        orderInfo: context + '/finance/orderInfo', //财务统计
    },
    userGroupManage:{//用户组管理
        userGroupList: context + '/userManage/userGroupList.do', //用户组列表
    },
    userListManage:{//用户列表
        userGroupUserList: context + '/userManage/userGroupUserList.do', //用户组人员列表查询
        addUserGroupUser: context + '/userManage/addUserGroupUser.do', //添加本组用户
        removeUserGroupUser: context + '/userManage/removeUserGroupUser.do', //批量移除用户
    },
};

export default interfaceUrl;
