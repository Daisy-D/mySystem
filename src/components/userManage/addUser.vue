<template>
    <div class="addUser_view">
        <div class="nav">
            <Breadcrumb separator=">">
                <Breadcrumb-item href="" style="font-size: 22px;">添加用户</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div style="margin: 20px 0px;">
            <Tabs type="card">
            <TabPane label="添加学生">
                <add-stu :root-msg="eventHub"></add-stu>
            </TabPane>
            <TabPane label="添加教师">
                <add-tea :root-msg="eventHub"></add-tea>
            </TabPane>
            <TabPane label="添加管理员">
                <add-admin :root-msg="eventHub"></add-admin>
            </TabPane>
            </Tabs>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue';
    import addStu from './addUser/addStu.vue';
    import addTea from './addUser/addTea.vue';
    import addAdmin from './addUser/addAdmin.vue';
    export default {
        data(){
            return {
                eventHub: new Vue({
                    //父组件实例挂载公用publicAjax方法，其他组件进行调用
                    methods:{
                        publicAjax(way,url,params,callback){
                            window.loadingView.show(url);
                            window.util.ajax[way](url,params).then((res) => {
                                var ajaxInterface = window.util.checkAjaxJson(res);
                                ajaxInterface.thenSuccess((json) => {
                                    callback(json)
                                }).autoRun('error','login',url);
                            }).catch((error)=> {
                                window.util.checkAjaxError(error,"").autoRun(url);
                            })
                        },
                    }

                }),
            }
        },
        create(){

        },
        mounted(){
        },
        methods:{

        },
        components:{
            'add-stu':addStu,
            'add-tea':addTea,
            'add-admin':addAdmin,
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>
<style lang="less">
    @import "../../styles/theme.less";
    .addUser_view{
        .ivu-tabs-bar{
            margin-bottom: 0px;
        }
        .ivu-btn.ivu-btn-primary{
            background:@baseThemeColor;
            border:solid 1px @baseThemeColor;
        }
        .ivu-btn.ivu-btn-primary:hover{
            background:shade(@baseThemeColor, 5%);
            border:solid 1px shade(@baseThemeColor, 5%);
        }

    }
</style>
<style scoped lang="less">
</style>