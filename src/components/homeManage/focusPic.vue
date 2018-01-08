<!--
by: xldai 2017/11 2018/01/05
name: 焦点图管理
nodes:
-->
<template>
  <div class="wrap">
    <div class="title_style">焦点图管理</div>
    <div class="message_style">系统建议您不要添超过5个焦点图</div>
    <div class="foucus_pic_node" v-for="(item,index) in infoList" :key="item.id">
      <div class="pic_box">
        <div class="img_style" v-if="!!item.path" :style="{backgroundImage:'url('+item.path+')'}" />
        <Upload v-show="(item.percent==0||item.percent==100)&&!item.isError" accept='image/*' :action="uploadImageAjaxLink" :before-upload="beforeUploadFun">
          <Button type="ghost" class="uploading_pic_btn" @click="choiceNodeFun(index)">
            <Icon type="image" class="add_pic"></Icon>
            <span>{{item.path?'更换图片':'上传图片'}}</span>
          </Button>
        </Upload>
        <div v-show="item.percent!=0&&item.percent!=100&&!item.isError" class="uploading_pic_btn_box">
          <span class="add_pic_box">
            <Icon type="image" class="add_pic"></Icon>已上传{{item.percent}}%</span>
          <Button type="text" class="cancel_upload" @click="cancelUploadFun" style="height:38px;">删除</Button>
        </div>
        <div class="error_btn_box" v-show="item.isError">
          <span class="add_pic_box">
            <Icon type="image" class="add_pic"></Icon>上传失败</span>
          <Upload :action="uploadImageAjaxLink" :before-upload="beforeUploadFun" accept='image/*'>
            <Button type="text" class="cancel_upload" @click="cancelUploadFun" style="height:38px;">重新上传</Button>
          </Upload>
        </div>
      </div>
      <div class="info_box">
        <span class="info_title">链接地址：</span>
        <div @click="editFun(index)" class="link_box">
          <span v-show="!item.isEditLink&&!!item.link">{{item.link}}</span>
          <Icon v-show="!item.isEditLink&&!!item.link" class="edit_btn" type="edit"></Icon>
        </div>
        <Input v-show="item.isEditLink||!item.link" v-model="item.link" placeholder="输入焦点图链接地址" class="info_input"></Input>
        <Button v-show="item.isEditLink||!item.link" @click="saveFun(index)" type="ghost" style="width: 100px;margin-left:5px;">保存</Button>
      </div>
      <div class="button_box">
        <div v-show="index!=0" class="up_move" @click="moveFun(item.id,1)">上移
          <Icon type="ios-arrow-thin-up" class="move_icon"></Icon>
        </div>
        <div v-show="index!=infoList.length-1" class="down_move" @click="moveFun(item.id,2)">下移
          <Icon type="ios-arrow-thin-down" class="move_icon"></Icon>
        </div>
        <div v-show="!(index==0&&infoList.length==1)" class="dell_node" @click="dellFun(item.id)">
          <Icon type="ios-close"></Icon>
        </div>
      </div>
    </div>
    <div class="add_focus_img" @click="addFocusImgFun">新建焦点图</div>
    <Modal v-model="isDell" :mask-closable="false" :scrollable="false">
      <div style="font-size: 17px;height: 36px;text-align: center;line-height: 1;">是否确定要删除焦点图</div>
      <div slot="footer">
        <Button type="ghost" @click="isDell=false" style="width: 118px;height: 38px;line-height: 1;margin-right:35px;">取消</Button>
        <Button type="primary" style="width: 118px;height: 38px;line-height: 1;" @click="okDellFun">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import nozzle from "@/js/interface.js";
import Vue from "vue";
import axios from "axios";
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default {
  name: "focusPic",
  data: function() {
    return {
      aaa:"https://resource.elearnmooc.com/UploadService/upload/dd06e4747b564633afb1a47cf32b6db0.jpg",
      choiceNodeIndex: "",
      dellId: "",
      isDell: false,
      picBoxDom: null,
      infoList: [],
      uploadImageAjaxLink: "",
      uploadImageAjaxData: {}
    };
  },
  methods: {
    /**
    * 添加焦点图
    */
    addFocusImgFun() {
      let _index;
      if (this.infoList.length > 0) {
        _index = this.infoList[this.infoList.length - 1].index + 1;
      } else {
        _index = 1;
      }
      this.editFocusImgAjax({
        index: _index
      });
    },
    /**
    * 保存焦点图链接
    * @param {String} _index
    */
    saveFun(_index) {
      if (this.infoList[_index].link) {
        this.editFocusImgAjax({
          id: this.infoList[_index].id,
          path: this.infoList[_index].path,
          link: this.infoList[_index].link,
          index: this.infoList[_index].index
        });
      } else {
        this.$Message.warning("保存失败，请输入焦点图链接地址");
      }
    },
    /**
    * 删除焦点图
    * @param {String} _id
    */
    dellFun(_id) {
      this.isDell = true;
      this.dellId = _id;
    },
    /**
    * 确定删除焦点图
    */
    okDellFun() {
      this.deleteFocusImgAjax({
        id: this.dellId
      });
    },
    /**
    * 移动焦点图
    * @param {String} _id
    * @param {String} _type
    */
    moveFun(_id, _type) {
      this.moveFocusImgAjax({
        id: _id,
        moveType: _type
      });
    },
    /**
    * 修改焦点图链接
    * @param {String} _index
    */
    editFun(_index) {
      this.infoList[_index].isEditLink = true;
      Vue.set(this.infoList, _index, this.infoList[_index]);
    },
    /**
    * 更换焦点图
    * @param {String} _index
    */
    choiceNodeFun(_index) {
      this.choiceNodeIndex = _index;
    },
    /**
    * 上传ajax调用成功调用的函数
    * @param {Object} _response
    * @param {Object} _this
    */
    successFun(_response ,_this) {
      _this.infoList[_this.choiceNodeIndex].isError = false;
      setTimeout(()=>{
        _this.editFocusImgAjax({
          id: _this.infoList[_this.choiceNodeIndex].id,
          path: _response.data.data.fileList[0].filePath,
          link: _this.infoList[_this.choiceNodeIndex].link,
          index: _this.infoList[_this.choiceNodeIndex].index
        });
      },0)
    },
    /**
    * 上传ajax调用失败调用的函数
    * @param {Object} _this
    */
    errorFun(_this) {
      _this.infoList[_this.choiceNodeIndex].isError = true;
    },
    /**
    * 取消上传
    */
    cancelUploadFun() {
      source.cancel();
      _this.infoList[_this.choiceNodeIndex].percent = 0;
      Vue.set(
        _this.infoList,
        _this.choiceNodeIndex,
        _this.infoList[_this.choiceNodeIndex]
      );
    },
    /**
    * 上传前调用
    * @param {Object} file
    */
    beforeUploadFun(file) {
      var formData = new FormData();
      var _this = this;
      formData.append("_file", file);
      axios
        .post(this.uploadImageAjaxLink, formData, {
          cancelToken: source.token,
          header: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(event) {
            _this.uploadProgressFun(event, _this);
          }
        })
        .then(res => {
          _this.successFun(res,_this);
        })
        .catch(function(thrown) {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          } else {
            _this.errorFun(_this);
          }
        });
      return false;
    },
    /**
    * 上传进程
    * @param {Object} _event
    * @param {Object} _this
    */
    uploadProgressFun(_event, _this) {
      _this.infoList[_this.choiceNodeIndex].percent = (_event.loaded / _event.total *100).toFixed(2);
      Vue.set(
        _this.infoList,
        _this.choiceNodeIndex,
        _this.infoList[_this.choiceNodeIndex]
      );
    },
    /**
    * 上传 ajax
    * @param {Object} _data
    */
    loadinfoDataAjax(_data) {
      var _this = this;
      window.loadingView.show("focusPic");
      window.util.ajax
        .get(nozzle.background.queryFocusImgList, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.infoList = json.data.dataList;
              _this.infoList.sort((a, b) => {
                return a.index - b.index;
              });
              _this.infoList &&
                _this.infoList.forEach(item => {
                  item.percent = 0;
                  item.isError = false;
                  if (item.link) {
                    item.isEditLink = false;
                  } else {
                    item.isEditLink = true;
                  }
                });
            })
            .autoRun("login", "error", "focusPic");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("focusPic");
        });
    },
    /**
    * 修改焦点图 ajax
    * @param {Object} _data
    */
    editFocusImgAjax(_data) {
      var _this = this;
      window.loadingView.show("focusPic");
      window.util.ajax
        .get(nozzle.background.editFocusImg, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.$Message.success(json.message);
              _this.loadinfoDataAjax();
            })
            .autoRun("login", "error", "focusPic");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("focusPic");
        });
    },
    /**
    * 删除焦点图 ajax
    * @param {Object} _data
    */
    deleteFocusImgAjax(_data) {
      var _this = this;
      window.loadingView.show("focusPic");
      window.util.ajax
        .get(nozzle.background.deleteFocusImg, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.$Message.success(json.message);
              _this.isDell = false;
              _this.loadinfoDataAjax();
            })
            .autoRun("login", "error", "focusPic");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("focusPic");
        });
    },
    /**
    * 移动焦点图 ajax
    * @param {Object} _data
    */
    moveFocusImgAjax(_data) {
      var _this = this;
      window.loadingView.show("focusPic");
      window.util.ajax
        .get(nozzle.background.moveFocusImg, {
          params: _data
        })
        .then(function(res) {
          var ajaxInterface = window.util.checkAjaxJson(res);
          ajaxInterface
            .thenSuccess(function(json) {
              _this.$Message.success(json.message);
              _this.loadinfoDataAjax();
            })
            .autoRun("login", "error", "focusPic");
        })
        .catch(function(error) {
          window.util.checkAjaxError(error).autoRun("focusPic");
        });
    }
  },
  mounted() {
    this.loadinfoDataAjax();
    this.uploadImageAjaxLink = nozzle.uploadService.upload;
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
  .title_style {
    font-size: @TitleFontSize;
    line-height: @TitleFontSize;
    margin-bottom: 30px;
  }
  .message_style {
    line-height: 14px;
    margin-bottom: 10px;
  }
  .foucus_pic_node {
    height: 240px;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid @baseBorderColor;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: @baseShadow;
    margin: 20px 0;
    overflow: hidden;
    position: relative;
    .pic_box {
      position: relative;
      width: 100%;
      height: 185px;
      background: #f4f4f4;
      .img_style {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 5px 5px 0 0;
        background-size: cover;
        background-position: center center;
      }
      .uploading_pic_btn {
        width: 180px;
        height: 38px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -18px;
        margin-left: -90px;
        font-size: 12px;
        .add_pic {
          position: absolute;
          left: 20px;
          top: 12px;
          color: #aaaaaa;
        }
      }
      .uploading_pic_btn_box {
        width: 210px;
        height: 38px;
        line-height: 38px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -18px;
        margin-left: -105px;
        border-radius: 5px;
        font-size: 12px;
        .add_pic_box {
          display: inline-block;
          width: 150px;
          float: left;
          .add_pic {
            padding: 0 20px;
            color: #aaaaaa;
          }
        }
        .cancel_upload {
          display: inline-block;
          border-left: 1px solid @baseBorderColor;
          width: 55px;
          border-radius: 0;
          float: left;
        }
      }
      .error_btn_box {
        width: 250px;
        height: 38px;
        line-height: 38px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -18px;
        margin-left: -105px;
        border-radius: 5px;
        font-size: 12px;
        .add_pic_box {
          display: inline-block;
          width: 150px;
          float: left;
          color: #ff0000;
          .add_pic {
            padding: 0 20px;
            color: #aaaaaa;
          }
        }
        .cancel_upload {
          display: inline-block;
          border-left: 1px solid @baseBorderColor;
          width: 100px;
          border-radius: 0;
          float: left;
        }
      }
    }
    .info_box {
      width: 100%;
      height: 54px;
      padding: 10px 20px;
      line-height: 28px;
      .info_input {
        width: 50%;
      }
      .info_title {
        font-weight: bold;
      }
      .edit_btn {
        cursor: pointer;
        margin-left: 10px;
        color: #aaaaaa;
      }
      .link_box {
        display: inline-block;
      }
    }
    .button_box {
      position: absolute;
      top: 10px;
      right: 15px;
      color: #aaaaaa;
      .up_move,
      .down_move {
        float: left;
        margin-right: 20px;
        font-size: 12px;
        cursor: pointer;
        line-height: 20px;
        display: none;
        .move_icon {
          font-size: 14px;
        }
      }
      .dell_node {
        cursor: pointer;
        font-size: 16px;
        float: left;
        margin-top: -2px;
        display: inline-block;
      }
    }
  }
  .add_focus_img {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border: dashed 1px @baseBorderColor;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: all 0.4s;
  }
  .add_focus_img:hover {
    background: #ffffff;
  }
  .foucus_pic_node:hover .up_move,
  .foucus_pic_node:hover .down_move {
    display: block;
  }
}
</style>