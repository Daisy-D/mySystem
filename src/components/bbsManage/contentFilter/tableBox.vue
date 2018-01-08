<template>
    <div class="importTable_view">
        <div class="searchBox">
            <span>过滤内容：</span>
            <Input v-model="filterInput" style="width: 180px;margin-right: 10px;" placeholder="" @on-enter="getFilterListFunc"></Input>
            <Button type="primary" @click="getFilterListFunc" style="width: 70px;">搜索</Button>
        </div>
        <div class="tableBox_view">
            <div class="tableBox">
                <div class="headBtn">
                    <div>
                        <Button type="ghost" style="width: 80px;" @click="addFilterModal=true;addFilterInput='';classifySel=''">添加</Button>
                        <Button type="ghost" style="margin-left: 8px;width: 107px;" @click="batchDeleteFunc">批量删除</Button>
                    </div>
                    <!--<div>-->
                        <!--<Button type="ghost" style="">导出</Button>-->
                    <!--</div>-->
                </div>
                <div class="tableContent">
                    <Table width="100%"   :columns="tableColumns" :data="tableList" ref="table1" @on-selection-change="changeCheck" @on-select-all=""></Table>
                    <div class="pageBox" v-show="true" style="position: relative;">
                        <Page :total="total" show-elevator show-sizer show-total :page-size='size' :current="pageIndex" @on-change="go" @on-page-size-change="refreshSize" :page-size-opts="pageSize" :placement="pagePlace"></Page>
                    </div>
                </div>
            </div>
            <Modal
                    v-model="addFilterModal"
                    title=""
                    :mask-closable="false"
                    @on-ok=""
                    @on-cancel="addFilterModal=false">
                <div class="content_addFilter">
                    <p style="text-align: center;font-size: 17px;font-weight: bold;margin-bottom: 18px;">过滤内容</p>
                    <Input v-model="addFilterInput" >
                        <Select v-model="classifySel" placeholder="请选择分类" slot="prepend" style="width: 155px;">
                            <Option v-for="item in classifySelArr" :value="item.value" :key="item.value">{{item.label}}</Option>
                        </Select>
                    </Input>
                </div>
                <div slot="footer" style="text-align: center;">
                    <Button class="modalBtnSize" type="ghost" @click="addFilterModal=false" style="width: 120px;">取消</Button>
                    <Button class="modalBtnSize" type="primary" @click="addFilterFunc" style="width: 120px;">确定</Button>
                </div>
            </Modal>
            <Modal
                    v-model="deleteFilterModal"
                    title=""
                    :mask-closable="false"
                    @on-ok=""
                    @on-cancel="deleteFilterModal=false">
                <div class="content">
                    <p style="text-align: center;font-size: 17px;font-weight: bold;margin-bottom: 18px;">删除后无法恢复，确定是否删除？</p>
                </div>
                <div slot="footer" style="text-align: center;">
                    <Button class="modalBtnSize" type="ghost" @click="deleteFilterModal=false" style="width: 120px;">取消</Button>
                    <Button class="modalBtnSize" type="primary" @click="deleteFilterFunc" style="width: 120px;">确定</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>

<script>
    import baseUrl from '../../../js/interface';
    export default {
        data(){
            return{
                //过滤ids
                filterContentIds:'',
                //添加过滤内容弹窗部分
                addFilterModal:false,
                classifySel:'',
                classifySelArr:[],
                addFilterInput:'',
                //删除弹窗部分
                deleteFilterModal:false,
                //被选中的数组
                checkArr:[],
                //搜索输入框内容
                filterInput:'',
                //分页参数
                total:0,
                size: 20,
                pageIndex: 1,
                pageSize: [20, 50, 100],
                pagePlace:'bottom',//切换分页出现的位置
                testModal:false,
                tableColumns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '过滤内容',
                        key: 'filterContent',
                        width: '',
                        align: 'left'
                    },
                    {
                        title: '敏感词分类',
                        key: 'wordClassify',
                        width: '',
                        align: 'center'
                    },
                    {
                        title: '生效时间',
                        key: 'activeTime',
                        width: '',
                        align: 'left'
                    },
                    {
                        title: '操作',
                        key: 'user',
                        width: '',
                        align: 'center',
                        render:(h,params) => {
                            return h('Button',{
                                props:{
                                    type:'ghost'
                                },
                                style:{
                                    width:'90px',
//                                    height:'25px',
                                    lineHeight:'16px',
                                },
                                on:{
                                    click:()=>{
                                        this.filterContentIds = this.tableList[params.index].filterContentIds;
                                        this.deleteFilterModal = true
                                    }
                                }
                            },'删除')
                        }
                    },
                ],
                tableList:[]
            }
        },
        props:{
            rootMsg:Object,
        },
        mounted(){
            this.getFilterListFunc();
            this.getFilterClassifyList();
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
                this.getFilterListFunc();
            },
            refreshSize(size){
                this.size = size;
                this.getFilterListFunc();
            },
            changeCheck(val){
                this.checkArr = val
            },
            //获取页面列表
            getFilterListFunc(){
                this.rootMsg.publicAjax('get',baseUrl.bbsManage.searchFilter,{
                    params:{
                        searchContent:this.filterInput,
                        currentPage:this.pageIndex,
                        pageSize:this.size,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    if(json.status=="success"){
                        var dataArr = json.data.dataList;
                        var pageObj = json.data.pageConfig;
                        _this.tableList = dataArr.map(item =>{
                            return{
                                filterContent: item.filterContent,
                                wordClassify: item.filteringContentTypeName,
                                activeTime: formatDate(item.effectiveTime),
                                filterContentIds:item.filterContentId,
                            }
                        })
                        _this.pageIndex = pageObj.currentPage
                        _this.size = pageObj.pageSize
                        _this.total = pageObj.totalCount
                        _this.onScroll();
                    }
                };
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
            //获取添加过滤内容分类列表
            getFilterClassifyList(){
                this.rootMsg.publicAjax('get',baseUrl.bbsManage.filterList,{},callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    if(json.status=="success"){
                        var dataArr = json.data.dataList;
                        _this.classifySelArr = dataArr.map(item => {
                            return {
                                value:item.id,
                                label:item.filterContentTypeName,
                            }
                        })
                    }
                };
            },
            //单独添加过滤内容
            addFilterFunc(){
                if(!this.classifySel){
                    this.$Message.warning('请选择过滤分类')
                    return;
                }
                this.rootMsg.publicAjax('get',baseUrl.bbsManage.addFilter,{
                    params:{
                        filterContent:this.addFilterInput,
                        filteringContentType:this.classifySel,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    if(json.status=="success"){
                        _this.addFilterModal = false;
                        _this.classifySel = '';
                        _this.getFilterListFunc()
                    }
                };
            },
            //批量删除
            deleteFilterFunc(){
                this.rootMsg.publicAjax('get',baseUrl.bbsManage.deleteFilterBatch,{
                    params:{
                        filterContentIds:this.filterContentIds,
                    }
                },callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    if(json.status=="success"){
                        _this.deleteFilterModal = false
                        _this.getFilterListFunc();
                    }
                };
            },
            batchDeleteFunc(){
                if (this.checkArr.length > 0) {
                    this.deleteFilterModal = true;
                    var idsArr = [];
                    this.checkArr.forEach(item => {
                        idsArr.push(item.filterContentIds)
                    })
                    this.filterContentIds = idsArr.join(',')
                } else {
                    this.$Message.warning('请至少选择一项')
                }
            },
        }
    }
</script>
<style lang="less">
    .ivu-input-group-prepend{
        background: #fff ;
    }

</style>
<style scoped lang="less">
    @import "../../../styles/theme.less";
    .searchBox{
        background: #fff;
        padding: 30px;
        border: 1px solid @baseBorderColor;
        box-shadow: @baseShadow;
    }
    .tableBox_view{
        margin-top: 20px;
        background: #fff;
        border: 1px solid @baseBorderColor;
        box-shadow: @baseShadow;
        font-size: 14px;
        padding: 30px;
    }
    /*.headBtn{*/
        /*display: flex;*/
        /*justify-content: space-between;*/
    /*}*/
    .modalBtnSize{
        width: 200px;
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
    .inputDiv{
        display: inline-block;
        width: 185px;
    }
    .content_addFilter{
        margin-bottom: 40px;
    }
</style>
