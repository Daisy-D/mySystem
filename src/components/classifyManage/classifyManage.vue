<template>
<div class="classifyManage">
<h1>分类管理</h1>
    <div class="classifyList" v-for="(item,index) in classifyListData">
        <div @click="delClassify(1,item)" class="delClassify"></div>
    <div class="classifyManageDiv">
        <div class="classifyManageTitle">
            <input  class="classifyInput" @blur="inputBlur(index,item)" v-show="item.show" v-model="item.name"/><span v-show="!item.show" class="modifyTitle">{{item.name}}</span><span class="modifyName" @click="modifyName(index)"></span>
        </div>
    </div>
    <ul class="courseList">
        <li :class="{'borderNone':arr.addShow}" @mouseleave="releaseleave(index,key)"  @mouseenter='releaseenter(index,key)' v-for="(arr,key) in item.subList">{{arr.name}}<span v-show="arr.showX&&!arr.addShow" class="X" @click="delClassify(2,arr)"></span><div @click="addCourse(item.name,item.id)" v-show="arr.addShow" class="addCourse"></div></li>
    </ul>
    </div>
    <div class="classifyList addClassify" @click="addCourse">添加一级分类</div>
    <Modal
            v-model="addModel"
            :mask-closable="false"
            :scrollable="false"
            class-name="teacherModal"
    >
        <p class="title">请输入分类名称</p>
        <input style="height: 32px;width: 447px;text-indent: 5px;" v-model="classifyName"/>
        <div slot="footer">
            <Button type="ghost" @click="cancelAdd" class="modalBtn cancel">取消</Button>
            <Button type="primary" class="modalBtn sure" @click="addClassify">确定</Button>
        </div>
    </Modal>
    <Modal
        v-model="delModel"
        :mask-closable="false"
        :scrollable="false"
        class-name="teacherModal"
>
    <p class="title">提示</p>
    <p style="font-size: 17px;text-align: center;margin-bottom: 20px;color:#686868;">{{textPrompt}}</p>
    <div slot="footer">
        <Button style="width: 182px;" type="primary" class="modalBtn sure" @click="delAjax">确定</Button>
    </div>
</Modal>
    <Modal
            v-model="reviseModel"
            :mask-closable="false"
            :scrollable="false"
            class-name="teacherModal"
    >
        <p class="title">提示</p>
        <p style="font-size: 17px;text-align: center;margin-bottom: 20px;color:#686868;">修改本分类，该分类下所有课程也会对应修改</p>
        <div slot="footer">
            <Button style="width: 182px;" type="primary" class="modalBtn sure" @click="revise">确定</Button>
        </div>
    </Modal>
</div>
</template>

<script>
    import url from '../../js/interface.js';
    export default{
        data () {
            return{
                classifyName:'',
                delData:{},
                textPrompt:'删除本分类，该分类下所有课程将转为“未分类”',
                reviseModel:false,
                delModel:false,
                addModel:false,
                reviseData:'',
                ajaxData:{},
                classifyListData:[
                    {
                        addClassifyShow:true,
                    }
                ],

            }
        },
        activated(){
            this.dataList()
        },
        methods:{
//            分类列表
            dataList(){
                var _this = this;
                window.loadingView.show("courseTypeList");
                window.util.ajax.get(url.classifyManage.courseTypeList).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        for(var i = 0;i<json.data.dataList.length;i++){
                            json.data.dataList[i].show = false;
                            if(json.data.dataList[i].subList.length > 0){
                                for(var o = 0;o<json.data.dataList[i].subList.length;o++){
                                    json.data.dataList[i].subList[o].showX = false;
                                }
                            }
                            json.data.dataList[i].subList.push({addShow:true})
                        }
                        _this.classifyListData = json.data.dataList
                    }).autoRun("login", "error", "courseTypeList");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("courseTypeList");
                });
            },
            revise(){
                this.reviseModel = false
                this.classifyListData[this.reviseData].show = true
            },
//            修改一级名称
            modifyName(data){
                if(this.classifyListData[data].name.length > 15&&this.classifyListData[data].show == true){
                    this.$Message.error('分类名称最多15个字符!');
                    return
                }
                if(this.classifyListData[data].show == false){
                    this.reviseModel = true
                    this.reviseData = data;
                }else{
                    this.classifyListData[data].show = !this.classifyListData[data].show;
                }
                setTimeout(function () {
                        document.getElementsByClassName('classifyInput')[data].focus()
                    },50)
            },
            inputBlur(data,item){
                if(item.name.length > 15){
                    this.$Message.error('分类名称最多15个字符!');
                    return
                }
                this.classifyListData[data].show = !this.classifyListData[data].show;
                var _this = this;
                window.loadingView.show("editCourseType");
                window.util.ajax.get(url.classifyManage.editCourseType,{
                    params: {
                        id:item.id,
                        name:item.name,
                    }
                }).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.addModel = false;
                        _this.classifyName = '';
                    }).autoRun("login", "error", "editCourseType");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("editCourseType");
                });
            },
            releaseenter(o,i){
                this.classifyListData[o].subList[i].showX = true;
            },
            releaseleave(o,i){
                this.classifyListData[o].subList[i].showX = false;

            },
//            增加课程
            addCourse(o,i){
                this.addModel =true;
                this.ajaxData.name = o;
                this.ajaxData.id = i;
            },
            addClassify(){
                var data = {};
                if(this.classifyName == ''){
                    this.$Message.error('分类名称不能为空!');
                    return
                }
                if(this.classifyName.length > 15){
                    this.$Message.error('分类名称最多15个字符!');
                    return
                }
                if(this.ajaxData.id){
                    data = {
                        fatherId: this.ajaxData.id,
                        name: this.classifyName,
                    }
                }else{
                    data = {
                        name: this.classifyName,
                    }
                }
                var _this = this;
                window.loadingView.show("editCourseType");
                window.util.ajax.get(url.classifyManage.editCourseType,{
                    params: data
                }).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.addModel = false;
                        _this.classifyName = '';
                        _this.dataList()
                    }).autoRun("login", "error", "editCourseType");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("editCourseType");
                });
            },
//            取消增加
            cancelAdd(){
                this.addModel = false;
                this.classifyName = '';
            },
//            删除分类
            delClassify(level,data){
                level == 1?this.textPrompt='删除本分类，该分类下所有课程将转为“未分类”':this.textPrompt='删除后无法恢复，确认是否删除？';
                this.delModel = true;
                this.delData = data
            },
            delAjax(){
                var _this = this;
                window.loadingView.show("deleteCourseType");
                window.util.ajax.get(url.classifyManage.deleteCourseType,{
                    params: {
                        id:this.delData.id
                    }
                }).then(function (res) {
                    window.util.checkAjaxJson(res).thenSuccess(function (json) {
                        _this.delModel = false;
                        _this.dataList()
                    }).autoRun("login", "error", "deleteCourseType");
                }).catch(function (error) {
                    window.util.checkAjaxError(error).autoRun("deleteCourseType");
                });
            },
        },
        components:{},
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
      }
</script>
<style lang="less">
    @import "../../styles/theme.less";

    @borderColor: #e5e5e5;
    .addAlert .ivu-modal-header{
        border: 0 !important;
    }
</style>

<style lang="less" scoped>
    @import "../../styles/theme.less";

    @borderColor: #e5e5e5;
.addClassify{
    /*border: 2px dashed #e5e5e5 !important;*/
    /*font-size: 14px;*/
    /*color: #222;*/
    /*padding: 10px 0;*/
    /*text-align: center;*/
    /*cursor: pointer;*/

    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border:dashed 1px @baseBorderColor  !important;
    width:100%;
    text-align:center;
    cursor:pointer;
    transition:all 0.4s;
    box-shadow: none !important;
}
    .addClassify:hover{
        background:#ffffff !important;
    }
.classifyManage{
    /*padding: 30px;*/
}
h1{
    font-size: 22px;
    font-weight: normal;
}
.classifyList{
    background: #fff;
    border: 1px solid #e5e5e5;
    margin-top: 20px;
    width: 100%;
    border-radius: 5px;
    padding-right: 20px;
    padding-left: 20px;
    position: relative;
    box-shadow:@baseShadow;
}
    .classifyList:nth-last-child(1){
        background: 0;
    }
.classifyManageTitle{
    overflow: hidden;
    margin-top: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
}
    .classifyManageTitle input{
        border:1px;
        font-size: 17px;
        height: 20px;
        border: 0;
        float: left;
        width: 260px;
        outline: none;
        border-bottom: 1px solid #e5e5e5;
    }
.classifyManageTitle .modifyName{
    display: inline-block;
    height: 16px;
    width: 16px;
    float: left;
    background: url("../../images/classifyManage/pen.png")100% no-repeat;
    margin-left: 10px;
    cursor: pointer;
}
    .modifyTitle{
        float: left;
        font-size: 17px;
        line-height: 20px;
    }
.courseList{
    overflow: hidden;
    margin-top: 28px;
    margin-bottom: 28px;
}
    .courseList li{
        float: left;
        display: inline-block;
        font-size: 12px;
        padding: 8px 9px;
        border: 1px solid #e5e5e5;
        border-radius: 50px;
        margin-right: 10px;
        cursor: pointer;
    }
    .X{
        display: inline-block;
        height: 14px;
        width: 14px;
        background: url("../../images/classifyManage/X.png") no-repeat 100%;
        position: relative;
        top: 2px;
        margin-left: 7px;
    }
    .addCourse{
        display: inline-block;
        height: 16px;
        width: 16px;
        background: url("../../images/classifyManage/add.png") no-repeat 100%;
    }
    .borderNone{
        border: 0 !important;
        margin-top: 3px;
    }
    .delClassify{
        display: inline-block;
        height: 16px;
        width: 16px;
        background: url("../../images/classifyManage/fork.png") no-repeat 100%;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }

/*--------弹窗-----------*/
.teacherModal {
.modalBtn {
    width: 118px;
    height: 38px;
    line-height: 1;
}
.sure {
    margin-left: 18px;
    color: @ButtonFontColor;
    background-color: @ButtonBgColor;
    border: 1px solid @ButtonBorderColor;
&:hover {
     background-color: lighten(@ButtonBgColor, 10%);
 }
}
.title {
    font-size: 17px;
    height: 36px;
    text-align: center;
    color: @TitleFontColor;
    line-height: 1;
}
}

</style>
