<!--
by: xldai 2017/11 2018/01/05
name: 课程统计
nodes:
-->
<template>
  <div class="wrap">
    <div class="title_wrap">
      <div class="title_style">课程统计</div>
      <Button type="primary" class="title_button" @click="isExport=true">导出</Button>
      <div class="clear_float"></div>
    </div>
    <div class="list_box">
      <Table size="small" :columns="columns" :data="infoList" @on-sort-change="tableSortChange"></Table>
      <div class="page_box" v-show="pageMark">
        <Page @on-change="changePage" @on-page-size-change="changeSize" :total="pageConfig.totalCount" :current="pageConfig.currentPage"
          :placement="pageConfig.placement" :page-size='pageConfig.pageSize' :page-size-opts="pageConfig.sizeList" size="small"
          show-total show-elevator show-sizer></Page>
      </div>
    </div>
    <Modal v-model="isExport" :mask-closable="false" :scrollable="false">
        <div style="font-size: 17px;height: 36px;text-align: center;line-height: 1;">提示</div>
        <div style="height: 26px;text-align: center;line-height: 1;">数据量较大，请确认是否执行导出。</div>
        <div slot="footer">
            <Button type="primary" style="width: 118px;height: 38px;line-height: 1;margin-right:35px;" @click="addSubjectExport">确定</Button>
            <Button type="ghost" @click="isExport=false" style="width: 118px;height: 38px;line-height: 1;">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import nozzle from "@/js/interface.js";

export default {
  name: "courseAnalysisList",
  data: function() {
    return {
      infoList: [],
      isExport: false,
      pageConfig: {
        currentPage: 1,
        pageSize: 20,
        placement: "top",
        totalCount: 0,
        sizeList: [20, 50, 100]
      },
      selectValConfig: {
        orderWay: "",
        orderType: ""
      },
      pageMark: true,
      columns: [
        {
          title: "课程",
          key: "courseName",
          width:"160px",
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
          title: "学期数",
          key: "termNum",
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
                    innerHTML: params.row.termNum
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
                    innerHTML: params.row.termNum
                  }
                })
              ]
            );
          }
        },
        {
          title: "学生数",
          key: "stuNum",
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
                    innerHTML: params.row.stuNum
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
                    innerHTML: params.row.stuNum
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
          title: "操作",
          key: "operate",
          align: "center",
          width: "120px",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "ghost",
                    size: "small"
                  },
                  style: {
                    width: "100%"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/courseAnalysisDetails",
                        query: {
                          courseId: params.row.courseId,
                          name: params.row.courseName
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    /**
    * 确定导出
    */
    addSubjectExport(){
      this.isExport=false;
      window.location.href =
        nozzle.statisticsCtrl.exportCourseStatistics +
        "?orderWay=" +
        this.selectValConfig.orderWay +
        "&orderType=" +
        this.selectValConfig.orderType;
    },
    /**
    * 页码变化
    * @param {String} page
    */
    changePage(page) {
      this.pageConfig.currentPage = page;
      this.loadinfoDataAjax({
        pageSize: this.pageConfig.pageSize,
        currentPage: this.pageConfig.currentPage,
        orderWay: this.selectValConfig.orderWay,
        orderType: this.selectValConfig.orderType
      });
    },
    /**
    * pageSize变化
    * @param {String} page
    */
    changeSize(size) {
      this.pageConfig.pageSize = size;
      this.loadinfoDataAjax({
        pageSize: this.pageConfig.pageSize,
        currentPage: this.pageConfig.currentPage,
        orderWay: this.selectValConfig.orderWay,
        orderType: this.selectValConfig.orderType
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
          pageSize: _this.pageConfig.pageSize,
          currentPage: _this.pageConfig.currentPage,
          orderWay: _this.selectValConfig.orderWay,
          orderType: _this.selectValConfig.orderType
        });
      }, 0);
    },
    /**
    * 工作量统计列表 ajax
    * @param {Object} _data
    */
    loadinfoDataAjax(_data) {
      var _this = this;
      window.loadingView.show("courseAnalysisList");
      window.util.ajax
        .get(nozzle.statisticsCtrl.courseStatistics, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.infoList = json.data.dataList;
              _this.pageConfig.totalCount = json.data.pageConfig.totalCount;
              _this.pageConfig.currentPage = json.data.pageConfig.currentPage;
              _this.infoList &&
                _this.infoList.forEach(item => {
                  item.isEditLink = false;
                  item.isEditPath = false;
                });
            })
            .autoRun("login", "error", "courseAnalysisList");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("courseAnalysisList");
        });
    }
  },
  mounted() {
    this.loadinfoDataAjax({
      currentPage: this.pageConfig.currentPage,
      pageSize: this.pageConfig.pageSize
    });
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
  .title_style{
    height: 36px;
    line-height: 1;
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
    padding: 20px 30px 10px;
    .page_box {
      width: 100%;
      background: #ffffff;
      text-align: center;
      height: 50px;
      line-height: 50px;
      z-index: 9;
    }
  }
}
</style>