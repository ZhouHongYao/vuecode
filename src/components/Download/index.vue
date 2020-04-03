<template>
  <span>
    <el-button v-waves class="filter-item margin-right-10" type="primary" icon="el-icon-download" @click="downloadDialog=true">导出</el-button>
    <el-row :gutter="8">
      <viewer :images="images">
        <img v-for="src in images" :src="src" :key="src" style="width:200px;height:150px">
      </viewer>
    </el-row>
  </span>
</template>
<script>
// import { read } from "@/api/index";
import waves from "@/directive/waves"; // 水波纹指令
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";

Vue.use(Viewer);

export default {
  directives: { waves },
  props: ["model"],
  data() {
    return {
      images: [
        "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
        "http://img.zcool.cn/community/01f09e577b85450000012e7e182cf0.jpg@1280w_1l_2o_100sh.jpg"
      ]
    };
  },
  methods: {}
};
</script>
<style>
.bton {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
  outline: 0 !important;
  font-family: inherit;
  text-transform: none;
}
.box {
  min-height: 150px;
}
</style>

