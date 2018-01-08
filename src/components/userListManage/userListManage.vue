<template>
<div class="userListManage">
    <div class="header">
        <div class="title">{{userGroupName}}</div>
        <div @click="backBut" class="backBut">返回用户组</div>
    </div>
    <div class="userListBody">
        <!--<div class="butDiv">-->
            <!--<div @click="delModel = true" class="resetPass">批量移除</div>-->
            <!--<div @click="addModel = true" class="blackList">添加用户</div>-->
        <!--</div>-->
        <div class="dataList">
            <Table  ref="selection" @on-selection-change="selectData" :columns="columnsData" :data="tableData"></Table>
            <div class="page" style="border: 0;">
                <Page :total="page.total" :page-size="page.size"  show-sizer show-elevator show-total
                      @on-change="go" @on-page-size-change="size" v-if="tableData && tableData.length !== 0"
                      :current="page.index" :page-size-opts="page.list" placement="top" class="Pager"></Page>
            </div>
            <!--<div class="headerList">-->
                <!--<span></span>-->
                <!--<span>用户名</span>-->
                <!--<span>邮箱</span>-->
                <!--<span>操作</span>-->
            <!--</div>-->
            <!--<div class="headerList" v-for="(item,key) in dataList">-->
                <!--<span>{{item.order}}</span>-->
                <!--<span>{{item.course}}</span>-->
                <!--<span>{{item.user}}</span>-->
                <!--<span>{{item.money}}</span>-->
            <!--</div>-->
        </div>
    </div>
    <Modal
            v-model="delModel"
            :mask-closable="false"
            :scrollable="false"
            class-name="teacherModal"
    >
        <p style="font-size: 17px;text-align: center;margin-bottom: 20px;">你确定从本组删除此用户</p>
        <div slot="footer">
            <Button type="ghost" @click="cancelDel" class="modalBtn cancel">取消</Button>
            <Button type="primary" class="modalBtn sure" @click="batch">确定</Button>
        </div>
    </Modal>
    <Modal
            v-model="addModel"
            :mask-closable="false"
            :scrollable="false"
            class-name="teacherModal"
    >
        <p style="text-align: center;font-size: 17px;margin-bottom: 25px">添加本组用户</p>
        <div><span style="font-size: 14px;">请输入邮箱</span><input v-model="eml" style="text-indent: 10px;height: 32px;border-radius: 5px;border: 1px solid #e5e5e5;margin-left: 10px;width: 268px;"/></div>
        <p style="font-size: 12px;color: #ff0000;text-align: center;">{{errorPrompt}}</p>
        <div slot="footer">
            <Button type="ghost" @click="" class="modalBtn cancel">取消</Button>
            <Button type="primary" class="modalBtn sure" @click="search">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
    import url from '../../js/interface.js';
    export default{
        data(){
            let page = {
                index: 1,
                size: 20,
                total: 100,
                list: [20,50,100]
            }
            return{
                page,
                delArr:[],
                delModel: false,
                addModel: false,
                columnsData: [
//                    {
//                        type: 'selection',
//                        width: 60,
//                        align: 'center'
//                    },
                    {
                        title: '用户名',
                        key: 'userName'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
//                    {
//                        title: '操作',
//                        width: 120,
//                        align: 'center',
//                        render: (h, params) => {
//                            return h('span', {
//                                'class': {
//                                    details: true,
//                                },
//                                on: {
//                                    click: () => {
//                                        this.delUser(params.index)
//                                    }
//                                }
//                            }, '移除')
//                        }
//                    }
                ],
                tableData: [],
                userGroupId:'',
                userGroupName:'',
                eml:'',
                errorPrompt:'',
            }
        },
        activated (){
            this.userGroupId = this.$route.query.userGroupId;
            this.userGroupName = this.$route.query.userGroupName;
            this.listData()
        },
//        mounted(){
//            this.userGroupId = this.$route.query.userGroupId;
//            this.userGroupName = this.$route.query.userGroupName;
//            this.listData()
//        },
        methods:{
//            获取用户列表
            listData(){
                var _this = this;
                window.loadingView.show("userGroupUserList");
                window.util.ajax.get(url.userListManage.userGroupUserList,{
                    params: {
                        userGroupId: _this.userGroupId,
                        currentPage: _this.page.index,
                        pageSize:_this.page.size,
                    }
                }).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.tableData = json.data.dataList;
                        _this.page.index = json.data.pageConfig.currentPage;
                        _this.page.size = json.data.pageConfig.pageSize;
                        _this.page.total = json.data.pageConfig.totalCount;
                    }).autoRun("login", "error", "userGroupUserList");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("userGroupUserList");
                });
            },
//            关联搜索
            search(){
                var _this = this;
                window.loadingView.show("addUserGroupUser");
                window.util.ajax.post(url.userListManage.addUserGroupUser,{
                        userGroupId: _this.userGroupId,
                        email: _this.eml,
                    }
                ).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        if(json.data.email){
                            _this.errorPrompt = '';
                            _this.addModel = false;
                            _this.eml = '';
                            _this.listData()
                        }else{
                            _this.errorPrompt = json.data.text;
                        }
                        // console.log(json)
                    }).autoRun("login", "error", "orderInfo");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("addUserGroupUser");
                });
            },
            selectData(data){
                this.delArr = data
            },
//            批量移除
            batch(){
                var delStr = '';
                if(typeof this.delArr == 'object'){
                    if(this.delArr.length == 0){
                        this.$Message.error('请选择用户!');
                        return
                    }
                    for(var i =0;i<this.delArr.length;i++){
                        delStr+= this.delArr[i].userId+',';
                    }
                    delStr =  delStr.substring(0,delStr.length-1)
                }else{
                    delStr = this.delArr
                }
                var _this = this;
                window.loadingView.show("removeUserGroupUser");
                window.util.ajax.get(url.userListManage.removeUserGroupUser,{
                    params: {
                        userGroupId:_this.userGroupId,
                        userId: delStr,
                    }
                }).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.delModel = false;
                        _this.listData();
                        _this.delArr = [];
                    }).autoRun("login", "error", "removeUserGroupUser");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("removeUserGroupUser");
                });
            },
//            移除用户
            delUser(data){
                this.delModel = true;
                this.delArr = this.tableData[data].userId;
            },
//            取消移除
            cancelDel(){
                this.delModel = false;
                this.delArr = [];
            },
//            返回
            backBut(){
                this.$router.push({
                    path: "/userGroupManage",
                })
            },
//            分页
            go(index){
                this.page.index = index
                this.listData()
            },
            size(size){
                this.page.size = size
                this.listData()
            },
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>
<style lang="less">
    @import "../../styles/theme.less";
    .userListManage .ivu-table:after{
        display: none;
    }
    .userListManage  .ivu-table-wrapper{
        border: 0;
    }
    .userListManage th{
        background: #fff;
    }
    .userListManage .details{
        width: 92px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #ddd;
        display: inline-block;
        cursor: pointer;
        border-radius: 5px;
    }
</style>

<style lang="less" scoped>
    @import "../../styles/theme.less";
    .userListManage{
        /*padding: 30px;*/

    }
    .userListBody{
        border: 1px solid @baseBorderColor;
        margin-top: 20px;
        box-shadow:@baseShadow;
    }
    .header{
        overflow: hidden;
        margin-bottom: 15px;
    }
    .title{
        font-size: 22px;
        float: left;
    }
    .backBut{
        float: right;
        height: 32px;
        width: 83px;
        border-radius: 5px;
        background: #656565;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .userListBody{
        padding: 30px;
        background: #fff;
    }
    .butDiv{
        overflow: hidden;
    }
    .resetPass , .blackList{
        height: 32px;
        width: 100px;
        border: 1px #e5e5e5 solid;
        border-radius: 5px;
        float: right;
        margin-right: 10px;
        color: #222;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
        font-size: 12px;
    }
    .headerList{
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    .headerList span{
        float: left;
        width: 20%;
    }
    .headerList span:nth-child(1){
        width: 100px;
    }
    /*分页*/
    .page{
        border: 1px solid @baseBorderColor;
        border-top: 0;
        height: 52px;
        background-color: #FFFFFF;
        line-height: 52px;
    .Pager{
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        float: left
    }
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
