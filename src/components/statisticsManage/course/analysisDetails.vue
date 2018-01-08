<!--
by: xldai 2017/11 2018/01/05
name: 课程统计s
nodes:
-->
<template>
  <div class="wrap">
    <div class="title_wrap">
      <div class="title_style">{{name}}课程统计</div>
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
  name: "courseAnalysisDetails",
  data: function() {
    return {
      infoList: [],
      courseId: "",
      name: "",
      selectValConfig: {
        orderWay: "",
        orderType: ""
      },
      columns: [
        {
          title: "学期",
          key: "termName",
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
                    innerHTML: params.row.termName
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
                    innerHTML: params.row.termName
                  }
                })
              ]
            );
          }
        },
        {
          title: "视频",
          key: "video",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.video
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
                    innerHTML: params.row.video
                  }
                })
              ]
            );
          }
        },
        {
          title: "作业",
          key: "homework",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.homework
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
                    innerHTML: params.row.homework
                  }
                })
              ]
            );
          }
        },
        {
          title: "资料",
          key: "data",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.data
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
                    innerHTML: params.row.data
                  }
                })
              ]
            );
          }
        },
        {
          title: "考试",
          key: "test",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.test
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
                    innerHTML: params.row.test
                  }
                })
              ]
            );
          }
        },
        {
          title: "讨论答疑",
          key: "discuss",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.discuss
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
                    innerHTML: params.row.discuss
                  }
                })
              ]
            );
          }
        },
        {
          title: "公告",
          key: "notice",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.notice
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
                    innerHTML: params.row.notice
                  }
                })
              ]
            );
          }
        },
        {
          title: "评价",
          key: "evaluate",
          align: "center",
          sortable: true,
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
                    innerHTML: params.row.evaluate
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
                    innerHTML: params.row.evaluate
                  }
                })
              ]
            );
          }
        },
        {
          title: " ",
          key: "evaluate",
          width: "300px",
          render: (h, params) => {
            return h(
              "div",
              {
                class: {
                  tableOperateBtnGroup: true,
                  tabBtnBox:true
                }
              },
              [
                params.row.labelList.map(function(item) {
                  return h(
                    "span",
                    {
                      class: {
                        tabBtn: true
                      }
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            marginRight: "5px"
                          }
                        },
                        item.labelName
                      ),
                      h("span", item.labelNum)
                    ]
                  );
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
    returnFun() {
      this.$router.push({
        path: "/courseAnalysisList"
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
          courseId: _this.courseId,
          orderWay: _this.selectValConfig.orderWay,
          orderType: _this.selectValConfig.orderType
        });
      }, 0);
    },
    /**
    * 导出数据
    */
    exportData() {
      window.location.href =
        nozzle.statisticsCtrl.exportOneCourseStatistics +
        "?orderWay=" +
        this.selectValConfig.orderWay +
        "&orderType=" +
        this.selectValConfig.orderType +
        "&courseId=" +
        this.courseId;
    },
    /**
    * 单个工作量统计 ajax
    * @param {Object} _data
    */
    loadinfoDataAjax(_data) {
      var _this = this;
      window.loadingView.show("courseAnalysisDetails");
      window.util.ajax
        .get(nozzle.statisticsCtrl.oneCourseStatistics, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.infoList = json.data.dataList;
              // _this.infoList = [
              //   {
              //     termName: "123",
              //     video: "1",
              //     homework: "123456",
              //     data: "10",
              //     test: "10",
              //     discuss: "10",
              //     notice: "10",
              //     evaluate: "10",
              //     labelList: [
              //       {
              //         labelName: "幽默风趣",
              //         labelNum: 21
              //       },
              //       {
              //         labelName: "器宇不凡",
              //         labelNum: 666
              //       }
              //     ]
              //   }
              // ];
            })
            .autoRun("login", "error", "courseAnalysisDetails");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("courseAnalysisDetails");
        });
    }
  },
  mounted() {
    this.loadinfoDataAjax({
      courseId: this.courseId
    });
  },
  created() {
    this.courseId = this.$route.query.courseId;
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