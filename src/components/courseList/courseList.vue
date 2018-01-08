<style lang="less" scoped>
    @import "../../styles/theme";

    @borderColor: #e5e5e5;

    /*---------标题----------*/
    .header {
        height: 42px;
        overflow: hidden;
        .title {
            display: inline-block;
            color: @TitleFontColor;
            font-size: 22px;
            line-height: 1;
            font-weight: normal;
        }
        .tip {
            display: inline-block;
            text-indent: 10px;
            color: #aaa;
            font-size: 12px;
            .focus {
                color: @baseThemeColor;
                font-size: 16px;
            }
        }
    }

    /*--------盒子-----------*/
    .box {
        padding: 20px;
        background: #ffffff;
        border: 1px solid @baseBorderColor;
        box-sizing: border-box;
        box-shadow: @baseShadow;
        border-radius: 5px;
        .boxHeader {
            height: 34px;
            margin-bottom: 14px;
            .searchComponent {
                float: right;
                height: 32px;
                width: 270px;
            }
            .sortBox {
                display: inline-block;
                width: 240px;
                padding-left: 10px;
                .studentCount, .updateTime {
                    cursor: pointer;
                    display: inline-block;
                    height: 34px;
                    line-height: 34px;
                    font-size: 14px;
                    color: #aaaaaa;
                    width: 95px;
                    &.down {
                        background: url("../../images/courseList/sortDown.png") no-repeat center right;
                    }
                    &.up {
                        background: url("../../images/courseList/sortUp.png") no-repeat center right;
                    }
                    &.sort{
                        background: url("../../images/courseList/sort.png") no-repeat center right;
                    }
                }
                .updateTime {
                    float: right;
                }
            }
        }
    }

    /*-------课程列表--------*/
    .courseBox {
        .courseItem {
            padding: 20px 10px;
            min-height: 123px;
            border-top: 1px solid @baseBorderColor;
            transition: all ease-in-out 0.5s;
            .pic {
                float: left;
                display: inline-block;
                width: 150px;
                height: 83px;
                background-color: #f4f4f4;
                img {
                    float: left;
                    width: 150px;
                    height: 83px;
                    border: 0;
                    outline: 0;
                }
            }
            .info {
                width: 330px;
                float: left;
                min-height: 83px;
                margin-left: 10px;
                &.down {
                    .expand {
                        background: url("../../images/courseList/expandDown.png") no-repeat 52px center;
                    }
                    .classList {
                        display: none;
                    }
                }
                &.up {
                    .expand {
                        background: url("../../images/courseList/expandUp.png") no-repeat 52px center;
                    }
                    .classList {
                        display: block;
                    }
                }
                .title {
                    overflow: hidden;
                    height: 16px;
                    font-size: 14px;
                    color: @TitleFontColor;
                    line-height: 1;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .teacher {
                    margin: 10px 0 18px;
                    font-size: 14px;
                    color: #686868;
                    line-height: 1;
                    .label {
                        margin-right: 10px;
                    }
                }
                .expandWrap {
                    height: 26px;
                    line-height: 26px;
                    font-size: 14px;
                    color: #686868;
                    .count {
                        margin: 0 20px 0 7px;
                    }
                    .expand {
                        display: inline-block;
                        width: 70px;
                        height: 26px;
                        box-sizing: border-box;
                        border: 1px solid #dddddd;
                        line-height: 26px;
                        cursor: pointer;
                        border-radius: 5px;
                        text-indent: 14px;
                    }
                }
                .classList {
                    margin-top: 10px;
                    li {
                        height: 32px;
                        border-top: 1px solid @baseBorderColor;
                        font-size: 12px;
                        color: #686868;
                        span {
                            display: inline-block;
                            height: 32px;
                            line-height: 32px;
                        }
                        .name {
                            width: 100px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .time, .status {
                            float: right;
                        }
                        .status {
                            margin-right: 5px;
                        }
                    }
                }
            }
            .control {
                width: 90px;
                float: right;
                height: 83px;
                .switch {
                    float: right;
                    height: 28px;
                    margin-top: 40px
                }
                .count {
                    float: right;
                    font-size: 12px;
                    color: @TitleFontColor;
                    span {
                        font-size: 18px;
                    }
                }
            }
        }
    }

    /*--------分页-----------*/
    .page {
        border-top: 1px solid #e0e1e2;
        height: 52px;
        background-color: #ffffff;
        line-height: 52px;
        .Pager {
            position: relative;
            left: 50%;
            transform: translate(-50%, 0);
            float: left
        }
    }
    /*--------弹窗----------*/
    .subjectModal {
        .modalBtn {
            width: 118px;
            height: 38px;
            line-height: 1;
        }
        .sure {
            margin-left: 18px;
            color: @ButtonFontColor;
            background-color: @ButtonBgColor;
            border: 1px solid @ButtonBorderColor;
            &:hover {
                background-color: lighten(@ButtonBgColor, 10%);
            }
        }
        .title {
            font-size: 17px;
            height: 36px;
            text-align: center;
            color: @TitleFontColor;
            line-height: 1;
        }
        .autoPrefix{
            p{
                margin-top: 10px;
                height:30px;
                font-size: 12px;
                color: #aaaaaa;
                background-color: #f7f7f7;
                line-height: 30px;
                cursor: pointer;
            }
        }

    }
</style>
<style lang="less">
    /*修改默认输入框背景色*/
    .boxHeader .searchComponent {
        input {
            background: #f4f4f4;
        }
    }
</style>
<template>
    <div class="courseList">
        <header class="header">
            <h1 class="title">课程列表</h1>
            <p class="tip">
                本平台课程目前<span class="focus">{{allCourse}}</span>门&nbsp;&nbsp;&nbsp;&nbsp;
                已发布<span class="focus">{{published}}</span>门&nbsp;&nbsp;&nbsp;&nbsp;
                未发布<span class="focus">{{unPublish}}</span>门</p>
        </header>
        <div class="box">
            <div class="boxHeader">
                <div class="sortBox">
                    <span class="studentCount" :class="{'up':countUp, 'sort': !countUp && !countDown, 'down': countDown}" @click="setSortConfig('count')">按学习人数</span>
                    <span class="updateTime" :class="{'up':timeUp,'sort': !timeUp && !timeDown, 'down': timeDown}" @click="setSortConfig('time')">按更新时间</span>
                </div>
                <Input v-model="keyWords" class="searchComponent" placeholder="请输入课程名" icon="ios-search-strong"
                       @on-click="search" @on-enter="search"></Input>
            </div>
            <div class="courseBox">
                <!------------------------------------------single course item   start-------------------------->
                <div class="courseItem clearFix" v-for="(item,index) in data" :key="index">
                    <div class="pic">
                        <img :src="item.photoUrl" alt="">
                    </div>
                    <div class="info" :class="{'up': item.expand, 'down': !item.expand}">
                        <p class="title">{{item.courseName}}</p>
                        <p class="teacher"><span class="label">{{item.teacherName}}</span><span
                                class="name">{{item.schoolName}}</span></p>
                        <p class="expandWrap">
                            <span class="label">学期：</span>
                            <span class="count">{{item.termTotal}}</span>
                            <span class="expand"
                                  @click="expandTerm(item)">{{item.expand ? "收起" : "展开"}}</span>
                        </p>
                        <ul class="classList">
                            <li v-for="(term, i ) in item.termList" :key="i">
                                <span class="name">{{term.termName}}</span>
                                <span class="time">{{term.isPublishTotal}}/{{term.sectionTotal}}</span>
                                <span class="status">{{term.isPublishTotal > 0 ? '已发布' : '未发布'}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="control">
                        <p class="count">共<span>{{item.studentTotal}}</span>人学习</p>
                        <p class="switch">
                            <i-switch size="large" v-model="item.show" @on-change="openSwitch(item.show,item)">
                                <span slot="open">启用</span>
                                <span slot="close">停用</span>
                            </i-switch>
                        </p>
                    </div>
                </div>
                <!------------------------------------------single course item   end---------------------------->
                <div class="page">
                    <Page :total="page.total" :current="page.index" show-elevator show-total @on-change="go"
                          v-if="data && data.length !== 0" placement="top" class="Pager"></Page>
                </div>
            </div>
        </div>
        <Modal
                v-model="modal_sure"
                :mask-closable="false"
                :scrollable="false"
                class-name="subjectModal"
        >
            <p class="title">本课程已推荐至首页，无法停用。</p>
            <p class="title">如需停用本课程，请先取消本课程的首页推荐</p>
            <div slot="footer">
                <Button type="primary" class="modalBtn sure" @click="modal_sure = false">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import request from '../../js/util'
    import url from '../../js/interface'

    export default {
        name: "courseList",
        data() {
            let page = {
                index: 1,
                size: 10,
                total: 10
            }
            return {
                allCourse: 0,
                published: 0,
                unPublish: 0,
                keyWords: "",
                searchName: "",
                data: [],
                page,
                sortCenter: {
                    orderType: "",
                    sequence: "",
                    count: 0,
                    time: 0
                },
                modal_sure: false
            }
        },
        mounted() {
            this.getCourseInfo()
        },
        computed:{
            countUp(){
                return this.sortCenter.orderType === 1 && this.sortCenter.sequence === 1
            },
            countDown(){
                let res = false
                if(this.sortCenter.orderType === 1 && this.sortCenter.sequence === 2){
                    res =  true
                }
                return res
            },
            timeUp(){
                return this.sortCenter.orderType === 2 && this.sortCenter.sequence === 1
            },
            timeDown(){
                let res = false
                if(this.sortCenter.orderType === 2 && this.sortCenter.sequence === 2){
                    res =  true
                }
                return res
            }
        },
        methods: {
            search() {
                this.searchName = this.keyWords
                this.page.index = 1
                this.getCourseInfo()
            },
            go(index) {
                this.page.index = index
                this.getCourseInfo()
            },
            getCourseInfo() {
                let that = this
                window.loadingView.show()
                request.ajax.get(url.courseAdmin.list, {
                    params: {
                        searchCourseName: that.searchName,
                        currentPage: that.page.index,
                        pageSize: that.page.size,
                        orderType: that.sortCenter.orderType,
                        sequence: that.sortCenter.sequence
                    }
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.setBaseData(data.data.dataList)
                        that.setPage(data.data.pageConfig)
                        that.setStaticCount(data.data.statisticsRet)
                    })
                    middle.thenError(error => {
                        console.log(error)
                    })
                })
            },
            setPage(config) {
                this.page.index = config.currentPage
                this.page.size = config.pageSize
                this.page.total = config.totalCount
            },
            setStaticCount(data) {
                this.allCourse = data.courseTotal
                this.published = data.isPublishTotal
                this.unPublish = data.noPublishTotal
            },
            setBaseData(data) {
                let that = this
                this.data = []
                data.forEach(t => {
                    t.expand = false
                    t.show = t.isDisable === 2 ? true : false
                    t.termList = []
                    that.data.push(t)
                })
            },
            setSortConfig(status) {
                this.sortCenter.orderType = status === 'count' ? 1 : 2
                this.sortCenter[status]++
                let now = this.sortCenter[status] % 3
                if (now === 0) {     //重置状态
                    this.sortCenter.orderType = ""
                    this.sortCenter.sequence = ""
                } else if (now === 1) {  //正序
                    this.sortCenter.sequence = 1
                } else {//倒序
                    this.sortCenter.sequence = 2
                }
                 this.getCourseInfo()
            },
            expandTerm(item){
                if(!Number(item.termTotal)) return
                if(item.termList.length){
                    item.expand = !item.expand
                }else{
                    window.loadingView.show()
                    request.ajax.get(url.courseAdmin.term, {
                        params: {
                            courseId: item.courseId
                        }
                    }).then(result => {
                        let middle = request.checkAjaxJson(result)
                        middle.thenSuccess(data => {
                            item.termList = data.data.dataList
                            item.expand = !item.expand
                        })
                        middle.thenError(error => {
                            console.log(error)
                        })
                    })
                }
            },
            openSwitch(res,item){
                let that = this
                window.loadingView.show()
                request.ajax.get(url.courseAdmin.switch, {
                    params: {
                        courseId: item.courseId,
                        type: res ? 2 : 1
                    }
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        res ? item.isDisable = 2 : item.isDisable = 1
                    })
                    middle.thenError(error => {
                        res ? item.isDisable = 1 : item.isDisable = 2
                        res ? item.show = false : item.show = true
                        that.modal_sure = true
                    })
                })
            }
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>