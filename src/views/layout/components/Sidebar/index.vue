<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item v-for="route in routers" :key="route.name" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["sidebar"]),
    ...mapState({
      routers: state => state.routers
    }),
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
