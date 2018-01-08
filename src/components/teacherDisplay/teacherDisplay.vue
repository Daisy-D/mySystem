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
        .addTeacher {
            float: right;
            height: 30px;
            width: 148px;
            border-color: @ButtonBorderColor;
            background-color: @ButtonBgColor;
            color: @ButtonFontColor;
            font-size: 12px;
            line-height: 1;
        }
    }

    /*--------教师卡片----------*/
    .cardWrap {
        min-height: 239px;
        background-color: #ffffff;
        border: 1px solid @borderColor;
        box-sizing: border-box;
        border-radius: 5px;
        box-shadow: @baseShadow;
        padding: 30px 20px;
        .title {
            font-size: 17px;
            color: @TitleFontColor;
            height: 36px;
            border-bottom: 1px solid @borderColor;
            .tip{
                display: inline-block;
                color: #aaa;
                font-size: 12px;
                margin-left: 10px;
                padding-top: 4px;
            }
        }
        .card {
            position: relative;
            width: 176px;
            margin-left: 12px;
            box-sizing: border-box;
            padding-top: 20px;
            height: 142px;
            float: left;
            &:nth-child(1){
                margin-left: 10px;
            }
            .pic {
                float: left;
                overflow: hidden;
                height: 82px;
                width: 82px;
                border: 1px solid #eaeaea;
                border-radius: 82px;
            }
            .info {
                display: inline-block;
                width: 76px;
                margin-left: 10px;
                box-sizing: border-box;
                height: 82px;
                padding-top: 15px;
                font-size: 14px;
                color: @TitleFontColor;
                .name{
                    line-height: 1;
                }
                .type{
                    display: block;
                    margin-top: 23px;
                    font-size: 12px;
                    min-width: 64px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    box-sizing: border-box;
                    border:1px solid @baseBorderColor;
                    border-radius: 5px;
                    color: #808080;
                    background-color: #f7f7f7;
                }
            }
            .set,.del {
                display: none;
                position: absolute;
                left: 0;
                bottom: 0;
                width: 35px;
                height: 28px;
                background-color: #f7f7f7;
                font-size: 12px;
                color: #222222;
                border: 1px solid @borderColor;
                border-radius: 5px;
                line-height: 28px;
                text-align: center;
                cursor: pointer;
                &:hover {
                    background-color: lighten(#f7f7f7, 10%)
                }
            }
            .del{
                left: 47px;
            }
            &:hover {
                .set,.del {
                    display: block;
                }
            }
        }
    }

    /*--------添加按钮----------*/
    .longAddTeacher {
        margin-top: 20px;
        height: 40px;
        width: 100%;
        border-color: @ButtonBorderColor;
        background-color: @ButtonBgColor;
        color: @ButtonFontColor;
        font-size: 14px;
        line-height: 1;
    }

    /*--------弹窗-----------*/
    .teacherModal {
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
    }
</style>
<template>
    <div class="teacherDisplay">
        <header class="header">
            <h1 class="title">教师显示管理</h1>
            <Button class="addTeacher" type="primary" @click="openModal('add')">添加教师</Button>
        </header>
        <div class="cardWrap">
            <div class="title">首页正在显示的教师<p class="tip">根据首页展示效果，建议选择6名教师进行固定展示。如超过6名，首页将随机选取6名进行展示</p></div>
            <div class="cardList clearFix">
                <!--<div class="card">
                    <img src="" alt="用户头像无法显示" class="pic">
                    <div class="info">
                        <p class="name">教师姓名</p>
                        <span class="type">系统推荐</span>
                    </div>
                    <div class="set" @click="openModal('replace')">修改教师</div>
                </div>-->
                <div class="card" v-for="( item,index ) in data" :key="index">
                    <img :src="item.headImg" alt="用户头像无法显示" class="pic">
                    <div class="info">
                        <p class="name">{{item.name}}</p>
                        <span class="type">{{item.type === 1 ? '系统推荐': '管理员自定义'}}</span>
                    </div>
                    <div class="set" @click="openModal('replace',item)" :style=computedWidth >修改</div>
                    <div class="del" @click="openTeacherModal(item)" v-show="data.length > 6">删除</div>
                </div>
            </div>
        </div>
        <!--<Button type="primary" class="longAddTeacher" @click="openModal('add')">添加教师</Button>-->
        <Modal
                v-model="modal"
                :mask-closable="false"
                :scrollable="false"
                class-name="teacherModal"
        >
            <p class="title">请输入邮箱</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem prop="email">
                    <Input v-model="formValidate.email" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="ghost" @click="closeModal" class="modalBtn cancel">取消</Button>
                <Button type="primary" class="modalBtn sure" @click="checkEmail">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="modal_teacher"
                :mask-closable="false"
                :scrollable="false"
                class-name="teacherModal"
        >
            <p class="title">你确定要删除该教师吗？</p>
            <div slot="footer">
                <Button type="ghost" @click="closeTeacherModal" class="modalBtn cancel">取消</Button>
                <Button type="primary" class="modalBtn sure" @click="delTeacher">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import request from '../../js/util'
    import url from '../../js/interface'

    export default {
        name: "teacherDisplay",
        data() {
            const validateEmail = (rule, value, callback) => {
                let reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                if (!value) {
                    callback(new Error('请输入邮箱'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            }
            return {
                modal: false,
                modal_teacher: false,
                formValidate: {
                    email: ''
                },
                ruleValidate: {
                    email: [
                        {validator: validateEmail, trigger: 'blur'},
                    ]
                },
                focusTeacher: {},
                status: "add",
                data: [],
                id: "" //操作的对象ID
            }
        },
        mounted() {
            this.getTeacherList()
        },
        computed:{
            computedWidth(){
                return (this.data.length > 6) ? 'width: 35px' : 'width: 82px'
            }
        },
        watch: {
            modal(val) {
                if (!val) {
                    this.$refs.formValidate.resetFields();
                    this.formValidate.email = ""
                }
            }
        },
        methods: {
            checkEmail() {
                this.$refs.formValidate.validate((valid) => {
                    if (!valid) return false
                    if (status === 'add') {
                        this.add()
                    } else {
                        this.replace()
                    }
                })
            },
            add() {
                let that = this
                window.loadingView.show()
                request.ajax.post(url.teacherDisplay.add,{
                    email: that.formValidate.email
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.getTeacherList()
                        that.modal = false
                    })
                    middle.thenError(error => {
                        this.$Message.error(error.message)
                    })
                })
            },
            closeModal() {
                this.modal = false
            },
            openModal(status,data = {}) {
                this.status = status
                this.id = data.id
                this.modal = true
            },
            replace() {
                let that = this
                window.loadingView.show()
                request.ajax.post(url.teacherDisplay.add,{
                    id: that.id,
                    email: that.formValidate.email
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(() => {
                        that.modal = false
                        that.getTeacherList()
                    })
                    middle.thenError(error => {
                        this.$Message.error(error.message)
                    })
                })
            },
            getTeacherList(){
                let that = this
                window.loadingView.show()
                request.ajax.get(url.teacherDisplay.list).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(data => {
                        that.data = data.data.dataList
                    })
                    middle.thenError(error => {
                        console.log(error)
                    })
                })
            },
            openTeacherModal(data){
                this.focusTeacher = data
                this.modal_teacher = true
            },
            delTeacher(){
                let that = this
                window.loadingView.show()
                request.ajax.post(url.teacherDisplay.delete,{
                    id: that.focusTeacher.id
                }).then(result => {
                    let middle = request.checkAjaxJson(result)
                    middle.thenSuccess(() => {
                        that.closeTeacherModal()
                        that.getTeacherList()
                    })
                    middle.thenError(error => {
                        that.$Message.error(error.message)
                    })
                })
            },
            closeTeacherModal(){
                this.focusTeacher = {}
                this.modal_teacher = false
            }
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>