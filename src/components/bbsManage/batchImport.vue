<template>
    <div>
        <batch-import :filter-msg="true"></batch-import>
    </div>
</template>

<script>
    import batchImport from '../userManage/batchImport.vue';
    export  default {
        data(){
            return{

            }
        },
        components:{
            'batch-import':batchImport,
        },
    }
</script>

<style lang="less">
</style>