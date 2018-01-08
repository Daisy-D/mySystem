<template>
    <div class="tableBox">
        <Table width="100%" :columns="tableColumns" :data="tableList" ref="table1" @on-selection-change="changeCheck"
               @on-select-all=""></Table>
        <div class="pageBox" v-show="true" style="position: relative;">
            <Page :total="total" show-elevator show-sizer show-total :page-size='size' :current="pageIndex"
                  @on-change="go" @on-page-size-change="refreshSize" :page-size-opts="pageSize"
                  :placement="pagePlace"></Page>
        </div>
    </div>
</template>

<script>
    import baseUrl from '../../../js/interface';

    export default {
        data() {
            return {
                //分页参数
                total: 0,
                size: 20,
                pageIndex: 1,
                pageSize: [20, 50, 100],
                pagePlace: 'bottom',//切换分页出现的位置
                tableColumns: [
                    {
                        title: '导入时间',
                        key: 'time',
                        width: '',
                        align: 'left'
                    },
                    {
                        title: '导入结果',
                        key: 'result',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: ' ',
                        key: 'list',
                        width: '',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', {
                                style: {
                                    color: '#e03d42',
                                    cursor: 'pointer'
                                },
                                on:{
                                    click:()=>{
                                        window.location = this.tableList[params.index].list
                                    }
                                }
                            }, this.dealFailListViewFunc(this.tableList[params.index].data))
                        }
                    },
                ],
                tableList: []
            }
        },
        props: {
            rootMsg: Object,
            filterMsg:Boolean,
        },
        mounted() {
            this.getImportListFunc();
            this.rootMsg.$on('upOver', (a) => {
                if(a){
                    this.getImportListFunc();
                }
            });
            window.addEventListener("scroll",this.onScroll);
        },
        destroyed(){
            window.removeEventListener("scroll",this.onScroll);
        },
        methods: {
            //更改分页位置
            onScroll(){
                if(window.document.documentElement.offsetHeight+10<window.document.body.offsetHeight){
                    this.pagePlace="top";
                }else{
                    this.pagePlace="bottom";
                }
            },
            //处理失败列表显示文字
            dealFailListViewFunc(data){
                if (this.filterMsg) {
                    return data.importFail != 0 ? '下载失败列表' : ''
                } else {
                    return data.fail != 0 ? '下载失败列表' : ''
                }
            },
            go(index) {
                this.pageIndex = index;
                this.getImportListFunc()
            },
            refreshSize(size) {
                this.size = size;
                this.getImportListFunc()
            },
            changeCheck() {

            },
            //获取列表
            getImportListFunc() {
                this.rootMsg.publicAjax('get',!this.filterMsg?baseUrl.userManage.importUserListBack:baseUrl.bbsManage.importFilterBatchList, {
//                this.rootMsg.publicAjax('get', baseUrl.userManage.importUserListBack, {
                    params: {
                        currentPage: this.pageIndex,
                        pageSize: this.size,
                    }
                }, callbackDeal)
                var _this = this
                function callbackDeal(json) {
                        var dataArr =  json.data.dataList;
                        var pageObj = json.data.pageConfig;
                        if(_this.filterMsg){
                            _this.tableList = dataArr.map(item => {
                                return {
                                    time: formatDate(item.importTime),
                                    result: `${item.importSuccess}条成功  ${item.importFail}条失败`,
                                    list: item.failFile,
                                    data:item,
                                }
                            })
                        }else {
                            _this.tableList = dataArr.map(item => {
                                return {
                                    time: formatDate(item.importTime),
                                    result: `${item.success}人成功  ${item.fail}人失败`,
                                    list: item.failFile,
                                    data:item,
                                }
                            })
                        }

                        _this.pageIndex = pageObj.currentPage
                        _this.size = pageObj.pageSize
                        _this.total = pageObj.totalCount
                        _this.onScroll();
                }
                function formatDate(date) {
                    var d = new Date(date),
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    return [year, month, day].join('-');
                }
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/theme.less";

    .pageBox {
        margin-top: 20px;
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 10px 0;
        text-align: center;
    }

    .tableBox {
        background: #fff;
        border: 1px solid @baseBorderColor;
        box-shadow: @baseShadow;
        padding: 30px;
    }
</style>