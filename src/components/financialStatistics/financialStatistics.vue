<template>
    <div class="financialStatistics">
        <div class="title">课程收入统计</div>
        <div class="incomeList" v-for="(item,index) in incomeList">
            <div class="incomeName">{{item.courseName}}</div>
            <div class="incomeDetailed">
                总收入：<span class="totalIncome">{{item.incomeTotal}}</span>元<span
                    style="display: inline-block;width: 40px"></span>购买人数：<span>{{item.buyNum}}</span>人
                <div @click="jumpDetails(item.courseId,item.courseName)" class="detailsBut">查看详情</div>
            </div>
        </div>
    </div>
</template>

<script>
    import url from '../../js/interface.js';
    export default{
        data () {
            return {
                incomeList: [],
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
                window.util.ajax.get(url.financialStatistics.financeStatistics).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.incomeList = json.data.dataList
                    }).autoRun("login", "error", "courseTypeList");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("courseTypeList");
                });
            },
//            跳转详情
            jumpDetails(id,name){
                this.$router.push({
                    path: "/financeManageDetails",
                    query: {
                        courseId: id,
                        courseName: name,
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


<style lang="less" scoped>
    @import "../../styles/theme.less";

    .title {
        font-size: 22px;
    }

    .incomeList {
        border: 1px solid @baseBorderColor;
        margin-top: 20px;
        box-shadow:@baseShadow;
    }

    .incomeName {
        height: 53px;
        background: #f7f7f7;
        font-size: 17px;
        text-indent: 22px;
        line-height: 53px;
        border-bottom: 1px solid @baseBorderColor;
    }

    .incomeDetailed {
        font-size: 14px;
        height: 100px;
        line-height: 100px;
        text-indent: 22px;
        background: #fff;
    }

    .totalIncome {
        font-size: 36px;
    }

    .detailsBut {
        width: 120px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        float: right;
        background: #f36444;
        margin-top: 33px;
        margin-right: 21px;
        border-radius: 5px;
        color: #fff;
        text-indent: 0;
        cursor: pointer;
    }
</style>
