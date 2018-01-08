<template>
    <div :class="isEditSta?'addTabs_view_edit':'addTabs_view'">
        <div style="margin-bottom: 10px;" v-if="isEditSta">
            <h2>编辑用户：</h2>
        </div>
        <Form ref="ruleBaseInfo" :model="ruleBaseInfo" :rules="ruleCheck" label-position="right" :label-width="100">
            <Row>
                <Form-item label="邮箱：" prop="ruleEmail">
                    <Input class="inputWidth" v-model="ruleBaseInfo.ruleEmail" placeholder="example@email.com"></Input>
                </Form-item>
            </Row>
            <Row>
                <Form-item label="用户名：" prop="ruleUserName">
                    <Input class="inputWidth" :disabled="isEditSta" v-model="ruleBaseInfo.ruleUserName"
                           placeholder="6-20位，字母开头，包含字母、数字或下划线"></Input>
                </Form-item>
            </Row>
            <Row>
                <Form-item label="密码：" prop="rulePassword">
                    <Input class="inputWidth" v-model="ruleBaseInfo.rulePassword"
                           placeholder="如果不设置密码，则默认密码为：SPOC123"></Input>
                </Form-item>
                <p style="color: #ccc;margin-left: 10px;"></p>
            </Row>
            <Row>
                <Form-item label="姓名：" prop="ruleName">
                    <Input class="inputWidth" :disabled="isEditSta" v-model="ruleBaseInfo.ruleName"
                           placeholder=""></Input>
                </Form-item>
            </Row>
            <Row>
                <Form-item label="工号：" prop="ruleNum">
                    <Input class="inputWidth" v-model="ruleBaseInfo.ruleNum" placeholder=""></Input>
                </Form-item>
            </Row>
            <Row>
                <FormItem label="学校：" prop="ruleSchool">
                    <!--<Select class="inputWidth" filterable v-model="ruleBaseInfo.ruleSchool" placeholder=""-->
                            <!--@on-change="">-->
                        <!--&lt;!&ndash;<Option v-for="item in schoolList" :value="item.value" :key="item.value">{{item.label}}</Option>&ndash;&gt;-->
                    <!--</Select>-->
                    <select-drop :root-msg="rootMsg" v-model="ruleBaseInfo.ruleSchool" :type=1 style="width: 280px;"></select-drop>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="职称：" prop="ruleJobTitle">
                    <!--<Select class="inputWidth" filterable v-model="ruleBaseInfo.ruleJobTitle" placeholder="">-->
                        <!--<Option v-for="item in jobTitleList" :value="item.value" :key="item.value">{{item.label}}</Option>-->
                    <!--</Select>-->
                    <select-drop :root-msg="rootMsg" v-model="ruleBaseInfo.ruleJobTitle" :type=4 style="width: 280px;"></select-drop>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="角色：" prop="ruleRole">
                    <Select class="inputWidth" v-model="ruleBaseInfo.ruleRole" placeholder="">
                        <Option value='2'>教师</Option>
                        <Option value='3'>后台管理员</Option>
                        <Option value='4'>系统管理员</Option>
                    </Select>
                </FormItem>
            </Row>
            <div class="partLine"></div>
            <Row>
                <Form-item style="text-align: right;margin-top: 30px;">
                    <Button type="ghost" :class="isEditSta?'submitBtn_edit':'submitBtn'" style="margin-right: 10px;"
                            @click="submitBtnCancelFunc">取消
                    </Button>
                    <Button type="primary" :class="isEditSta?'submitBtn_edit':'submitBtn'"
                            @click="handleSubmit('ruleBaseInfo')">提交
                    </Button>
                </Form-item>
            </Row>
        </Form>
    </div>
</template>

<script>
    import baseUrl from '../../../js/interface';
    import selectDrop from './select.vue';
    export default {
        data() {
            //自定义校验规则
            const checkEmail = (rule, value, callback) => {
                var reg = /^[A-Za-z0-9\-\._]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;;

                value = value.replace(/\s\s*/, '');
                this.ruleBaseInfo.ruleEmail = value;
                var regResult = reg.test(value)
                if (value == '') {
                    callback(new Error('邮箱地址不能为空'));
                } else if (!regResult) {
                    callback(new Error('邮箱地址格式不正确，请重新输入'));
                } else {
                    if(this.isEditSta && value == this.editInfo.email){
                        callback()
                    }else {
                        this.checkEmailFunc(value,(val) => {
                            callback(val?new Error('邮箱地址已存在，请重新输入'):undefined)
                        })
                    }
                }
//                callback()
            };
            const checkUserName = (rule, value, callback) => {
                var reg = /^[a-zA-Z][a-zA-Z0-9_]{6,20}$/;
                value = value.replace(/\s\s*/, '');
                this.ruleBaseInfo.ruleUserName = value;
                var regResult = reg.test(value)
                if (value == '') {
                    callback(new Error('用户名不能为空'));
                } else if (!regResult) {
                    callback(new Error('用户名格式不正确，6-20位字母开头，包含字母、数字或下划线'));
                } else {
                    if(this.isEditSta && value == this.editInfo.userName){
                        callback()
                    }else {
                        this.checkUserNmaeFunc(value,(val) => {
                            callback(val?new Error('用户名已存在，请重新输入'):undefined)
                        })
                    }
                }
            };
            const checkPassword = (rule, value, callback) => {
                var reg = /^[\w]{6,30}$/
                value = value.replace(/\s\s*/, '');
                this.ruleBaseInfo.rulePassword = value;
                var regResult = reg.test(value)
                if (value.length > 0 && !regResult) {
                    callback(new Error('6-30位包含字母、数字或下划线'));
                }
                callback()
            };
            const checkName = (rule, value, callback) => {
                value = value.replace(/\s\s*/, '')
                this.ruleBaseInfo.ruleName = value;
                var reg = /^[\u4e00-\u9fa5]{1,20}$/
                var regResult = reg.test(value)
                if (value.length > 0 && !regResult) {
                    callback(new Error('小于20位汉字'));
                }
                callback()
            };
            const checkNum = (rule, value, callback) => {
                var reg = /[a-zA-Z0-9]{5,20}$/;
                value = value.replace(/\s\s*/, '');
                this.ruleBaseInfo.ruleNum = value;
                var regResult = reg.test(value)
                if (value.length > 0 && !regResult) {
                    callback(new Error('工号格式不正确，包含5-20位数字或字母'));
                }
                callback()
            };
            const checkSchool = (rule, value, callback) => {

            };
            const checkMajor = (rule, value, callback) => {

            };
            const checkGrade = (rule, value, callback) => {

            };
            return {
                //页面是否是编辑状态
                isEditSta: false,
                //编辑信息
                editInfo: '',
                //学校列表
                schoolList: [],
                //专业列表
                majorList: [],
                //年级列表
                gradeList: [],
                //职称列表
                jobTitleList:[],
                //列表拉回状态
                listInfoSta: {
                    school: false,
                    major: false,
                    grade: false,
                },
                //校验信息
                ruleBaseInfo: {
                    ruleEmail: '',
                    ruleUserName: '',
                    rulePassword: '',
                    ruleName: '',
                    rulePhone: '',
                    ruleNum: '',
                    ruleSchool: '',
                    ruleMajor: '',
                    ruleGrade: '',
                    ruleJobTitle:'',
                    ruleClass: '',
                    ruleRole: '3',
                },
                //校验规则
                ruleCheck: {
                    ruleEmail: [
                        {required: true, validator: checkEmail, trigger: 'blur'}
                    ],
                    ruleUserName: [
                        {required: true, validator: checkUserName, trigger: 'blur'}
                    ],
                    rulePassword: [
                        {validator: checkPassword, trigger: 'change'}
                    ],
                    ruleName: [
                        {validator: checkName, trigger: 'change'}
                    ],
                    ruleNum: [
                        {validator: checkNum, trigger: 'change'}
                    ],
                },
            }
        },
        props: {
            rootMsg: Object,
        },
        mounted() {
//            this.getSchoolListFunc();
//            this.getMajorListFunc();
//            this.getGradeListFunc();
//            this.getjobTitleListFunc();
            this.rootMsg.$on('schoolList', (a) => {
                this.schoolList = a;
            });
            this.rootMsg.$on('jobTitleList', (a) => {
                this.jobTitleList = a;
            });
            this.rootMsg.$on('changeStu', (a) => {
                this.editInfo = a;
                this.isEditSta = true;
                this.ruleBaseInfo = {
                    ruleEmail: this.editInfo.email,
                    ruleUserName: this.editInfo.userName,
                    rulePassword: '',
                    ruleName: this.editInfo.chineseName,
                    rulePhone: this.editInfo.mobilePhone,
                    ruleNum: this.editInfo.studentNo,
                    ruleSchool: Number(this.editInfo.schoolId),
                    ruleMajor: Number(this.editInfo.professionId),
                    ruleGrade: Number(this.editInfo.gradeId),
                    ruleJobTitle:Number(this.editInfo.jobTitleId),
                    ruleClass: this.editInfo.className,
                    ruleRole: `${this.editInfo.userType}`,

                };
            });
            this.documentClickFunc()
        },
        methods: {
            documentClickFunc(){
                document.onclick =  () => {
                    this.rootMsg.$emit('clickOut',true);
                }
            },
            //获取学校列表
            getSchoolListFunc() {
                this.rootMsg.publicAjax('get', baseUrl.userManage.schoolList, {}, callbackDeal)
                var _this = this

                function callbackDeal(json) {
                    var dataArr = json.data.dataList
                    _this.schoolList = dataArr.map(item => {
                        return {
                            value: item.schoolId,
                            label: item.schoolName,
                        }
                    })
                    _this.listInfoSta.school = true
                }
            },
            //获取专业列表
            getMajorListFunc() {
                this.rootMsg.publicAjax('get', baseUrl.userManage.majorList, {}, callbackDeal)
                var _this = this

                function callbackDeal(json) {
                    var dataArr = json.data.dataList
                    if (json.status == "success") {
                        _this.majorList = dataArr.map(item => {
                            return {
                                value: item.professionId,
                                label: item.professionName,
                            }
                        })
                        _this.listInfoSta.major = true;
                    }
                }
            },
            //获取年级列表
            getGradeListFunc() {
                this.rootMsg.publicAjax('get', baseUrl.userManage.gradeList, {}, callbackDeal)
                var _this = this

                function callbackDeal(json) {
                    var dataArr = json.data.dataList
                    if (json.status == "success") {
                        _this.gradeList = dataArr.map(item => {
                            return {
                                value: item.gradeId,
                                label: item.gradenName,
                            }
                        })
                        _this.listInfoSta.grade = true;
                    }
                }
            },
            //获取职称列表
            getjobTitleListFunc() {
                this.rootMsg.publicAjax('get', baseUrl.userManage.jobtitleList, {}, callbackDeal)
                var _this = this

                function callbackDeal(json) {
                    var dataArr = json.data.dataList
                    if (json.status == "success") {
                        _this.jobTitleList = dataArr.map(item => {
                            return {
                                value: item.jobTitleId,
                                label: item.jobTitleName,
                            }
                        })
                    }
                }
            },
            //校验提交
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submitFunc();
                    } else {
                        this.$Message.error('信息输入有误，请完善信息后重新提交！');
                    }
                })
            },
            //校验成功进行提交
            submitFunc() {
//                console.log(this.ruleBaseInfo)
//                return
                this.rootMsg.publicAjax('post', baseUrl.userManage.addUser, {
                    userType: Number(this.ruleBaseInfo.ruleRole),
                    userId: this.editInfo ? Number(this.editInfo.userId) : '',
                    mobilePhone: this.ruleBaseInfo.rulePhone,
                    userName: this.ruleBaseInfo.ruleUserName,
                    password: this.ruleBaseInfo.rulePassword ? this.ruleBaseInfo.rulePassword : 'SPOC123',
                    email: this.ruleBaseInfo.ruleEmail,
                    chineseName: this.ruleBaseInfo.ruleName,
                    schoolId: Number(this.ruleBaseInfo.ruleSchool),
                    professionId: '',
                    studentNo: this.ruleBaseInfo.ruleNum,
                    gradeId: '',
                    jobTitleId: Number(this.ruleBaseInfo.ruleJobTitle),
                    className: this.ruleBaseInfo.ruleClass,
                }, callbackDeal)
                var _this = this

                function callbackDeal(json) {
                    if (json.status == "success") {
                        _this.$Message.success('提交成功')
                        _this.ruleBaseInfo = {
                            ruleEmail: '',
                            ruleUserName: '',
                            rulePassword: '',
                            ruleName: '',
                            rulePhone: '',
                            ruleNum: '',
                            ruleSchool: '',
                            ruleMajor: '',
                            ruleGrade: '',
                            ruleJobTitle:'',
                            ruleClass: '',
                            ruleRole: '3',
                        }
                        //提交成功关闭弹窗
                        if (_this.isEditSta) {
                            _this.rootMsg.$emit('closeEditModalOk', false);
                        }
                    }
                }
            },
            //取消按钮
            submitBtnCancelFunc() {
                if (this.isEditSta) {
                    this.rootMsg.$emit('closeEditModalCancel', false);
                } else {
                    this.ruleBaseInfo = {
                        ruleEmail: '',
                        ruleUserName: '',
                        rulePassword: '',
                        ruleName: '',
                        rulePhone: '',
                        ruleNum: '',
                        ruleSchool: '',
                        ruleMajor: '',
                        ruleGrade: '',
                        ruleJobTitle:'',
                        ruleClass: '',
                        ruleRole: '3',
                    }
                }
            },
            //校验邮箱
            checkEmailFunc(name, callback) {
                this.rootMsg.publicAjax('get', baseUrl.userManage.checkUserEmail, {
                    params: {
                        email: name,
                    }
                }, callbackDeal);
                var _this = this;

                function callbackDeal(json) {
                    if (json.flag === 1) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                }
            },
            //校验用户名
            checkUserNmaeFunc(name, callback) {
                this.rootMsg.publicAjax('get', baseUrl.userManage.checkUserName, {
                    params: {
                        userName: name,
                    }
                }, callbackDeal);
                var _this = this;

                function callbackDeal(json) {
                    if (json.flag === 1) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                }
            },
        },
        components:{
            'select-drop':selectDrop,
        },
    }
</script>
<style lang="less">
    .addTabs_view {

    .ivu-form .ivu-form-item-label {
        font-weight: bold;
        font-size: 14px;
    }

    .ivu-form-item {
        padding-bottom: 20px;
        overflow: visible;
    }

    }
</style>
<style scoped lang="less">
    .addTabs_view {
        background: #fff;
        border: 1px solid #e0e1e2;
        border-top: none;
        padding: 40px 30px 30px 30px;
    }

    .inputWidth {
        width: 280px;
    }

    .partLine {
        margin-top: 45px;
        width: 100%;
        border-top: 1px solid #e0e1e2;
    }

    .submitBtn {
        width: 180px;
    }

    /*编辑时样式*/
    .addTabs_view_edit {
        padding: 0;
    }

    .submitBtn_edit {
        width: 150px;
    }
</style>