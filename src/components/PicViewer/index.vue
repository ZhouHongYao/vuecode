<template>
  <div>
    <viewer ref="viewer" :images="imgArr" class="viewer" @inited="inited">
      <template slot-scope="scope">
        <img v-for="src in scope.images" v-show="false" :src="src" :key="src"> {{ scope.options }}
        <a class="blue" @click="show">
        <i class="el-icon-view" /> 查看</a>
      </template>
    </viewer>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component.vue";

export default {
  components: {
    Viewer
  },
  props: ["imgArr", "title"],
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    }
  }
};
</script>
<style scoped>
.blue {
  color: #409eff !important;
}
</style>

