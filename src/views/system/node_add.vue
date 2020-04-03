<template>
  <el-dialog :visible="dialogStatus" title="导航栏信息" width="580px" top="25vh" close-on-press-escape @close="cleardialog" @open="openDialog">
    <el-form v-loading="loading" ref="form" :model="form" :rules="rules" label-width="150px" element-loading-text="数据载入中">
      <el-form-item label="上级类别名称" required>
        <el-cascader :options="options" v-model="form.path" :props="props" change-on-select style="width:100%" size="medium" />
      </el-form-item>
      <el-form-item label="规则名称" prop="title">
        <el-input v-model="form.title" placeholder="请填写规则名称" size="medium" />
      </el-form-item>
      <el-form-item label="接口标识" prop="name">
        <el-input v-model="form.name" placeholder="请填写接口标识" size="medium" />
      </el-form-item>
      <el-form-item label="路由标识" prop="api_name">
        <el-input v-model="form.api_name" placeholder="请填写规则标识" size="medium" @keyup.enter.native="handleBaocun()" />
      </el-form-item>
      <el-form-item label="传值方式" prop="method">
        <el-select v-model="form.method" placeholder="请选择传值方式" filterable clearable size="medium">
          <el-option v-for="item in methodData" :label="item.title" :value="item.title" :key="item.title">
            <i :class="item.title" /> {{ item.title }}
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div v-if="!loading" slot="footer" class="dialog-footer">
      <el-button :loading="vloading" type="primary" icon="fa fa-floppy-o" @click="handleBaocun()"> 确认保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import { nodeRead, nodeWrite, nodeList } from "@/api/system/node";

const form = {
  name: "",
  api_name: "",
  title: "",
  path: [],
  method: ""
};

export default {
  props: ["dialogStatus", "nodeid", "path"],

  data() {
    return {
      vloading: false,
      loading: false,
      form: JSON.parse(JSON.stringify(form)),
      options: [],
      props: {
        value: "id",
        label: "title",
        children: "children"
      },
      rules: {
        title: [
          {
            required: true,
            message: "请填写规则名称",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请填写接口标识",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: mapState({
    methodData: state => state.methodData
  }),
  methods: {
    openDialog() {
      this.getSelect();
      if (this.nodeid) {
        this.getRead();
      }
      if (this.path && this.path.length > 0) {
        this.form.path = this.path;
      }
    },
    //提交
    handleBaocun() {
      this.vloading = true;
      let api_type = "";
      if (typeof this.nodeid === "number") {
        api_type = "put";
      } else {
        api_type = "post";
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          nodeWrite(this.form, api_type)
            .then(rs => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.vloading = false;
              this.clearForm();
              this.$emit("CB-dialogStatus", true);
            })
            .catch(() => {
              this.vloading = false;
            });
        } else {
          this.vloading = false;
        }
      });
    },
    getSelect() {
      this.loading = true;
      nodeList()
        .then(rs => {
          let data = [
            {
              id: 0,
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
    getRead() {
      this.loading = true;
      nodeRead(this.nodeid)
        .then(rs => {
          this.form = rs;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //关闭弹框
    cleardialog() {
      this.clearForm();
      this.$emit("CB-dialogStatus", false);
    },
    //清理表单
    clearForm() {
      this.form = JSON.parse(JSON.stringify(form));
      this.$refs["form"].resetFields();
    }
  }
};
</script>
