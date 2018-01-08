<template>
    <div class="batchImport_view">
        <div class="nav">
            <Breadcrumb separator=">" style="display: inline-block;">
                <Breadcrumb-item href="" style="font-size: 22px;">批量导入</Breadcrumb-item>
            </Breadcrumb>
            <router-link to="/contentFilter" v-if="filterMsg">
                <Button type="primary" style="width: 85px;">返回</Button>
            </router-link>
        </div>
        <div style="margin: 20px 0px;">
            <head-box :root-msg="eventHub" :filter-msg="filterMsg"></head-box>
        </div>
        <div style="margin: 20px 0px;">
            <import-table :root-msg="eventHub"  :filter-msg="filterMsg"></import-table>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import headBox from './batchimport/head.vue';
    import importTable from './batchimport/importTable.vue';
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
        props: {
            filterMsg: Boolean,
        },
        mounted(){
        },
        methods:{

        },
        components:{
            'head-box':headBox,
            'import-table':importTable,
        },
    }
</script>
<style scoped lang="less">
    .nav{
        display: flex;
        justify-content: space-between;
    }
</style>