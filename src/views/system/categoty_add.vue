<template>
  <el-dialog :title="title" :visible="dialogStatus" width="580px" top="30vh" close-on-press-escape @close="closedialog" @open="openDialog">
    <el-form v-loading="loading" :model="form" label-width="120px" element-loading-text="数据载入中" @keyup.enter.native="handleBao('form')" @submit.native.prevent>
      <el-form-item v-if="form.path.length>0" label="上级类别名称">
        <el-cascader :options="options" v-model="form.path" :props="props" :show-all-levels="false" change-on-select style="width:100%" size="medium"/>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input v-model="form.title" placeholder="请填写节点名称" size="medium"/>
      </el-form-item>
    </el-form>
    <div v-if="!loading" slot="footer" class="dialog-footer">
      <el-button :loading="vloading" type="primary" icon="fa fa-floppy-o" @click="handleBao('form')"> 确认保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { cated, cated_read, cateList } from "@/api/system/category";
export default {
  props: ["dialogStatus", "caId", "path"],
  data() {
    return {
      form: {
        path: [],
        title: ""
      },
      options: [],
      loading: false,
      vloading: false,
      props: {
        value: "id",
        label: "title",
        children: "children"
      },
      id: "",
      title: "添加节点"
    };
  },
  methods: {
    openDialog() {
      if (this.path && this.path.length > 0) {
        this.title = "添加节点";
        this.form.path = this.path;
      } else {
        if (this.caId) {
          this.title = "编辑节点";
          this.getRead();
        }
      }
      this.getSelect();
    },
    //提交
    handleBao(form) {
      this.vloading = true;
      let api_type = "";
      if (this.caId) {
        this.form.id = this.caId;
        api_type = "put";
      } else {
        api_type = "post";
      }
      cated(this.form, api_type)
        .then(rs => {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.vloading = false;
          this.$emit("CB-dialogStatus", 1);
        })
        .catch(() => {
          this.vloading = false;
        });
    },
    getRead() {
      this.loading = true;
      cated_read(this.caId)
        .then(rs => {
          this.form = rs;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getSelect() {
      this.loading = true;
      cateList()
        .then(rs => {
          let data = [
            {
              id: 0,
              path: [0],
              title: "作为一级菜单",
              children: rs
            }
          ];
          this.options = data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //关闭弹框
    closedialog() {
      this.clear();
      this.$emit("CB-dialogStatus", false);
    },
    clear() {
      this.form = {
        path: [],
        title: ""
      };
      this.loading = false;
      this.vloading = false;
    }
  }
};
</script>
