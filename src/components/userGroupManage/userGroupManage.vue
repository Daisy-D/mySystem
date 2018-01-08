<template>
<div class="userGroupManage">
    <div class="title">用户组管理</div>
    <div class="userGroup">
        <Table style="margin: 20px;"  ref="selection" :columns="columnsData" :data="tableData"></Table>
    </div>
</div>
</template>

<script>
    import url from '../../js/interface.js';
    export default{
        data(){
            return{
                columnsData: [
                    {
                        title: '组名称',
                        align: 'center',
                        width: 200,
                        key: 'userGroupName'
                    },
                    {
                        title: '权限',
                        align: 'center',
                        render: (h, params) => {
//                            jurisdictionName
                            var text = '';
                            for(var i = 0;i<params.row.jurisdictionList.length;i++){
                                text+=params.row.jurisdictionList[i].jurisdictionName+'，'
                            }
                            text =  text.substring(0,text.length-1)
                            return h('span', {}, text)
                        }
                    },
                    {
                        title: '人数',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {}, params.row.userNum+'人')
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('span', {
                                'class': {
                                    details: true,
                                },
                                on: {
                                    click: () => {
                                        this.jumpDetails(params.row.userGroupId,params.row.userGroupName)
                                    }
                                }
                            }, '查看')
                        }
                    }
                ],
                tableData: [],
            }
        },
        activated(){
            this.dataList()
        },
        methods: {
//            分类列表
            dataList(){
                var _this = this;
                window.loadingView.show("courseTypeList");
                window.util.ajax.get(url.userGroupManage.userGroupList).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.tableData = json.data.dataList
                    }).autoRun("login", "error", "courseTypeList");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("courseTypeList");
                });
            },
//            跳转详情
            jumpDetails(id,name){
                this.$router.push({
                    path: "/userListManage",
                    query: {
                        userGroupId: id,
                        userGroupName:name,
                    }
                })
            },
        },
        components: {},
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>
<style lang="less">
    @import "../../styles/theme.less";
    .userGroup{
        border: 1px solid @baseBorderColor;
        margin-top: 20px;
        box-shadow:@baseShadow;
    }
    .userGroupManage .ivu-table:after{
        display: none;
    }
    .userGroupManage  .ivu-table-wrapper{
        border: 0;
    }
    .userGroupManage th{
        background: #fff;
    }
    .userGroupManage .details{
        width: 92px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #ddd;
        display: inline-block;
        cursor: pointer;
        border-radius: 5px;
    }
    .userGroupManage .ivu-table-row:nth-last-child(1) .ivu-table-column-center{
        border: 0 !important;
    }
    .userGroupManage .ivu-table:before{
        background: 0 !important;
    }

</style>

<style lang="less" scoped>
    @import "../../styles/theme.less";

    .title {
        font-size: 22px;
    }
    .userGroup{
        background: #fff;
    }

</style>
