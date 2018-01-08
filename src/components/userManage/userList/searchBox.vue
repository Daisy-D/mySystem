<template>
    <div class="searchBox">
        <ul>
            <li class="inputBox">
                <span class="inputTitle">姓名：</span>
                <Input class="inputDiv" v-model="chineseNameInput" placeholder="" @on-enter="searchFunc"></Input>
            </li>
            <li class="inputBox">
                <span class="inputTitle">邮箱：</span>
                <Input class="inputDiv" v-model="emailInput" placeholder="请输入完整邮箱" @on-enter="searchFunc"></Input>
            </li>
            <li class="inputBox">
                <span class="inputTitle">用户组：</span>
                <Select class="inputDiv" v-model="userGroupSel" placeholder="">
                    <Option value="">全部</Option>
                    <Option v-for="item in userGroupArr" :value="item.value" :key="item.value">{{item.label}}</Option>

                </Select>
            </li>
            <li class="inputBox">
                <span class="inputTitle">学号：</span>
                <Input class="inputDiv" v-model="stuNumInput" placeholder="" @on-enter="searchFunc"></Input>
            </li>
            <li class="inputBox">
                <span class="inputTitle">是否黑名单：</span>
                <Select class="inputDiv" v-model="isBlacklist" placeholder="">
                    <Option value="">全部</Option>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                </Select>
            </li>
            <li style="display: inline-block;margin-left: 30px;">
                <Button type="primary" style="width: 70px;height: 30px;font-weight: bold;" @click="searchFunc">搜索</Button>
            </li>
        </ul>
    </div>
</template>

<script>
    import baseUrl from '../../../js/interface';
    export default {
        data(){
            return{
                chineseNameInput:'',
                emailInput:'',
                IDInput:'',
                stuNumInput:'',
                //用户组下拉框部分
                userGroupArr:[],
                userGroupSel:'',//用户组下拉框
                //黑名单下拉框部分
                isBlacklist:'',
            }
        },
        props:{
            rootMsg:Object,
        },
        mounted(){
            this.getUserGroupSelFunc()
        },
        methods:{
            //获取页面
            getUserGroupSelFunc(){
                this.rootMsg.publicAjax('get',baseUrl.userManage.userGroupList,{},callbackDeal)
                var _this = this
                function callbackDeal(json) {
                    var dataArr = json.data.dataList;
                    _this.userGroupArr = dataArr.map(item =>{
                        return{
                            value:item.userGroupId,
                            label:item.userGroupName
                        }
                    })
                }
            },
            //搜素
            searchFunc(){
                var obj = {
                    chineseName:this.chineseNameInput,
                    email:this.emailInput,
                    userGroupId:this.userGroupSel,
                    studentNo:this.stuNumInput,
                    isBlacklist:this.isBlacklist !=='' ? Number(this.isBlacklist) : '',
                }
                this.rootMsg.$emit('searchTable',obj);
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/theme.less";
    .searchBox{
        background: #fff;
        border: 1px solid #e0e1e2;
        /*box-shadow: 0 2px 16px @baseBorderColor, 0 0 1px @baseBorderColor, 0 0 1px @baseBorderColor;*/
        box-shadow: @baseShadow;
        font-size: 14px;
        padding: 30px;
        ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;

        }
    }
    .inputBox{
        /*display: inline-block;*/
        width: 280px;
        display: flex;
        justify-content: flex-end;
        /*margin-right: 30px;*/
        margin-bottom: 10px;
    }
    .inputTitle{
        display: inline-block;
        line-height: 30px;
    }
    .inputDiv{
        display: inline-block;
        width: 185px;
    }
</style>