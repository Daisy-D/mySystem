<template>
    <div class="userList_view">
        <div class="nav">
            <Breadcrumb separator=">" style="display: inline-block;">
                <Breadcrumb-item href="" style="font-size: 22px;">内容过滤</Breadcrumb-item>
            </Breadcrumb>
            <!--<Button type="primary" @click="" style="width: 107px;">批量导入</Button>-->
            <router-link to="/batchImportFilter">
                <Button type="primary" @click="" style="width: 107px;">批量导入</Button>
            </router-link>
        </div>
        <div style="margin: 20px 0px;">
            <table-box :root-msg="eventHub"></table-box>
        </div>
        <div>
            <!--<table-list :root-msg="eventHub"></table-list>-->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import tableBox from './contentFilter/tableBox.vue';
//    import table from './userList/tableBox.vue';
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
            'table-box':tableBox,
//            'table-list':table,
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }        
    }
</script>
<style scoped lang="less">
    .nav{
        display: flex;
        justify-content: space-between;
    }
</style>