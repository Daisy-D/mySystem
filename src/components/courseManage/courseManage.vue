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
        }
    }

    /*---------课程卡片---------*/
    .cardWrap {
        min-height: 239px;
        background-color: #ffffff;
        border: 1px solid @borderColor;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: @baseShadow;
        padding: 30px 20px;
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
        .title {
            border-bottom: 1px solid @borderColor;
            height: 36px;
            line-height: 1;
            .inputWarp {
                display: inline-block;
                position: relative;
                height: 25px;
                min-width: 260px;
                border: 0;
                border-bottom: 1px solid @baseBorderColor;
                border-radius: 5px;
                font-size: 17px;
                line-height: 1;
                /*transition: all ease 0.5s;*/
                &.noBorder {
                    min-width: 0;
                    width: auto;
                    border: 0;
                }
                span{
                    display: inline-block;
                    visibility: hidden;
                    height: 25px;
                }
                .info {
                    border: 0;
                    top: -1px;
                    width: 100%;
                    position: absolute;
                    color: @TitleFontColor;
                    height: 24px;
                    box-sizing: border-box;
                    text-align: left;
                    line-height: 25px;
                    outline: 0;
                }
            }
            .ivu-checkbox-wrapper {
                color: @TitleFontColor;
                font-size: 14px;
            }
            .tip {
                display: inline-block;
                color: #aaa;
                font-size: 12px;
                padding-top: 4px;
            }
            .edit {
                top: 4px;
                position: relative;
                margin: 0 5px;
                display: inline-block;
                cursor: pointer;
                width: 16px;
                height: 16px;
                background: url("../../images/classifyManage/pen.png") no-repeat center;
            }
        }
        .controlIndex {
            float: right;
            font-size: 12px;
            color: #aaa;
            .up {
                display: inline-block;
                cursor: pointer;
                width: 36px;
                height: 12px;
                margin-right: 19px;
                background: url("../../images/courseManage/up.png") no-repeat center right;
            }
            .down {
                background: url("../../images/courseManage/down.png") no-repeat center right;
                width: 36px;
                height: 12px;
                float: right;
                margin-right: 19px;
                cursor: pointer;
            }
            .del{
                color: #ff0f0f;
                cursor: pointer;
                height: 12px;
                width: 36px;
                float: right;
            }
        }
        .cardList {
            .tip {
                margin: 21px 0 10px;
                color: #aaa;
                font-size: 12px;
                line-height: 1;
                .error {
                    float: right;
                    color: #f00000;
                }
            }
            .card {
                width: 182px;
                margin-left: 10px;
                height: 172px;
                position: relative;
                box-sizing: border-box;
                border: 1px solid @baseBorderColor;
                border-radius: 5px;
                float: left;
                .coursePic {
                    height: 101px;
                    display: block;
                    background: #e5e5e5;
                    width: 180px;
                    border: 0;
                }
                .name {
                    text-align: center;
                    margin: 10px auto 0;
                    width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: @TitleFontColor;
                    font-size: 14px;
                }
                .mask {
                    display: none;
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.8);
                    .btnWarp {
                        width: 148px;
                        height: 32px;
                        margin: 70px auto 0;
                    }
                }
                .course:hover {
                    .mask {
                        display: block;
                    }
                }
                .addCourse {
                    cursor: pointer;
                    padding-top: 112px;
                    text-align: center;
                    width: 100%;
                    height: 170px;
                    color: #aaa;
                    background: #f7f7f7 url("../../images/courseManage/addCourse.png") no-repeat center 48px;
                }
            }
        }
    }

    /*----------新增按钮--------*/
    .longAddCourse {
        height: 42px;
        margin-top: 20px;
        .diyBtn, .hadBtn {
            width: 49%;
            float: left;
            cursor: pointer;
            height: 42px;
            box-sizing: border-box;
            border: 1px dashed #e5e5e5;
            border-radius: 5px;
            line-height: 42px;
            text-align: center;
            color: @TitleFontColor;
            font-size: 14px;
            transition: all ease-in-out 0.3s;
            &:hover {
                border-color: darken(#e5e5e5, 10%);
                background: #ffffff;
                color: lighten(@TitleFontColor, 10%);
            }
        }
        .hadBtn {
            float: right;
        }
    }

    /*-----------弹窗-----------*/
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
    .subjectModal{
        .ivu-select-single .ivu-select-dropdown{
            position: relative !important;
            top: 0!important;
            left: 0!important;
        }
    }
    .ivu-modal-confirm-footer{
        padding-bottom: 10px;
    }
</style>
<template>
    <div class="courseManage">
        <header class="header">
            <h1 class="title">首页课程排序</h1>
            <p class="tip">系统默认为显示推荐课程、最新课程、一个系统分类</p>
        </header>
        <div class="cardWrap" v-for="( item,index) in data" :key="index">
            <div class="title">
                <div class="inputWarp" :class="{ 'noBorder': item.noWrite}">
                    <input v-model="item.name" class="info" :readonly="item.noWrite" maxlength="15"
                    @blur="stopWrite(item)" ><span v-html="item.name"></span>
                </div>
                <span class="edit" @click="changeWrite(index,item)"></span>
                <Checkbox v-model="item.display" @on-change="save(item)" >显示</Checkbox>
                <p class="tip">取消复选框将不显示推荐课程</p>
                <div class="controlIndex">
                    <span class="up" v-if="index !== 0" @click="moveCard(item,1)">上移</span>
                    <span class="del" @click="openDelModule(item)">删除</span>
                    <span class="down" @click="moveCard(item,2)">下移</span>
                </div>
            </div>
            <div class="cardList clearFix">
                <p class="tip"><span>预计会显示以下课程，管理员可修改显示课程</span><span class="error" v-if="item.error">定义首页显示失败，不足四门课程，未能保存成功</span></p>
                <div class="card" style="margin-left: 0">
                    <div v-if="item.course1 && item.course1.courseName" class="course">
                        <img class="coursePic" :src="item.course1.img">
                        <p class="name">{{item.course1.courseName}}</p>
                        <div class="mask">
                            <div class="btnWarp">
                                <Button type="primary" style="width: 67px;" @click="addCourse(item,1)">更换</Button>
                                <Button type="primary" style="width: 67px;margin-left: 10px"  @click="delCourse(item,1)">移除</Button>
                            </div>
                        </div>
                    </div>
                    <div class="addCourse" v-else @click="addCourse(item,1)">添加课程</div>
                </div>
                <div class="card">
                    <div v-if="item.course2 && item.course2.courseName" class="course">
                        <img class="coursePic" :src="item.course2.img">
                        <p class="name">{{item.course2.courseName}}</p>
                        <div class="mask">
                            <div class="btnWarp">
                                <Button type="primary" style="width: 67px;" @click="addCourse(item,2)">更换</Button>
                                <Button type="primary" style="width: 67px;margin-left: 10px"  @click="delCourse(item,2)">移除</Button>
                            </div>
                        </div>
                    </div>
                    <div class="addCourse" v-else @click="addCourse(item,2)">添加课程</div>
                </div>
                <div class="card">
                    <div v-if="item.course3 && item.course3.courseName" class="course">
                        <img class="coursePic" :src="item.course3.img">
                        <p class="name">{{item.course3.courseName}}</p>
                        <div class="mask">
                            <div class="btnWarp">
                                <Button type="primary" style="width: 67px;" @click="addCourse(item,3)">更换</Button>
                                <Button type="primary" style="width: 67px;margin-left: 10px"  @click="delCourse(item,3)">移除</Button>
                            </div>
                        </div>
                    </div>
                    <div class="addCourse" v-else @click="addCourse(item,3)">添加课程</div>
                </div>
                <div class="card">
                    <div v-if="item.course4 && item.course4.courseName" class="course">
                        <img class="coursePic" :src="item.course4.img">
                        <p class="name">{{item.course4.courseName}}</p>
                        <div class="mask">
                            <div class="btnWarp">
                                <Button type="primary" style="width: 67px;" @click="addCourse(item,4)">更换</Button>
                                <Button type="primary" style="width: 67px;margin-left: 10px" @click="delCourse(item,4)">移除</Button>
                            </div>
                        </div>
                    </div>
                    <div class="addCourse" v-else @click="addCourse(item,4)">添加课程</div>
                </div>
            </div>
        </div>
        <div class="longAddCourse clearFix">
            <div class="diyBtn" @click="openDiyModule">添加自定义分类</div>
            <div class="hadBtn" @click="openHadModule">添加已有分类</div>
        </div>
        <Modal
                v-model="modal"
                :mask-closable="false"
                :scrollable="false"
                class-name="subjectModal"
        >
            <p class="title">请输入课程名称</p>
            <Input v-model="formValidate.name" :maxlength="20" @input="getReadyCourse"></Input>
            <div class="autoPrefix">
                <p class="item" v-for="(item,index) in readyCourseList" :key="index" @click="chooseCourse(item)">{{item.courseName}}</p>
            </div>
            <div slot="footer">
                <Button type="ghost" @click="closeModal" class="modalBtn cancel">取消</Button>
                <Button type="primary" class="modalBtn sure" @click="addReadyCourse">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="modal_diy"
                :mask-closable="false"
                :scrollable="false"
                class-name="subjectModal"
        >
            <p class="title">请输入分类名称</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="name">
                    <Input v-model="formValidate.moduleName" :maxlength="20" @input="getReadyCourse"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeDiyModule" class="modalBtn cancel">取消</Button>
                <Button type="primary" class="modalBtn sure" @click="addDiyModule">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="modal_had"
                :mask-closable="false"
                :scrollable="false"
                class-name="subjectModal"
        >
            <p class="title">请选择分类名称</p>
            <Form ref="formHad" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="hadModule">
                    <Select v-model="formValidate.hadModule" placeholder="请选择分类" style="width: 440px;">
                        <Option v-for="item in hadModlueList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeHadModule" class="modalBtn cancel">取消</Button>
                <Button type="primary" class="modalBtn sure" @click="hadModule">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="modal_del"
                :mask-closable="false"
                :scrollable="false"
                class-name="subjectModal"
        >
            <p class="title">你确定要删除该分类吗？</p>
            <div slot="footer">
                <Button type="ghost" @click="closeDelModule" class="modalBtn cancel">取消</Button>
                <Button type="primary" class="modalBtn sure" @click="delModule">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import request from '../../js/util'
    import url from '../../js/interface'

    export default {
        name: "courseManage",
        data() {
            return {
                data: [],
                modal: false,
                hadModlueList: [],
                modal_diy: false,
                modal_had: false,
                modal_del: false,
                formValidate: {
                    name: "",
                    moduleName: "",
                    hadModule: ""
                },
                ruleValidate: {
                    moduleName: [
                        {required: true, trigger: "blur", message: "请输入正确的分类名称"}
                    ],
                    hadModule: [
                        {validator: (rule, value, callback) => {
                            if(value){
                                callback()
                            }else{
                                callback(new Error("请选择分类"))
                            }
                        }, trigger: "change"}
                    ]
                },
                focusSubject: {},
                focusModule: {},
                readyCourseList: []
            }
        },
        mounted() {
            this.getCourseList()
            this.getHadModuleList()
        },
        methods: {
            /*
            * 修改模块名称
            * */
            changeWrite(index, item) {
                if(!item.noWrite) return
                item.noWrite = false
                document.querySelectorAll('.cardWrap')[index].querySelector('.info').focus()
            },
            stopWrite(data) {
                data.noWrite = true
                let that = this
                window.loadingView.show()
                request.ajax.post(url.courseList.changeName,{
                    id: data.id,
                    name: data.name
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.$Message.success(data.message)
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            /*
            * 展示与隐藏课程分类
            * */
            save(data) {
                if(data.display && data.courseList.length !== 4){
                    data.error = true
                    return false
                }
                let that = this
                window.loadingView.show()
                request.ajax.post(url.courseList.show,{
                    id: data.id,
                    showType: data.display ? 1 : 2
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(() => {
                        that.getCourseList()
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            /*
            * 移动分类
            * */
            moveCard(data,type) {
                let that = this
                window.loadingView.show()
                request.ajax.post(url.courseList.move,{
                    id: data.id,
                    moveType: type
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(() => {
                        that.getCourseList()
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            /*
            * 开启和关闭弹窗
            * */
            openModal() {
                this.modal = true
            },
            closeModal() {
//                this.$refs.formValidate.resetFields()
                this.formValidate.name = ""
                this.readyCourseList = []
                this.modal = false
            },
            /*
            * 获取分类列表
            * */
            getCourseList() {
                let that = this
                window.loadingView.show()
                request.ajax.get(url.courseList.list).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.handleData(data)
                    })
                    middle.thenError(error => {
                        console.log(error)
                    })
                })
            },
            handleData(data){
                let objectList = []
                data.data.dataList.forEach(t => {
                    let copy = Object.assign(t,{
                        display: t.isShow === 1 ? true : false,
                        noWrite: true,
                        error: false,
                        course1: {},
                        course2: {},
                        course3: {},
                        course4: {}
                    })
                    /*copy.display = false
                    copy.noWrite = true
                    copy.error = false
                    copy.course1 = {}
                    copy.course2 = {}
                    copy.course3 = {}
                    copy.course4 = {}*/
                    t.courseList.forEach(i => {
                        if(i.index === 1){
                            copy.course1 = i
                        }
                        if(i.index === 2){
                            copy.course2 = i
                        }
                        if(i.index === 3){
                            copy.course3 = i
                        }
                        if(i.index === 4){
                            copy.course4 = i
                        }
                    })
                    objectList.push(copy)
                })

                this.data = objectList.sort((a, b) => {
                    return a.index - b.index
                })
            },
            /*
            * 选择需要添加课程的分类
            * */
            addCourse(item,index){
                this.focusSubject = {
                    subject: item.id,
                    index: index
                }
                this.openModal()
            },
            /*
            * 获取备选列表
            * */
            getReadyCourse(){
                if(!this.formValidate.name) {
                    this.readyCourseList = []
                    return
                }
                let that = this
//                window.loadingView.show()
                request.ajax.get(url.courseList.course,{
                    params: {
                        name: that.formValidate.name
                    }
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        if(data.data.dataList.length >= 5){
                            that.readyCourseList = data.data.dataList.slice(0,5)
                        }else{
                            that.readyCourseList = data.data.dataList
                        }
                    })
                    middle.thenError(error => {
                        console.log(error)
                    })
                })
            },
            /*
            * 选择备选课程
            * */
            chooseCourse(item){
                this.formValidate.name = item.courseName
                this.getReadyCourse()
                this.focusSubject.courseId = item.courseId
            },
            /*
            * 添加备选课程
            * */
            addReadyCourse() {
                if(!this.focusSubject.courseId){
                    this.$Message.warning("请先选择课程！")
                    return
                }
                let that = this
                window.loadingView.show()
                request.ajax.post(url.courseList.add,{
                    id : that.focusSubject.subject,
                    courseId: that.focusSubject.courseId,
                    index: that.focusSubject.index
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.getCourseList()
                        that.closeModal()
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            /*
            * 删除分类课程
            * */
            delCourse(data,index){
                let that = this
                window.loadingView.show()
                request.ajax.post(url.courseList.del,{
                    id: data.id,
                    index
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(() => {
                        that.getCourseList()
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            /*
            * 显示自定义分类
            * */
            openDiyModule(){
                this.modal_diy = true
            },
            closeDiyModule(){
                this.formValidate.moduleName = ""
                this.$refs.formValidate.resetFields()
                this.modal_diy = false
            },
            /*
            * 添加自定义分类
            * */
            addDiyModule(){
                let that = this
                this.$refs.formValidate.validate(res => {
                    if(res){
                        window.loadingView.show()
                        request.ajax.post(url.courseList.diyModule,{
                            name: that.formValidate.moduleName
                        }).then(result => {
                            let middle = request.checkAjaxJson(result)
                            middle.thenSuccess(() => {
                                that.closeDiyModule()
                                that.getCourseList()
                            })
                            middle.thenError(error => {
                                that.$Message.error(error.message)
                            })
                        })
                    }
                })
            },
            /*
            * 显示已有分类
            * */
            openHadModule(){
                this.modal_had = true
            },
            closeHadModule(){
                this.formValidate.hadModule = ""
                this.$refs.formHad.resetFields()
                this.modal_had = false
            },
            /*
            * 添加已有分类
            * */
            hadModule(){
                let that = this
                this.$refs.formHad.validate(res => {
                    if(res){
                        window.loadingView.show()
                        request.ajax.post(url.courseList.addHadModule,{
                            id: that.formValidate.hadModule
                        }).then(result => {
                            let middle = request.checkAjaxJson(result)
                            middle.thenSuccess(() => {
                                that.closeHadModule()
                                that.getCourseList()
                            })
                            middle.thenError(error => {
                                that.$Message.error(error.message)
                            })
                        })
                    }
                })
            },
            /*
            * 获取已有分类
            * */
            getHadModuleList(){
                let that = this
                window.loadingView.show()
                request.ajax.get(url.courseList.hadModule).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.hadModlueList = data.data.dataList
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            /*
            * 删除已有分类
            * */
            delModule(data){
                let that = this
                window.loadingView.show()
                request.ajax.post(url.courseList.delModule,{
                    id: that.focusModule.id
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(() => {
                        that.closeDelModule()
                        that.getCourseList()
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            closeDelModule(){
                this.modal_del = false
                this.focusModule = {}
            },
            openDelModule(data){
                this.focusModule = data
                this.modal_del = true
            }
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>