<template>
  <div class="guide" @click.prevent.stop="guide">
    <svg-icon icon-class="guide" class="guideIcon" />
  </div>
</template>

<script>
import * as Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import { mapState } from "vuex";

let steps = [
  {
    element: ".hamburger-container",
    popover: {
      title: "侧边栏开关",
      description: "打开或关闭侧边栏",
      position: "bottom"
    }
  },
  {
    element: ".breadcrumb-container",
    popover: {
      title: "导航",
      description: "显示当前页面位置",
      position: "bottom"
    }
  },
  {
    element: ".navigation",
    popover: {
      title: "系统导航",
      description: "打开系统导航",
      position: "left"
    }
  },
  {
    element: ".guide",
    popover: {
      title: "引导",
      description: "打开系统引导",
      position: "left"
    }
  },
  {
    element: ".screenfull",
    popover: {
      title: "全屏",
      description: "打开或关闭页面全屏",
      position: "left"
    }
  },

  {
    element: ".theme-switch",
    popover: {
      title: "切换主题",
      description: "改变页面主题颜色",
      position: "left"
    }
  },
  {
    element: ".tags-view-container",
    popover: {
      title: "历史标签",
      description: "访问过的页面历史",
      position: "bottom"
    }
  }
];

export default {
  name: "Guide",
  data() {
    return {
      driver: null
    };
  },
  computed: {
    ...mapState({
      guide_show: state => state.guide_show,
      authGroup: state => state.user.userinfo.authGroup
    })
  },
  mounted() {
    this.driver = new Driver({
      doneBtnText: "完成",
      closeBtnText: "关闭",
      nextBtnText: "下一步",
      prevBtnText: "上一步"
    });
    if (this.guide_show === "2" || !this.guide_show) {
      this.guide();
    }
  },
  methods: {
    guide() {
      if (this.authGroup.length > 1) {
        let obj = {
          element: ".role-change",
          popover: {
            title: "切换角色",
            description: "点击此处，可切换不同角色登录本系统！",
            position: "bottom"
          }
        };
        steps.splice(2, 0, obj);
      }
      this.driver.defineSteps(steps);
      this.driver.start();
      this.$store.commit("setGuide", "1");
    }
  }
};
</script>

<style scoped>
.guide-svg {
  cursor: pointer;
  fill: #5a5e66 !important;
  width: 20px;
  height: 20px;
  vertical-align: 12px;
}
.guideIcon {
  width: 20px !important;
  height: 20px !important;
  fill: #5a5e66 !important;
}
</style>

