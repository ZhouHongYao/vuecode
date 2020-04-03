<template>
  <li v-if="authGroup&&authGroup.length>0">
    <a>
      <span class="span_label">角色：</span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ title }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in authGroup" :key="index" :command="item.group">以 {{ item.title }} 登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </a>
  </li>
</template>
<script>
import { mapState } from "vuex";
import { userChange } from "@/api/system/user.js";
export default {
  data() {
    return {
      title: "",
      authGroup: []
    };
  },
  computed: mapState({
    userinfo: state => state.user.userinfo
  }),
  activated() {
    this.title = this.userinfo.group_title;
    this.authGroup = this.userinfo.authGroup;
    this.authGroup.splice(
      this.authGroup.findIndex(v => v.title == this.title),
      1
    );
    //获取当前用户信息
    userChange(this.userinfo.group)
      .then(rs => {
        this.$store.dispatch("setUserinfo", rs);
      })
      .catch(() => {});
  },

  methods: {
    //角色切换
    handleCommand(val) {
      userChange(val)
        .then(rs => {
          this.$store.dispatch("setUserinfo", rs);
          this.$router.push({ path: "/" });
          this.$store.dispatch("setRoles", []);
          this.$store.dispatch("setAddRouters", []).then(() => {
            window.location.reload();
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.span_label {
  color: #606266;
  font-size: 15px;
}
</style>

