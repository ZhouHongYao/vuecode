<template>
  <el-dialog :visible="dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" title="添加管理员" width="500px" top="30vh" @close="cleardialog" @open="openDialog">
    <el-form v-loading="loading" ref="form" :rules="rules" :model="form" label-width="100px" label-suffix="：" @submit.native.prevent>
      <el-form-item label="用户组">
        {{ groupTitle }}
      </el-form-item>
      <el-form-item v-if="group==9" label="系所" prop="xisuo">
        <el-select v-model="form.xisuo" placeholder="不限所在系所" style="width: 100%;" clearable>
          <el-option v-for="item in xisuoData" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="form.name" placeholder="填写教师姓名" clearable @blur="checkTeacher(form.name)" @keyup.enter.native="checkTeacher(form.name)" @change="clear_teaher()" />
      </el-form-item>
      <el-form-item label="备注信息" prop="beizhu">
        <el-input v-model="form.beizhu" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" maxlength="100" placeholder="设置当前账号的备注信息，非必填项" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-waves :loading="loadingBiao" icon="fa fa-floppy-o" type="primary" @click="createData"> 保存数据</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import waves from "@/directive/waves"; // 水波纹指令
import { userSet } from "@/api/system/user";
import { checkTeacher } from "@/api/mixins";

export default {
  directives: {
    waves
  },
  mixins: [checkTeacher],
  props: ["dialogFormVisible", "group", "groupTitle"],

  data() {
    return {
      loading: false,
      loadingBiao: false,
      form: {
        uid: null,
        group: this.group,
        xisuo: null,
        name: "",
        beizhu: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写当前用户姓名！",
            trigger: "blur"
          },
          {
            min: 2,
            message: "用户姓名最小为2位！",
            trigger: "blur"
          },
          {
            max: 20,
            message: "用户姓名最大设置为20位！",
            trigger: "change"
          }
        ],
        xisuo: [
          {
            required: true,
            message: "请选择系所！",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: mapState({
    xisuoData: state => state.xisuoData
  }),
  methods: {
    //打开
    openDialog() {
      this.form.group = this.group;
    },
    //关闭
    cleardialog() {
      this.$emit("CB-dialogStatus", false);
      this.resetTemp();
    },
    //添加保存
    createData() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loadingBiao = true;
          userSet(this.form)
            .then(rs => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.loadingBiao = false;
              this.$emit("CB-dialogStatus", 1);
              this.resetTemp();
            })
            .catch(() => {
              this.loadingBiao = false;
            });
        }
      });
    },
    //重置表单
    resetTemp() {
      this.form = {
        uid: null,
        group: null,
        name: "",
        beizhu: ""
      };
      this.$refs["form"].resetFields();
    }
  }
};
</script>
