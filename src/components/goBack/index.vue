<template>
  <el-button waves type="danger" icon="el-icon-d-arrow-left" @click="goBack">返回上一页</el-button>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
export default {
  directives: {
    waves
  },
  props: ["btn"],
  methods: {
    goBack() {
      let visitedViews = this.$store.state.tagsView.visitedViews;
      this.$store
        .dispatch(
          "delVisitedView",
          visitedViews.find(item => {
            return item.name === this.$route.name;
          })
        )
        .then(() => {
          this.$router.go(-1);
        });
    }
  }
};
</script>
