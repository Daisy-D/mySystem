<template>
    <div class="tableBox_view">
        <div class="tableBox">
            <div class="headBtn">
                <div>
                    <Button type="ghost" style="width: 100px;" @click="batchRestPasswordFunc">重置密码</Button>
                    <Button type="ghost" style="margin-left: 8px;width: 100px;" @click="batchGoBlacklistFunc">黑名单</Button>
                </div>
                <div>
                    <Button type="ghost" style="width: 100px;" @click="exportFunc">导出</Button>
                </div>
            </div>
            <div class="tableContent">
                <Table width="100%"   :columns="tableColumns" :data="tableList" ref="table1" @on-selection-change="changeCheck" @on-select-all=""></Table>
                <div class="pageBox" v-show="true" style="position: relative;">
                    <Page :total="total" show-elevator show-sizer show-total :page-size='size' :current="pageIndex" @on-change="go" @on-page-size-change="refreshSize" :page-size-opts="pageSize" :placement="pagePlace"></Page>
                </div>
            </div>
        </div>
        <Modal
                v-model="testModal"
                title=""
                :mask-closable="false"
                @on-ok=""
                @on-cancel="testModal=false">
            <div class="content">
                <p style="text-align: center;font-size: 17px;font-weight: bold;margin-bottom: 18px;">你准备为 {{chineseNames}} 重置密码</p>
                <Form ref="ruleBaseInfo" :model="ruleBaseInfo" :rules="ruleCheck"  label-position="right" :label-width="86">
                    <Row>
                        <Form-item label="重置密码：" prop="rulePassword" style="font-size: 14px;">
                            <Input class="inputWidth" v-model="ruleBaseInfo.rulePassword" placeholder="如果不设置密码，则默认密码为：SPOC123"></Input>
                        </Form-item>
                        <!--<p style="color: #ccc;margin-left: 10px;">如果不设置密码，则默认密码为：SPOC123</p>-->
                    </Row>
                </Form>
            </div>
            <div slot="footer" style="text-align: center;">
                <Button class="modalBtnSize" type="ghost" @click="testModal=false" style="width: 120px;">取消</Button>
                <Button class="modalBtnSize" type="primary" @click="handleSubmit('ruleBaseInfo')" style="width: 120px;">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="batchBlacklistModal"
                title=""
                :mask-closable="false"
                @on-ok=""
                @on-cancel="batchBlacklistModal=false">
            <div class="content">
                <p style="text-align: center;font-size: 17px;font-weight: bold;margin-bottom: 18px;">你准备将 {{chineseNames}} {{isBlacklistSta==1?'拉入':'移出'}}黑名单</p>
            </div>
            <div slot="footer" style="text-align: center;">
                <Button class="modalBtnSize" type="ghost" @click="batchBlacklistModal=false" style="width: 120px;">取消</Button>
                <Button class="modalBtnSize" type="primary" @click="isBlacklistFunc" style="width: 120px;">确定</Button>
            </div>
        </Modal>
        <Modal
                v-model="editUserModal"
                title=""
                width='600'
                :mask-closable="false"
                @on-ok=""
                @on-cancel="editCancelFunc">
            <div class="editContent">
                <div v-show="addStuSta">
                    <add-stu :root-msg="rootMsg" ></add-stu>
                </div>
                <div v-show="addTeaSta">
                    <add-tea :root-msg="rootMsg"></add-tea>
                </div>
                <div v-show="addAdminSta">
                    <add-admin :root-msg="rootMsg"></add-admin>
                </div>
            </div>
            <div slot="footer" style="text-align: center;">
                <!--<Button class="modalBtnSize" type="ghost" @click="editUserModal=false" style="width: 120px;">取消</Button>-->
                <!--<Button class="modalBtnSize changeBtnColor" type="info" @click="" style="width: 120px;">提交</Button>-->
            </div>
        </Modal>
    </div>
</template>

<script>
    import baseUrl from '../../../js/interface';
    import addStu from '../addUser/addStu.vue';
    import addTea from '../addUser/addTea.vue';
    import addAdmin from '../addUser/addAdmin.vue';
    export default {
        data(){
            const checkPassword = (rule, value, callback) => {
                var reg = /^[\w]{6,30}$/
                value = value.replace(/\s\s*/, '');
                this.ruleBaseInfo.rulePassword = value;
                var regResult = reg.test(value)
                if(!value){

                }else if (value.length > 0 && !regResult) {
                    callback(new Error('6-30位包含字母、数字或下划线'));
                }else{
                    this.rulePasswordChange = this.ruleBaseInfo.rulePassword

                }
                callback()
            };
            return{
                //编辑用户部分
                addStuSta:false,
                addTeaSta:false,
                addAdminSta:false,
                //批量操作部分
                batchDealArr:[],
                //密码校验部分
                ruleBaseInfo:{
                    rulePassword:'',
                },
                ruleCheck:{
                    rulePassword:[
                        { validator: checkPassword, trigger: 'change'}
                    ],
                },
                rulePasswordChange:'SPOC123',
                chineseNames:'',
                //搜索参数初始化
                searchObj:'',
                //用户ids
                userIds:'',
                //分页参数
                total:0,
                size: 20,
                pageIndex: 1,
                pageSize: [20, 50, 100],
                pagePlace:'bottom',//切换分页出现的位置
                //重置密码弹窗参数
                testModal:false,
                //黑名单弹窗参数
                batchBlacklistModal:false,
                isBlacklistSta:'',
                //编辑页面弹窗参数
                editUserModal:false,
                //表格列
                tableColumns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'chineseName',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: '学号/工号',
                        key: 'num',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: '用户组',
                        key: 'userGroupName',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: '黑名单',
                        key: 'isBlacklist',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'user',
                        width: 250,
                        align: 'center',
                        render:(h,params) => {
                            return h('div',{},
                            [
                                h('Button',{
                                    props:{
                                        type:'ghost',
                                    },
                                    style:{
                                        width:'90px',
                                        lineHeight:'16px',
                                        marginRight:'10px',
                                    },
                                    on:{
                                        click:() => {
                                            this.userIds = this.tableList[params.index].userId;
                                            if(this.tableList[params.index].userType===1){
                                                this.addStuSta = true;
                                            }else if(this.tableList[params.index].userType===2){
                                                this.addTeaSta = true;
                                            }else if(this.tableList[params.index].userType===3){
                                                this.addAdminSta = true;
                                            }else if(this.tableList[params.index].userType===4){
                                                this.addAdminSta = true;
                                            }
                                            this.getUserInfoFunc()
                                        }
                                    }
                                },'编辑'),
                                h('Dropdown',{
                                    props:{
                                        trigger:"click",
                                    },

                                },[
                                    h('Button',{
                                        props:{
                                            type:'ghost',
                                        },
                                        style:{
                                            width:'90px',
                                            lineHeight:'16px',
                                        }
                                    },[
                                        h('span',{},'操作'),
                                        h('Icon',{
                                            props:{
                                                type:"arrow-down-b",
                                            },
                                            style:{
                                                marginLeft:'12px',
                                            }
                                        },)
                                    ]),
                                    h('DropdownMenu',{
                                        slot:'list'
                                    },[
                                        h('DropdownItem',{
                                            nativeOn:{
                                                click: () => {
                                                    this.userIds = `${this.tableList[params.index].userId}`;
                                                    this.chineseNames = this.tableList[params.index].chineseName;
                                                    this.testModal = true;
                                                    this.ruleBaseInfo.rulePassword = '';
                                                }
                                            }
                                        },'重置密码'),
                                        h('DropdownItem',{
                                            nativeOn:{
                                                click: () => {
                                                    this.userIds = `${this.tableList[params.index].userId}`;
                                                    this.chineseNames = this.tableList[params.index].chineseName;
                                                    this.batchBlacklistModal = true;
                                                    this.isBlacklistSta = this.tableList[params.index].isBatchBlack===0?1:0;
                                                }
                                            }
                                        },this.tableList[params.index].isBatchBlack===0?'黑名单':'取消黑名单')
                                    ])
                                ])
                            ])
                        }
                    },
                ],
                tableList:[],
            }
        },
        props:{
            rootMsg:Object,
        },
        mounted(){
//            console.log(this.$store.state.userInfo.userId)
//            window.location.href =this.$store.state.serverInfo.platformUrl+"user/loginOut";
            this.getListFunc();

            //获取搜索信息对象
            this.rootMsg.$on('searchTable', (a) => {
                this.searchObj = a ;
                this.pageIndex = 1;
                this.size = 20;
                this.getListFunc();
            });
            //关闭修改弹窗
            this.rootMsg.$on('closeEditModalOk', (a) => {
                if(!a){
                    this.editCancelFunc();
                    this.getListFunc();
                }
            });
            this.rootMsg.$on('closeEditModalCancel', (a) => {
                if(!a){
                    this.editCancelFunc();
                }
            });
            window.addEventListener("scroll",this.onScroll);
        },
        destroyed(){
            window.removeEventListener("scroll",this.onScroll);
        },
        methods:{
            //更改分页位置
            onScroll(){
                if(window.document.documentElement.offsetHeight+10<window.document.body.offsetHeight){
                    this.pagePlace="top";
                }else{
                    this.pagePlace="bottom";
                }
            },
            go(index){
                this.pageIndex = index;
                this.getListFunc();
            },
            refreshSize(size){
                this.size = size;
                this.getListFunc();
            },
            changeCheck(val){
                this.batchDealArr = val
            },
            //获取页面
            getListFunc(){
                this.rootMsg.publicAjax('get',baseUrl.userManage.userList,{
                    params:{
                        chineseName:this.searchObj?this.searchObj.chineseName:'',
                        email:this.searchObj?this.searchObj.email:'',
                        studentNo:this.searchObj?this.searchObj.studentNo:'',
                        userGroupId:this.searchObj?this.searchObj.userGroupId:'',
                        isBatchBlack:this.searchObj?this.searchObj.isBlacklist:'',
                        currentPage:this.pageIndex,
                        pageSize:this.size,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    var dataList = json.data.dataList;
                    var pageObj = json.data.pageConfig;
                    _this.tableList = dataList.map(item =>{
                        return{
                            userId:item.userId,
                            chineseName:item.chineseName,
                            email:item.email,
                            num:item.studentNo,
                            userGroupId:item.userGroupId,
                            userGroupName:item.userGroupName,
                            isBlacklist:item.isBatchBlack===0?'否':'是',
                            isBatchBlack:item.isBatchBlack,
                            userType:item.userType,
                        }
                    })
                    _this.pageIndex = pageObj.currentPage
                    _this.size = pageObj.pageSize
                    _this.total = pageObj.totalCount;
                    _this.onScroll()
                }
            },
            //重置密码
            resetPasswordFunc(){
                this.rootMsg.publicAjax('get',baseUrl.userManage.resetPassword,{
                    params:{
                        userId:this.userIds,
                        password:this.rulePasswordChange,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    if(json.status=="success"){
                        var checkIdArr = _this.userIds.split(',');
                        checkIdArr.forEach(item =>{
                            if(Number(item) === _this.$store.state.userInfo.userId){
                                _this.$Message.info('您的账号已登出，请重新登录');
                                setTimeout(() => {
                                    window.location.href =_this.$store.state.serverInfo.platformUrl+"user/loginOut";
                                },1000)
                            }
                        })
                        _this.testModal = false;
                        _this.getListFunc()
                    }
                }
            },
            //校验提交
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.resetPasswordFunc()
                    } else {
                        this.$Message.error('信息输入有误，请完善信息后重新提交!');
                    }
                })
            },
            //批量重置密码弹窗
            batchRestPasswordFunc(){
                var userIdArr = [];
                var chineseNameArr = [];
                if(this.batchDealArr.length > 0){
                    this.batchDealArr.forEach((item,i) => {
                        userIdArr.push(item.userId)
                        if(i<5){
                            chineseNameArr.push(item.chineseName)
                        }
                    })
                    this.userIds = userIdArr.join(',')
                    this.chineseNames = `${chineseNameArr.join('、')}等${this.batchDealArr.length}名用户`;
                    this.testModal = true;
                    this.ruleBaseInfo.rulePassword = '';
                }else {
                    this.$Message.warning('请至少选择一项')
                }
            },
            //是否拉入黑名单
            isBlacklistFunc(){
                this.rootMsg.publicAjax('get',baseUrl.userManage.batchBlacklist,{
                    params:{
                        userId:this.userIds,
                        isBatchBlack:this.isBlacklistSta,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    if(json.status =="success"){
                        if(_this.isBlacklistSta === 1){
                            var checkIdArr = _this.userIds.split(',');
                            checkIdArr.forEach(item =>{
                                if(Number(item) === _this.$store.state.userInfo.userId){
                                    _this.$Message.info('您的账号已登出，请重新登录');
                                    setTimeout(() => {
                                        window.location.href =_this.$store.state.serverInfo.platformUrl+"user/loginOut";
                                    },1000)
                                }
                            })
                        }
                        _this.batchBlacklistModal = false;
                        _this.getListFunc()
                    }
                }
            },
            //批量拉入黑名单
            batchGoBlacklistFunc(){
                var userIdArr = [];
                var chineseNameArr = [];
                var goBlacklist = [];
                this.batchDealArr.forEach(item =>{
                    if(item.isBatchBlack===0){
                        goBlacklist.push(item)
                    }
                })
                if(goBlacklist.length > 0){
                    goBlacklist.forEach((item,i) => {
                        userIdArr.push(item.userId)
                        if(i<5){
                            chineseNameArr.push(item.chineseName)
                        }
                    })
                    this.userIds = userIdArr.join(',')
                    this.chineseNames = `${chineseNameArr.join('、')}等${goBlacklist.length}名用户`;
                    this.batchBlacklistModal = true;
                    this.isBlacklistSta = 1;
                }else {
                    this.$Message.warning('请至少选择一个有效用户')
                }
            },
            //导出
            exportFunc(){
                if(this.batchDealArr.length > 0){
                    var userIdArr=[];
                    this.batchDealArr.forEach((item,i) => {
                        userIdArr.push(item.userId)
                    })
                    this.userIds = userIdArr.join(',')
                    window.location = `${baseUrl.userManage.exportUser}?userId=${this.userIds}&chineseName=${this.searchObj?this.searchObj.chineseName:''}&email=${this.searchObj?this.searchObj.email:''}&studentNo=${this.searchObj?this.searchObj.studentNo:''}&userGroupId=${this.searchObj?this.searchObj.userGroupId:''}&isBatchBlack=${this.searchObj?this.searchObj.isBlacklist:''}`
                }else{
                    window.location = `${baseUrl.userManage.exportUser}?userId=${''}&chineseName=${this.searchObj?this.searchObj.chineseName:''}&email=${this.searchObj?this.searchObj.email:''}&studentNo=${this.searchObj?this.searchObj.studentNo:''}&userGroupId=${this.searchObj?this.searchObj.userGroupId:''}&isBatchBlack=${this.searchObj?this.searchObj.isBlacklist:''}`

                }
            },
            //获取用户信息
            getUserInfoFunc(){
                this.rootMsg.publicAjax('get',baseUrl.userManage.getUserInfo,{
                    params:{
                        userId:this.userIds,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    var dataObj = json.data;
                    _this.editUserModal = true;
                    if(json.status =="success"){
                        _this.rootMsg.$emit('changeStu',dataObj);
                    }
                }
            },
            //关闭编辑弹窗
            editCancelFunc(){
                this.editUserModal=false;
                setTimeout(()=>{
                    this.addStuSta=false;
                    this.addTeaSta=false;
                    this.addAdminSta=false;
                },10)

            },
        },
        components:{
            'add-stu':addStu,
            'add-tea':addTea,
            'add-admin':addAdmin
        },
    }
</script>

<style scope lang="less">
    @import "../../../styles/theme.less";
    .tableBox_view{
        background: #fff;
        border: 1px solid @baseBorderColor;
        /*box-shadow: 0 2px 16px @baseBorderColor, 0 0 1px @baseBorderColor, 0 0 1px @baseBorderColor;*/
        box-shadow: @baseShadow;
        font-size: 14px;
        padding: 30px;
    }
    .headBtn{
        display: flex;
        justify-content: space-between;
    }
    .modalBtnSize{
        width: 200px;
    }
    .changeBtnColor{
        background:@baseThemeColor;
        border:solid 1px @baseThemeColor;
    }
    .changeBtnColor:hover{
        background:shade(@baseThemeColor, 5%);
        border:solid 1px shade(@baseThemeColor, 5%);
    }
    .tableContent{
        margin-top: 40px;
    }
    .pageBox{
        width:100%;
        position:absolute;
        bottom:0;
        padding:10px 0;
        text-align:center;
    }
    .inputWidth{
        width: 310px;
    }
    .content{
        .ivu-form .ivu-form-item-label{
            font-size: 14px;
        }
    }
    .editContent{
        height:420px;
        overflow:auto;
        .ivu-btn.ivu-btn-primary{
            background:@baseThemeColor;
            border:solid 1px @baseThemeColor;
        }
        .ivu-btn.ivu-btn-primary:hover{
            background:shade(@baseThemeColor, 5%);
            border:solid 1px shade(@baseThemeColor, 5%);
        }
        .ivu-select-dropdown{
            top:auto !important;
        }
    }
</style>