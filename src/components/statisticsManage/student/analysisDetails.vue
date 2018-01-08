<!--
by: xldai 2017/11 2018/01/05
name: 学生学习统计
nodes:
-->
<template>
  <div class="wrap">
    <div class="title_wrap">
      <div class="title_style">{{name}}学生学习统计</div>
      <Button type="primary" class="title_button" @click="returnFun">返回</Button>
      <Button type="primary" class="title_button" style="margin-right:10px;" @click="exportData">导出</Button>
      <div class="clear_float"></div>
    </div>
    <div class="list_box">
      <Table size="small" :columns="columns" :data="infoList" @on-sort-change="tableSortChange"></Table>
    </div>
  </div>
</template>
<script>
import nozzle from "@/js/interface.js";

export default {
  name: "studentAnalysisDetails",
  data: function() {
    return {
      infoList: [],
      userId:'',
      name:'',
      selectValConfig: {
        orderWay: "",
        orderType: ""
      },
      columns: [
        {
          title: "课程",
          key: "courseName",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top-start" : "bottom-start",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.courseName
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.courseName
                  }
                })
              ]
            );
          }
        },
        {
          title: "学期",
          key: "term",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top-start" : "bottom-start",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.term
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.term
                  }
                })
              ]
            );
          }
        },
        {
          title: "最新听课时间",
          key: "lastTime",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top-start" : "bottom-start",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.lastTime
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.lastTime
                  }
                })
              ]
            );
          }
        },
        {
          title: "听课数量",
          key: "listenCourseNum",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.listenCourseNum+'节'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.listenCourseNum+'节'
                  }
                })
              ]
            );
          }
        },
        {
          title: "作业得分",
          key: "homeworkScore",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.homeworkScore+'分'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.homeworkScore+'分'
                  }
                })
              ]
            );
          }
        },
        {
          title: "视频得分",
          key: "videoScore",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.videoScore+'分'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.videoScore+'分'
                  }
                })
              ]
            );
          }
        },
        {
          title: "平时成绩",
          key: "normalScore",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.normalScore+'分'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.normalScore+'分'
                  }
                })
              ]
            );
          }
        },
        {
          title: "考试得分",
          key: "testScore",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.testScore+'分'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.testScore+'分'
                  }
                })
              ]
            );
          }
        },
        {
          title: "加分",
          key: "addScore",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.addScore+'分'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.addScore+'分'
                  }
                })
              ]
            );
          }
        },
        {
          title: "总成绩",
          key: "allScore",
          align: "center",
          render(h, params) {
            return h(
              "Tooltip",
              {
                props: {
                  placement: params.index > 10 ? "top" : "bottom",
                  delay: 1000
                }
              },
              [
                h("div", {
                  slot: "content",
                  style: {
                    whiteSpace: "normal"
                  },
                  domProps: {
                    innerHTML: params.row.allScore+'分'
                  }
                }),
                h("div", {
                  style: {
                    wordBreak: "keep-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  domProps: {
                    innerHTML: params.row.allScore+'分'
                  }
                })
              ]
            );
          }
        }
      ]
    };
  },
  methods: {
    /**
    * 返回按钮
    */
    returnFun(){
      this.$router.push({
        path: "/studentAnalysisList"
      });
    },
    /**
    * 表头排序
    * @param {Object} _data
    */
    tableSortChange(_data) {
      var _this = this;
      this.tableSortColumns = _data.column;
      this.selectValConfig.orderWay = _data.key;
      if (_data.order == "desc") {
        this.selectValConfig.orderType = 2;
      } else if (_data.order == "asc") {
        //升序˝
        this.selectValConfig.orderType = 1;
      } else {
        this.selectValConfig.orderWay = "";
        this.selectValConfig.orderType = "";
      }
      setTimeout(function() {
        _this.loadinfoDataAjax({
          userId:_this.userId,
          orderWay: _this.selectValConfig.orderWay,
          orderType: _this.selectValConfig.orderType
        });
      }, 0);
    },
    /**
    * 导出数据
    */
    exportData() {
      window.location.href = nozzle.statisticsCtrl.exportOneStuStatistics+"?userId=" + this.userId;
    },
    /**
    * 单个工作量统计 ajax
    * @param {Object} _data
    */
    loadinfoDataAjax(_data) {
      var _this = this;
      window.loadingView.show("studentAnalysisDetails");
      window.util.ajax
        .get(nozzle.statisticsCtrl.oneStuStatistics, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.infoList = json.data.dataList;
              _this.infoList &&_this.infoList.forEach(item => {
                  item.isEditLink = false;
                  item.isEditPath = false;
                });
            })
            .autoRun("login", "error", "studentAnalysisDetails");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("studentAnalysisDetails");
        });
    }
  },
  mounted() {
    this.loadinfoDataAjax({
        userId:this.userId
    });
  },
  created(){
    this.userId = this.$route.query.userId;
    this.name = this.$route.query.name;
  },
  beforeRouteLeave (to, from, next) {
    this.$destroy();
    next()
  }
};
</script>


<style scoped lang='less'>
@import "../../../styles/theme.less";

.wrap {
  .clear_float {
    clear: both;
  }
  .title_wrap {
    height: 22px;
    width: 100%;
    .title_style {
      font-size: @TitleFontSize;
      line-height: @TitleFontSize;
      margin-bottom: 30px;
      float: left;
    }
    .title_button {
      float: right;
      width: 80px;
    }
  }
  .list_box {
    width: 100%;
    background-color: #ffffff;
    border: 1px solid @baseBorderColor;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: @baseShadow;
    margin: 20px 0;
    overflow: hidden;
    padding: 20px 30px 30px;
  }
}
</style>