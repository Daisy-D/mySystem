<template>
<div class="financeManageDetails">
    <div class="header">
        <div class="title">{{courseName}}</div>
        <div @click="backBut" class="backBut">返回</div>
    </div>
    <div class="dataList">
        <div class="headerList">
            <span>订单号</span>
            <span>购买课程</span>
            <span>用户名</span>
            <span>交易金额</span>
            <span>交易时间</span>
        </div>
        <div class="headerList" v-for="(item,key) in dataList">
            <span>{{item.orderNum}}</span>
            <span>{{item.courseName}}</span>
            <span>{{item.userName}}</span>
            <span>{{item.money}}</span>
            <span>{{time(item.transactionTime)}}</span>
        </div>
        <div class="page" style="border: 0;">
            <Page :total="page.total" :page-size="page.size"  show-sizer show-elevator show-total
                  @on-change="go" @on-page-size-change="size" v-if="dataList && dataList.length !== 0"
                  :current="page.index" :page-size-opts="page.list" placement="top" class="Pager"></Page>
        </div>
    </div>
</div>
</template>

<script>
    import url from '../../js/interface.js';
    export default{
        data () {
            let page = {
                index: 1,
                size: 20,
                total: 100,
                list: [20,50,100]
            }
            return{
                page,
                dataList:[],
                courseId:'',
                courseName:'',
            }
        },
        activated(){
            this.courseId = this.$route.query.courseId;
            this.courseName = this.$route.query.courseName;
            this.listData()
        },
        methods:{
            listData(){
                var _this = this;
                window.loadingView.show("orderInfo");
                window.util.ajax.get(url.financeManageDetails.orderInfo,{
                    params: {
                        courseId: _this.courseId,
                        currentPage: _this.page.index,
                        pageSize:_this.page.size,
                    }
                }).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.dataList = json.data.dataList;
                        for(var i =0;i<_this.dataList.length;i++){
//                            getLocalTime(_this.dataList[i].transactionTime)
                            var q = _this.dataList[i].transactionTime;
                            console.log(new Date(parseInt(q) * 1000).toLocaleString().replace(/年|月/g, "/").replace(/日/g, "/"))
                        }
                        _this.page.index = json.data.pageConfig.currentPage;
                        _this.page.size = json.data.pageConfig.pageSize;
                        _this.page.total = json.data.pageConfig.totalCount;
                    }).autoRun("login", "error", "orderInfo");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("orderInfo");
                });
            },
            backBut(){
                this.$router.push({
                    path: "/financialStatistics",
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
            time(data){
                var T = " "
               try {
                   T = new Date(parseInt(data) * 1000).toLocaleString()
               }catch (e){

               }finally {
                    if(!data){
                        T = ""
                    }
                   return T
               }

            },
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>


<style lang="less" scoped>
    @import "../../styles/theme.less";
    .financeManageDetails{
        /*padding: 30px;*/
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
    .dataList{
        padding: 30px;
        background: #fff;
    }
    .headerList{
        font-size: 14px;
        overflow: hidden;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }
    .headerList:nth-child(1){
        font-weight: bold;
    }
    .headerList span{
        float: left;
        width: 20%;
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
</style>
