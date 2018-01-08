<template>
    <div class="headBox upload_view_cm">
        <div class="headTitle">导入必读</div>
        <div class="headContent">
            <p>1.请下载导入模板</p>
            <p>2.请务必保证导入的模板信息完整一致</p>
            <p>3.保存为后缀为 “.xlsx” 文件，请使用Excel文件保存</p>
        </div>
        <div class="importBox">
            <div class="importBefore">
                <Upload
                        v-if="upVueAgainSta"
                        :action="upLink"
                        style="display: inline-block;"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        :format="['xlsx']"
                        :on-format-error="handleFormatError"
                        :before-upload="checkFileFunc"
                        :on-progress="uploadFunc"
                        :on-success="successFunc"
                        :on-error = "errorFunc"
                >
                    <Button type="primary" v-show="upSta" style="width: 150px;margin-right: 10px;" @click="">选择导入文件</Button>
                    <p class="loadingTip" v-show="upLoadingSta"><Icon type="load-a" class="iconLoading"></Icon>文件已上传完毕，正在写入数据库，数据量越多所花费时间越长，您可以3~5分钟后打开此页面查看导入结果 !</p>
                </Upload>
                <a class="importLink" :href="upTemplateLink" v-show="upSta">下载导入模板</a>
            </div>
        </div>
        <Modal
                v-model="finishUpModal"
                title=""
                :mask-closable="false"
                @on-ok=""
                @on-cancel="okUpFunc">
            <div class="content">
                <h2 style="margin-bottom: 20px;">提示</h2>
                <p v-if="!filterMsg" style="font-size: 14px;">成功导入{{successNum}}人，导入失败{{failedNum}}人</p>
                <p v-if="filterMsg" style="font-size: 14px;">成功导入{{successNum}}条，导入失败{{failedNum}}条</p>
            </div>
            <div slot="footer" style="text-align: center;">
                <!--<Button class="modalBtnSize" type="ghost" @click="editUserModal=false" style="width: 120px;">取消</Button>-->
                <Button class="modalBtnSize" type="primary" @click="okUpFunc" style="width: 120px;">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import baseUrl from '../../../js/interface';
    export default {
        data(){
            return{
                upVueAgainSta:true,
                upLink:'',//导入地址
                upTemplateLink:'',//导入模板地址
                upSta:true,//按钮显示状态值
                upLoadingSta:false,//上传状态值
                //完成弹窗
                finishUpModal:false,//结束弹窗参数
                successNum:'',
                failedNum:'',
            }
        },
        props: {
            rootMsg: Object,
            filterMsg:Boolean,
        },
        mounted() {
            if(this.filterMsg){
                this.upTemplateLink = baseUrl.bbsManage.importTemplateLink
                this.upLink = baseUrl.bbsManage.importFilterBatch;
            }else {
                this.upTemplateLink = baseUrl.userManage.importTemplateLink;
                this.upLink = baseUrl.userManage.importUserList;
            }
        },
        methods:{
            //上传时
            uploadFunc(event, file, fileList){
                this.upSta = false;
                if(event.percent===100){
                    this.upLoadingSta = true
                }
            },
            //完成时
            successFunc(response, file, fileList){
                if (response.status == "success") {
                    this.upLoadingSta = false;
                    this.finishUpModal = true;
                    this.successNum = response.data.success;
                    this.failedNum = response.data.fail;
                }
            },
            //失败时
            errorFunc(error, file, fileList){
                this.$Message.error({
                    content: `文件内容或格式错误，上传失败`,
                    duration: 2
                })
                this.upLoadingSta = false;
                this.okUpFunc();
            },
            //校验上传
            checkFileFunc(file){
                var upArr = file.name.split('.')
                var upFormat = upArr[upArr.length-1];
                var reg = /xlsx/;
//                console.log(reg.test(upFormat));
//                return false

            },
            okUpFunc(){
                this.finishUpModal = false;
                this.upVueAgainSta = false;
                this.upSta = true;
                setTimeout(()=>{
                    this.upVueAgainSta = true
                },10)
                this.rootMsg.$emit('upOver',true);
            },
            //选错文件
            handleFormatError(file){
//                this.$Message.error(`${file.name}文件格式错误`)
                this.$Message.error({
                    content: `文件 ${file.name} 格式错误`,
                    duration: 2
                })
            },
            clearUpListFunc(){

            }
        }
    }
</script>
<style lang="less">
    .upload_view_cm{
        .ivu-progress-outer{
            width: 300px;
        }
        .ivu-progress-bg{
            background-color: #36d64c;
            height: 18px !important;
        }
        .ivu-upload-list{
            margin-top: -8px;
        }
    }
</style>
<style scoped lang="less">
    @import "../../../styles/theme.less";
    .headBox{
        /*height: 220px;*/
        background: #fff;
        border: 1px solid @baseBorderColor;
        box-shadow: @baseShadow;
        padding: 30px;
    }
    .headTitle{
        font-size: 17px;
        /*font-weight: bold;*/
    }
    .headContent{
        margin-top: 15px;
        margin-bottom: 15px;
        /*line-height: 24px;*/
    }
    .importBefore{
        font-size: 12px;
        .importLink{
            color: #66b8fd;
            cursor: pointer;
            vertical-align: middle;
        }
        .importLink:hover{
            color: darken(#66b8fd, 15%);
        }
    }
    .loadingTip{
        font-size: 14px;
        color: #e63d3d;
    }
    .iconLoading{
        font-size: 28px;
        color: #ccc;
        vertical-align: middle;
        margin-right: 10px;
        animation:mymove 1s infinite linear;
    }
    @keyframes mymove
    {
        25% {transform:rotate(90deg);}
        50% {transform:rotate(180deg);}
        75% {transform:rotate(270deg);}
        100% {transform:rotate(360deg);}
    }
    .content{
        text-align: center;
    }
</style>