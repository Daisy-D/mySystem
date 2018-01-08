const routers = [
    {
        path: '/',
        meta: {
            title: '用户列表',
            by: 'cmwang'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/userManage/userList.vue'))
            }, 'index')
        }
    },
    {
        path: '/classifyManage',
        meta: {
            title: '分类管理',
            by: 'longjia'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/classifyManage/classifyManage.vue'))
            }, 'classifyManage')
        }
    },
    {
        path: '/userList',
        meta: {
            title: '用户列表',
            by: 'cmwang'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/userManage/userList.vue'))
            }, 'userList')
        }
    },
    {
        path: "/teacherDisplay",
        meta: {
            title: '教师显示管理',
            by: 'tjru'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/teacherDisplay'))
            }, 'teacherDisplay')
        }
    },
    {
        path: "/financeManageDetails",
        meta: {
            title: '财务统计',
            by: 'longjia'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/financeManageDetails/financeManageDetails.vue'))
            }, 'financeManageDetails')
        }
    },
    {
        path: "/courseManage",
        meta: {
            title: '课程排序',
            by: 'tjru'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/courseManage'))
            }, 'courseManage')
        }
    },
    { 
        path: "/focusPic",
        meta: {
            title: '焦点图管理',
            by: 'tjru'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/homeManage/focusPic.vue'))
            }, 'focusPic')
        } 
    },
    {
        path: "/userListManage",
        meta: {
            title: '用户组管理',
            by: 'longjia'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/userListManage/userListManage.vue'))
            }, 'userListManage')
        } 
    },
    {
        path: "/courseList",
        meta: {
            title: '课程列表',
            by: 'tjru'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/courseList'))
            }, 'courseListcourseList')
        } 
    },
    {
        path: "/teacherAnalysisDetails",
        meta: {
            title: '教师',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/teacher/analysisDetails.vue'))
            }, 'teacherAnalysisDetails')
        } 
    },
    {
        path: "/teacherAnalysisList",
        meta: {
            title: '教师',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/teacher/analysisList.vue'))
            }, 'teacherAnalysisList')
        } 
    },
    {
        path: "/courseAnalysisDetails",
        meta: {
            title: '课程',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/course/analysisDetails.vue'))
            }, 'courseAnalysisDetails')
        } 
    },
    {
        path: "/courseAnalysisList",
        meta: {
            title: '课程',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/course/analysisList.vue'))
            }, 'courseAnalysisList')
        } 
    },
    {
        path: "/studentAnalysisDetails",
        meta: {
            title: '学生',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/student/analysisDetails.vue'))
            }, 'studentAnalysisDetails')
        } 
    },
    {
        path: "/studentAnalysisList",
        meta: {
            title: '学生',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/student/analysisList.vue'))
            }, 'studentAnalysisList')
        } 
    },
    {
        path: "/visualizedAnalysis",
        meta: {
            title: '可视化分析',
            by: 'xldai'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/statisticsManage/visualizedAnalysis.vue'))
            }, 'visualizedAnalysis')
        } 
    },
    {
        path: "/addUser",
        meta: {
            title: '添加用户',
            by: 'cmwang'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/userManage/addUser.vue'))
            }, 'addUser')
        } 
    },
    {
        path: "/batchImport",
        meta: {
            title: '批量导入',
            by: 'cmwang'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/userManage/batchImport.vue'))
            }, 'batchImport')
        } 
    },
    {
        path: "/contentFilter",
        meta: {
            title: '内容过滤',
            by: 'cmwang'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/bbsManage/contentFilter.vue'))
            }, 'contentFilter')
        } 
    },
    {
        path: "/financialStatistics",
        meta: {
            title: '财务统计',
            by: 'longjia'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/financialStatistics/financialStatistics.vue'))
            }, 'financialStatistics')
        } 
    },
    {
        path: "/userGroupManage",
        meta: {
            title: '用户组管理',
            by: 'longjia'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/userGroupManage/userGroupManage.vue'))
            }, 'userGroupManage')
        } 
    },
    {
        path: "/batchImportFilter",
        meta: {
            title: '论坛导入',
            by: 'cmwang'
        },
        component: (resolve) => {
            require.ensure([], () => {
                return resolve(require('./components/bbsManage/batchImport.vue'))
            }, 'batchImportFilter')
        } 
    },
]
export default routers