<template>
  <el-date-picker :unlink-panels="true" v-model="value.times" :picker-options="pickerOptions" :start-placeholder="startTitle" :end-placeholder="endTitle" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" align="right" style="width: 320px;"/>
</template>
<script>
export default {
  props: ["value", "title"],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      startTitle: (this.title ? this.title : "") + "开始时间",
      endTitle: (this.title ? this.title : "") + "结束时间"
    };
  }
};
</script>

