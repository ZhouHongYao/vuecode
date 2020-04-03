<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <error-log class="errLog-container right-menu-item" />

      <el-tooltip effect="dark" content="切换角色" placement="bottom">
        <keep-alive>
          <RoleChange class="international right-menu-item">切换角色</RoleChange>
        </keep-alive>
      </el-tooltip>

      <el-tooltip v-if="is_pc" effect="dark" content="引导" placement="bottom" class="hidden-md-and-down">
        <Guide class="guide pointer right-menu-item" />
      </el-tooltip>

      <el-tooltip content="全屏" effect="dark" placement="bottom">
        <screenfull class="screenfull right-menu-item" />
      </el-tooltip>

      <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
        <size-select class="international right-menu-item" />
      </el-tooltip> -->

      <el-tooltip content="换肤" effect="dark" placement="bottom">
        <theme-picker class="theme-switch right-menu-item" />
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <img :src="head" :onerror="sex==2?defaultImg2:defaultImg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">
            <i class="el-icon-edit" /> 修改头像
          </el-dropdown-item>
          <el-dropdown-item v-if="group==1" command="2">
            <i class="el-icon-edit" /> 修改密码
          </el-dropdown-item>
          <el-dropdown-item divided command="3">
            <svg-icon icon-class="out" /> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改头像 -->
    <ImgUpload :dialog-visible="dialogVisible" @CB-ImgDialog="CB_ImgDialog" />
    <!-- 修改密码 -->
    <Password :password-dialog="passwordDialog" @CB-passwordDialog="CB_passwordDialog" />
  </el-menu>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
import ThemePicker from "@/components/ThemePicker";
import RoleChange from "./roleChange";
import Password from "./password";
import ImgUpload from "./gaiInfoImg";
import Guide from "./guide";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    RoleChange,
    Password,
    ImgUpload,
    Guide
  },
  data() {
    return {
      is_pc: false,
      dialogVisible: false,
      passwordDialog: false,
      defaultImg: 'this.src="' + require("@/assets/images/photos/1.png") + '"',
      defaultImg2: 'this.src="' + require("@/assets/images/photos/6.png") + '"'
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "head", "account", "group"]),
    ...mapState({
      sex: state => state.user.userinfo.sex
    })
  },
  activated() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      this.is_pc = false;
    } else {
      this.is_pc = true;
    }
  },
  methods: {
    //下拉选中
    handleCommand(val) {
      if (val == 1) {
        this.dialogVisible = true;
      } else if (val == 2) {
        this.passwordDialog = true;
      } else if (val == 3) {
        this.logout();
      }
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    //修改头像回调
    CB_ImgDialog() {
      this.dialogVisible = false;
    },
    //修改密码回调
    CB_passwordDialog() {
      this.passwordDialog = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .guide {
      vertical-align: 12px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
