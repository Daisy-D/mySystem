<template>
    <div class="userList_view">
        <div class="nav">
            <Breadcrumb separator=">">
                <Breadcrumb-item href="" style="font-size: 22px;">用户列表</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div style="margin: 20px 0px;">
            <search-box :root-msg="eventHub"></search-box>
        </div>
        <div>
            <table-list :root-msg="eventHub"></table-list>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import searchBox from './userList/searchBox.vue';
    import table from './userList/tableBox.vue';
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
            'search-box':searchBox,
            'table-list':table,
        },
        beforeRouteLeave (to, from, next) {
            this.$destroy();
            next()
        }
    }
</script>

<style scoped lang="less">
</style>