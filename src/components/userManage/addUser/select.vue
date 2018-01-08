<template>
    <div class="select_view" ref="thisSelect" @mouseout.stop="">
        <div class="select_input" @click.stop="toggleInputFunc">
            <span>{{inputLabel}}</span>
            <i :class="dropDownShow?'input_iconUp':'input_iconDown'"></i>
        </div>
        <div class="dropDown" v-show="dropDownShow" ref="dropDownDom">
            <ul>
                <li :class="{dropDown_item:item.value!=inputValue,active:item.value==inputValue}" v-for="(item,index) in dataArr" :value="item.value" @click="selectIndexFunc(item)">{{item.label}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'selectDrop',
        data() {
            return {
                inputLabel:'',
                inputValue:'',
                dataArr:[],
                dropDownShow:false,
                isShow:false
            }
        },
        props:{
            rootMsg:Object,
            value: { // 必须要使用value
                default: '',
            },
            type:Number,
        },
        watch:{
            value:{
                handler(newVal,oldVal){
                    if(!newVal){
                        this.inputLabel = '';
                        this.inputValue = '';
                    }
                }
            }
        },
        created(){
        },
        destroyed(){
            document.removeEventListener("click",this.documentClickFunc);
        },
        mounted(){
            if(this.type === 1){
                this.rootMsg.$on('schoolList', (a) => {
                    this.dataArr = a;
                });
            }else if(this.type === 2){
                this.rootMsg.$on('majorList', (a) => {
                    this.dataArr = a;
                });
            }else if(this.type === 3){
                this.rootMsg.$on('gradeList', (a) => {
                    this.dataArr = a;
                });
            }else if(this.type === 4){
                this.rootMsg.$on('jobTitleList', (a) => {
                    this.dataArr = a;
                });
            }
        },
        computed:{
        },
        methods:{
            blur () {
                this.isFocus = false;
                this.documentClickFunc()
            },
            toggleInputFunc(){
                //广播事件
                document.removeEventListener("click",this.documentClickFunc);
                var event = document.createEvent("HTMLEvents");
                event.initEvent("click", true, true);
                document.dispatchEvent(event);
                document.addEventListener("click",this.documentClickFunc);
                if(this.isShow == true){
                    this.dropDownShow = false;
                    this.isShow=false;
                }else{
                    this.dropDownShow = true;
                    this.isShow=true;
                }
            },
            selectIndexFunc(item){
                this.inputLabel = item.label;
                this.inputValue = item.value;
                this.$emit('input',this.inputValue)
            },
            documentClickFunc(event){
                document.removeEventListener("click",this.documentClickFunc);
                this.dropDownShow =false;
                this.isShow=false;
            }
        },
    }
</script>

<style scoped lang="less">
    @import "../../../styles/theme.less";
    .select_view{
        width: 100%;
        font-size: 12px !important;
        position: relative;
        user-select:none;
    }
    .dropDown{
        height: 200px;
        width: 100%;
        overflow: auto;
        border: 1px solid @baseBorderColor;
        box-shadow: @baseShadow;
        z-index: 999;
        position:absolute;
        background: #fff;
        /*-webkit-transition:all 2s ease;*/
        /*-moz-transition:all 2s ease;*/
        /*-ms-transition:all 2s ease;*/
        /*-o-transition:all 2s ease;*/
        /*transition:all 2s ease;*/

        .dropDown_item{
            margin: 0;
            line-height: normal;
            padding: 7px 16px;
            clear: both;
            color:  @baseFontColor;;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            transition: background 0.2s ease-in-out;
        }
        .dropDown_item:hover{
            background-color: #f4f4f4;
            color: @baseFontColor;
        }
        .active{
            background: @baseThemeColor;
            color: #fff;

            margin: 0;
            line-height: normal;
            padding: 7px 16px;
            clear: both;
            white-space: nowrap;
            list-style: none;
            cursor: pointer;
            transition: background 0.2s ease-in-out;
        }
    }
    .select_input{
        height: 32px;
        border: 1px solid @baseBorderColor;
        border-radius: 5px;
        padding: 0px 16px;
        line-height: 32px;
        position: relative;
        cursor: pointer;

    }
    .select_input:hover{
        border: 1px solid @baseThemeColor;
    }
    .input_iconDown{
        position: absolute;
        top: 50%;
        right: 8px;
        line-height: 1;
        margin-top: -7px;
        font-size: 14px;
        color: #80848f;
        transition: all 0.2s ease-in-out;
    }
    .input_iconUp{
        position: absolute;
        top: 50%;
        right: 8px;
        line-height: 1;
        margin-top: -7px;
        font-size: 14px;
        color: #80848f;
        transition: all 0.2s ease-in-out;
    }
    .input_iconDown:after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #555555;
        content: "";
        position: relative;
        top: 10px;
        width: 0;
    }
    .input_iconUp:after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #555555;
        content: "";
        position: relative;
        top: -12px;
        width: 0;
    }
</style>