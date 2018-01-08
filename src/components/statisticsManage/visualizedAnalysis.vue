<!--
by: xldai 2017/11 2018/01/05
name: 课程点击趋势榜
nodes:
-->
<template>
    <div class="wrap">
        <div class="title_style">课程点击趋势榜</div>
        <div class="box_node">
            <div id="courseClick"></div>
            <Button type="ghost" class="reload_btn" @click="loadCourseClickDataAjax">刷新</Button>
        </div>
        <div class="title_style">最受欢迎的课程Top 10</div>
        <div class="box_node" id="popularCourse"></div>
        <div class="title_style">最受男生欢迎的课程Top 5</div>
        <div class="box_node popular_box">
            <div v-for="item in popularCourseNNList.dataListNan" :key="item.courseId" class="statistics_node">
                <div class="statistics_canvas_title">{{item.courseName}}</div>
                <div :id="'mancourse'+item.courseId" class="statistics_canvas_node"></div>
            </div>
            <div class="clear_float"></div>
        </div>
        <div class="title_style">最受女生欢迎的课程Top 5</div>
        <div class="box_node popular_box">
            <div v-for="item in popularCourseNNList.dataListNv" :key="item.courseId" class="statistics_node">
                <div class="statistics_canvas_title">{{item.courseName}}</div>
                <div :id="'womencourse'+item.courseId" class="statistics_canvas_node"></div>
            </div>
            <div class="clear_float"></div>
        </div>
    </div>
</template>
<script>
    import nozzle from "@/js/interface.js";
    import Vue from "vue";
    import echarts from 'echarts/lib/echarts';
    import 'echarts-wordcloud';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/pie';

    export default {
        name: "visualizedAnalysis",
        data: function () {
            return {
                courseClickList:[],
                popularAllCourseNameList:[],
                popularAllCourseNumList:[],
                popularCourseNNList:[],
                popularCourseManList:[],
                popularCourseWomenList:[],
            };
        },
        methods: {
            /**
            * 字体随机色
            */
            createRandomItemStyle() {
                return {
                    normal: {
                        color: 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')'
                    }
                };
            },
            /**
            * 词云
            */
            drawCourseClick() {
                let myChart = echarts.init(document.getElementById('courseClick'))
                myChart.setOption({
                    tooltip: {
                        show: true
                    },
                    series: [{
                        type: 'wordCloud',
                        textRotation: [0, 45, 90, -45],
                        textPadding: 10,
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },
                        sizeRange: [12, 30],
                        drawOutOfBound: true,
                        data:this.courseClickList
                    }]
                });
            },
            /**
            * 最受欢迎的课们
            */
            drawPopularAllCourse() {
                let myChart = echarts.init(document.getElementById('popularCourse'));
                myChart.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [{
                        type: 'category',
                        data: this.popularAllCourseNameList,
                        axisLabel:{
                        interval:0,
                        rotate:20,
                        margin:6,
                        textStyle:{
                              color:"#222"
                        }},
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        // name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.popularAllCourseNumList
                    }]
                });
            },
            /**
            * 最受男生欢迎的课们
            * @param {String} _id
            * @param {String} _name
            * @param {String} _list
            */
            drawPopularCourseMan(_id,_name,_list) {
                let myChart = echarts.init(document.getElementById(_id));
                myChart.setOption({
                    title : {
                        text: _name, 
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show : true
                    },
                    calculable : false,
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:_list
                        }
                    ]
                });
            },
            /**
            * 最受女生欢迎的课们
            * @param {String} _id
            * @param {String} _name
            * @param {String} _list
            */
            drawPopularCourseWomen(_id,_name,_list){
                let myChart = echarts.init(document.getElementById(_id));
                myChart.setOption({
                    title : {
                        text: _name,
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    toolbox: {
                        show : true,
                    },
                    calculable : false,
                    series : [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:_list
                        }
                    ]
                });
            },
            /**
            * 课程管理-课程点击趋势 ajax
            * @param {Object} _data
            * @param {Boolean} ifP
            */
            loadCourseClickDataAjax(_data, ifP) {
                window.loadingView.show("visualizedAnalysis");
                return window.util.ajax
                .get(nozzle.course.courseTrend, {
                params: _data
                })
                .then((res) => {
                    if (!ifP) {
                        this.resolveLoadCourseClickDataAjax(res);
                    } else {
                        return res;
                    }
                })
                .catch(function(error) {
                window.util.checkAjaxError(error).autoRun("visualizedAnalysis");
                });
            },
            /**
            * 课程管理-课程点击趋势-执行函数
            * @param {String} res
            */
            resolveLoadCourseClickDataAjax (res) {
                var _this = this;
                var ajaxInterface = window.util.checkAjaxJson(res);
                ajaxInterface
                    .thenSuccess(function(json) {
                        _this.courseClickList.splice(0,_this.courseClickList.length);
                        // json.data.dataList=[{"clicks":452,"courseId":1518,"courseName":"口语系统教学"},{"clicks":448,"courseId":1335,"courseName":"中国文化概况"},{"clicks":404,"courseId":1354,"courseName":"跨文化交流"},{"clicks":350,"courseId":1524,"courseName":"走向人生巅峰wdc"},{"clicks":77,"courseId":1512,"courseName":"MHK（三级）应试技巧    "},{"clicks":55,"courseId":1370,"courseName":"时间管理"},{"clicks":29,"courseId":1369,"courseName":"Domino 实战分享"},{"clicks":24,"courseId":1359,"courseName":"testInsert"},{"clicks":21,"courseId":1543,"courseName":"大版本！"},{"clicks":20,"courseId":1387,"courseName":"创业团队管理"},{"clicks":17,"courseId":1535,"courseName":"11"},{"clicks":16,"courseId":1373,"courseName":"资源整合与融资技巧"},{"clicks":15,"courseId":1444,"courseName":"如何克服创新障碍"},{"clicks":10,"courseId":1372,"courseName":"创业风险控制"},{"clicks":8,"courseId":1542,"courseName":"音乐考试监考机和考试机上手教程"},{"clicks":8,"courseId":1371,"courseName":"职场不良习惯"},{"clicks":8,"courseId":1521,"courseName":"ceshi"},{"clicks":8,"courseId":1538,"courseName":"综合英语III "},{"clicks":6,"courseId":1522,"courseName":"模拟训练"},{"clicks":1,"courseId":1374,"courseName":"创业核心心理品质"},{"clicks":452,"courseId":1518,"courseName":"口语系统教学"},{"clicks":448,"courseId":1335,"courseName":"中国文化概况"},{"clicks":404,"courseId":1354,"courseName":"跨文化交流"},{"clicks":350,"courseId":1524,"courseName":"走向人生巅峰wdc"},{"clicks":77,"courseId":1512,"courseName":"MHK（三级）应试技巧    "},{"clicks":55,"courseId":1370,"courseName":"时间管理"},{"clicks":29,"courseId":1369,"courseName":"Domino 实战分享"},{"clicks":24,"courseId":1359,"courseName":"testInsert"},{"clicks":21,"courseId":1543,"courseName":"大版本！"},{"clicks":20,"courseId":1387,"courseName":"创业团队管理"},{"clicks":17,"courseId":1535,"courseName":"11"},{"clicks":16,"courseId":1373,"courseName":"资源整合与融资技巧"},{"clicks":15,"courseId":1444,"courseName":"如何克服创新障碍"},{"clicks":10,"courseId":1372,"courseName":"创业风险控制"},{"clicks":8,"courseId":1542,"courseName":"音乐考试监考机和考试机上手教程"},{"clicks":8,"courseId":1371,"courseName":"职场不良习惯"},{"clicks":8,"courseId":1521,"courseName":"ceshi"},{"clicks":8,"courseId":1538,"courseName":"综合英语III "},{"clicks":6,"courseId":1522,"courseName":"模拟训练"},{"clicks":1,"courseId":1374,"courseName":"创业核心心理品质"}]
                        json.data&&json.data.dataList&&json.data.dataList.forEach((item,index)=>{
                            _this.courseClickList.push({
                                name:item.courseName,
                                value:item.clicks,
                                textStyle:_this.createRandomItemStyle()
                            })
                        })
                        _this.drawCourseClick();
                    })
                    .autoRun("login", "error", "visualizedAnalysis");
            },
            /**
            * 课程管理-最受欢迎的课程TOP10 ajax
            * @param {Object} _data
            * @param {Boolean} ifP
            */
            loadPopularAllCourseAjax(_data, ifP){
                window.loadingView.show("visualizedAnalysis");
                return window.util.ajax
                .get(nozzle.course.welcomeAllCourse, {
                params: _data
                })
                .then((res) => {
                    if (!ifP) {
                        this.resolveLoadPopularAllCourseAjax(res);
                    } else {
                        return res;
                    }
                })
                .catch(function(error) {
                window.util.checkAjaxError(error).autoRun("visualizedAnalysis");
                });
            },
            /**
            * 课程管理-课程点击趋势-执行函数
            * @param {String} res
            */
            resolveLoadPopularAllCourseAjax(res) {
                var _this = this;
                var ajaxInterface = window.util.checkAjaxJson(res);
                ajaxInterface
                    .thenSuccess(function(json) {
                        json.data&&json.data.dataList&&json.data.dataList.forEach((item,index)=>{
                            _this.popularAllCourseNameList.push(item.courseName);
                            _this.popularAllCourseNumList.push(item.stuTotal);
                        })
                        _this.drawPopularAllCourse();
                    })
                    .autoRun("login", "error", "visualizedAnalysis");
            },
            /**
            * 课程管理-最受男女欢迎的课程TOP5 ajax
            * @param {Object} _data
            * @param {Boolean} ifP
            */
            loadPopularNNCourseAjax(_data, ifP){
                window.loadingView.show("visualizedAnalysis");
                return window.util.ajax
                .get(nozzle.course.welcomeNNCourse, {
                params: _data
                })
                .then((res) => {
                    if (!ifP) {
                        this.resolveLoadPopularNNCourseAjax(res);
                    } else {
                        return res;
                    }
                })
                .catch(function(error) {
                window.util.checkAjaxError(error).autoRun("visualizedAnalysis");
                });
            },
            /**
            * 课程管理-最受男女欢迎的课程TOP5-执行函数
            * @param {String} res
            */
            resolveLoadPopularNNCourseAjax(res) {
                var _this = this;
                var ajaxInterface = window.util.checkAjaxJson(res);
                ajaxInterface
                    .thenSuccess(function(json) {
                        _this.popularCourseNNList = json.data;
                        setTimeout(() => {
                            json.data&&json.data.dataListNan&&json.data.dataListNan.forEach((item,index)=>{
                                _this.drawPopularCourseMan('mancourse'+item.courseId,item.courseName,[
                                    {
                                        value:item.courseTotalNan, 
                                        name:'男',
                                        itemStyle: {
                                            normal: {
                                                color: '#2dc7c9'
                                            }
                                        }
                                    },
                                    {
                                        value:item.courseTotalNv, 
                                        name:'女',
                                        itemStyle: {
                                            normal: {
                                                color: '#b6a2de'
                                            }
                                        }
                                    }
                                ]);
                            })
                        }, 0);
                        setTimeout(() => {
                            json.data&&json.data.dataListNv&&json.data.dataListNv.forEach((item,index)=>{
                                console.log(item.courseName);
                                _this.drawPopularCourseWomen('womencourse'+item.courseId,item.courseName,[
                                    {
                                        value:item.courseTotalNan, 
                                        name:'男',
                                        itemStyle: {
                                            normal: {
                                                color: '#2dc7c9'
                                            }
                                        }
                                    },
                                    {
                                        value:item.courseTotalNv, 
                                        name:'女',
                                        itemStyle: {
                                            normal: {
                                                color: '#b6a2de'
                                            }
                                        }
                                    }
                                ]);
                            })
                        }, 0);
                    })
                    .autoRun("login", "error", "visualizedAnalysis");
            }
        },
        mounted() {
            const ajaxList=[this.loadCourseClickDataAjax(null, true),this.loadPopularAllCourseAjax(null, true),this.loadPopularNNCourseAjax(null, true)]
            Promise.all(ajaxList).then((vals) => {
                this.resolveLoadCourseClickDataAjax(vals[0])
                this.resolveLoadPopularAllCourseAjax(vals[1])
                this.resolveLoadPopularNNCourseAjax(vals[2])
            })            
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    };
</script>
<style scoped lang='less'>
@import "../../styles/theme.less";
.wrap {
  .clear_float {
    clear: both;
  }
  .title_style {
    font-size: 15px;
    font-size: 15px;
    line-height: @TitleFontSize;
    margin-bottom: 20px;
  }
  .box_node {
    height: 300px;
    width: 100%;
    background: #ffffff !important;
    border: 1px solid @baseBorderColor;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: @baseShadow;
    margin: 20px 0;
    overflow: hidden;
    position: relative;
    #courseClick {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 15px 120px 15px 80px;
    }
    .reload_btn {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 90px;
      height: 26px;
      line-height: 14px;
    }
    .statistics_node {
      width: 20%;
      height: 100%;
      float: left;
      .statistics_canvas_title{
          width: 100%;
          height: 14px;
          text-align: center;
          color: #2d82d6;
          font-weight: bold;
      }
      .statistics_canvas_node{
          width: 100%;
          height: 100%;
      }
    }
  }
  #popularCourse {
    padding: 0 200px 20px 200px;
  }
  .popular_box {
    padding-top: 30px;
    .statistics_node {
      height: 250px;
    }
  }
}
</style>