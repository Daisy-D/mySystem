<template>
  <div class="wrap_box">
    <div class="loading_box" v-show="$store.state.isLoadingShow"><img src="./images/loading.gif"/></div>
    <div class="app_header">
      <img class="top_nav_logo" :src="$store.state.serverInfo.logo" @click="gotoIndex">
      <div class="button_box" v-show="!isLogin">
          <Button type="text" @click="loginFun(1)">登录</Button>
          <Button type="text" @click="loginFun(2)">注册</Button>
      </div>
      <div class="button_box" v-show="isLogin">
        <img :src="headPortrait" class="head_portrait_box"/>
        <span class="user_name_box">{{userName}}</span>
        <Icon type="arrow-up-b" class="arrow_up_box"></Icon>
        <div class="top_nav_list" v-show="$store.state.userInfo.userType=='manager'">
          <Icon type="arrow-up-b" class="top_nav_arrow_up"></Icon>
          <div class="top_nav_node" @click="toCourseAdminPageFun"><img src="./images/teach_center.png"/>授课中心</div>
          <div class="top_nav_node" @click="toStudentCenterFun"><img src="./images/study_center.png"/>学习中心</div>
          <div class="top_nav_node" @click="applyTeacherFun"><img src="./images/setting_center.png"/>个人设置</div>
          <div class="top_nav_node quit_node" @click="loginOutFun"><img src="./images/quit_icon.png"/>退出</div>
        </div>
        <div class="top_nav_list sysmanager" v-show="$store.state.userInfo.userType=='sysmanager'">
          <Icon type="arrow-up-b" class="top_nav_arrow_up"></Icon>
          <div class="top_nav_node" @click="loginOutFun"><img src="./images/quit_icon.png"/>退出</div>
        </div>
      </div>
    </div>
    <div class="app_content">
      <div class="layout">
          <div class="layout-menu-left menu_box">
              <Menu :active-name='activeName' theme="dark" width="auto" :open-names='openName' :accordion='true' @on-select="setMenuInfoFun">
                  <div class="layout-logo-left"></div>
                  <Submenu v-for="item in menuList" :key="item.submenuName" :name="item.submenuName">
                      <template :slot="item.slot"><Icon :type="item.iconType"></Icon>{{item.templateName}}</template>
                      <router-link v-for="routerItem in item.routerList" :key="routerItem.menuItem" :to="routerItem.routerLink">
                        <MenuItem :name="routerItem.menuItem">{{routerItem.menuName}}</MenuItem>
                      </router-link>
                  </Submenu>
              </Menu>
          </div>
          <div class="content_box">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
          </div>
          <div class="clear_float"></div>          
      </div>  
    </div>
  </div>

</template>
<script>
import nozzle from "./js/interface.js";
import store from "./store/store.js";
import menuList from "./json/menuList.json";
getMenuInfoFun();
const openNameFromSession = sessionStorage.getItem("openName") || '1';
const activeNameFromSession = sessionStorage.getItem("activeName") || '1-1';
function getMenuInfoFun(){
  const locationLink = window.location.href;
  const indexOfNum=locationLink.indexOf("#");
  const routerLink=locationLink.slice(indexOfNum+1);
  menuList.forEach((submenuItem,submenuIndex)=>{
    submenuItem.routerList.forEach((menuItem,menuIndex)=>{
      if(menuItem.routerLink==routerLink){
        const menuItemNum=menuItem.menuItem;
        const menuIndexOfNum=menuItemNum.indexOf("-");
        sessionStorage.setItem("openName", menuItemNum.slice(0,menuIndexOfNum));
        sessionStorage.setItem("activeName", menuItemNum);
      }else{
        sessionStorage.setItem("openName", '1');
        sessionStorage.setItem("activeName", '1-1');
      }
    })
  })
}

export default {
  store,
  data: function() {
    return {
      openName: [openNameFromSession],
      activeName: activeNameFromSession,
      isLogin:false,
      headPortrait:'',
      userName:'',
      menuList:menuList
    };
  },
  methods: {
    setLinkFun(){
      var head = document.getElementsByTagName('head')[0],
          linkTag = document.createElement('link');
      linkTag.href = this.$store.state.serverInfo.favicon;
      linkTag.setAttribute('rel','Shortcut Icon');
      head.appendChild(linkTag);
    },
    setMenuInfoFun(_name) {
      sessionStorage.setItem("openName", this.openName);
      sessionStorage.setItem("activeName", _name);
    },
    gotoIndex(){
      window.location.href =this.$store.state.serverInfo.platformUrl;
    },
    hasLoginFun() {
      this.$store.state.userInfo = websiteInfo.data.userInfo;
      this.$store.state.serverInfo = websiteInfo.data.serverInfo;
      if(this.$store.state.userInfo.loginStatus==0){//未登录
        this.isLogin = false;
        this.loginFun(1);
      }else{
        this.isLogin = true;
        const userheadImg = this.$store.state.userInfo.userheadImg;
        this.headPortrait = userheadImg.size64?userheadImg.size64:(userheadImg.size128?userheadImg.size128:userheadImg.size256);
        this.userName = this.$store.state.userInfo.chinaName?this.$store.state.userInfo.chinaName:'未知';
      }
    },
    loginOutFun(){
      window.location.href =this.$store.state.serverInfo.platformUrl+"user/loginOut";
    },
    loginFun(_type) {
      window.location.href =this.$store.state.serverInfo.platformUrl+"pages/login.jsp?act=" +_type ;
    },
    toCourseAdminPageFun(){
      window.location.href =this.$store.state.serverInfo.platformUrl+"pages/teaching/courseManager.jsp";
    },
    toStudentCenterFun(){
      window.location.href =this.$store.state.serverInfo.platformUrl+"pages/studentcenter/registrationCourse.jsp";
    },
    applyTeacherFun(){
      window.location.href =this.$store.state.serverInfo.platformUrl+"pages/user/teacherSetting.jsp";
    }
  },
  mounted() {
    this.hasLoginFun();
    this.setLinkFun();
  }
};
</script>
<style scoped lang='less'>
@import "./styles/theme.less";
.wrap_box {
  width: 100%;
  height: 100%;
  font-size: 14px;
  min-width: 1000px;
  overflow: auto;
  position:relative;
  .loading_box{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:99999;
    background-color:rgba(0,0,0,0.1);
    img{
      position:absolute;
      top:35%;
      left:50%;
    }
  }
  .app_header {
    width: 100%;
    height: 54px;
    line-height: 54px;
    border-bottom: solid 1px @baseBorderColor;
    padding: 10px 30px 10px 20px;
    box-sizing: border-box;
    position: relative;
    .top_nav_logo {
      height: 34px;
      position: absolute;
      top: 10px;
      left: 20px;
      cursor: pointer;
    }
    .button_box {
      position: absolute;
      top: 0px;
      right: 30px;
      height:100%;
      .head_portrait_box{
        display:inline-block;
        width:35px;
        height:35px;
        border-radius:50%;
        overflow:hidden;
        margin-top:10px;
        float:left;
      }
      .user_name_box{
        display:inline-block;
        margin:0 10px;
        float:left;
      }
      .arrow_up_box{
        display:inline-block;
        cursor:pointer;
        transition:all 0.2s;
      }
      .top_nav_list{
        transition:all 0.2s;
        height:0;
        overflow:hidden;
        opacity:0;
        width:128px;
        border-radius:5px;
        background:#1d1e21;
        color:#dddddd;
        font-size:12px;
        z-index:999;
        position:absolute;
        top:54px;
        right:0;
        padding:5px 0;
        a{
          color: #dddddd;
        }
        .top_nav_arrow_up{
          font-size:22px;
          color:#1d1e21;
          position:absolute;
          top:-14px;
          left:50%;
          margin-left:-8px;
        }
        .top_nav_node{
          height:30px;
          line-height:30px;
          padding:0 10px 0 45px;
          position:relative;
          cursor:pointer;
          img{
            position:absolute;
            left:20px;
            top:8px;
            width:16px;
          }
        }
        .quit_node{
          border-top:solid 1px #373737;
        }
        .top_nav_node:hover{
          background:#4e4e4e;
        }
      }
    }
    .button_box:hover .arrow_up_box{
      transform: rotate(180deg);
    }
    .button_box:hover .top_nav_list{
      height:130px;
      opacity:1;
      overflow:visible;
    }
    .button_box:hover .top_nav_list.sysmanager{
      height:40px;
      opacity:1;
      overflow:visible;
    }
  }
  .app_content {
    height: calc(~"100% - "54px);
    .layout {
      border-bottom: 1px solid #d7dde4;
      background: #f7f7f7 url(./images/navbg.png) repeat-y;
      position: relative;
      min-height: 100%;
    }
    .layout-menu-left {
      background: #ffffff;
    }
    .menu_box {
      float: left;
      width: 200px;
      height: 100%;
      background: #6c6f74;
    }
    .content_box {
      float: right;
      width: calc(~"100% - "200px);
      padding:30px;
    }
  } 
  .clear_float {
    clear: both;
  }
}
</style>