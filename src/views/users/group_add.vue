<template>
  <div>
    <!--添加编辑角色弹框-->
    <el-dialog :visible="dialogState" title="角色组信息" width="580px" top="30vh" @close="handleClose" @open="readNode">
      <el-form ref="formData" :model="formData" :rules="rules" label-suffix="：" label-width="120px" @submit.native.prevent>
        <el-form-item label="角色组名称" prop="title">
          <el-input v-model="formData.title" placeholder="填写用户组名称" maxlength="20" minlength="3"/>
        </el-form-item>
        <el-form-item label="用户组描述" prop="describe">
          <el-input v-model="formData.describe" :rows="2" type="textarea" placeholder="描述当前用户组的权限职责，非必填项"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="2">正常</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" icon="fa fa-floppy-o" @click="handleKeep()"> 确认保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { groupEdit, groupRead } from "@/api/system/userGroup";
export default {
  props: ["dialogState", "groupId"],
  data() {
    return {
      loading: false,
      formData: {
        title: "",
        describe: "",
        status: 1
      },
      rules: {
        title: [
          {
            required: true,
            message: "请填写角色组名称",
            trigger: "blur"
          },
          {
            max: 20,
            message: "角色组名称不能超过20字符！",
            trigger: "blur"
          }
        ],
        status: [
          {
            type: "number",
            required: true,
            message: "请选择角色状态",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    readNode() {
      if (this.groupId === "") {
        return;
      }
      this.getRead();
    },
    //保存数据
    handleKeep() {
      let api_type;
      if (this.groupId) {
        this.formData.id = this.groupId;
        api_type = "put";
      } else {
        api_type = "post";
      }
      this.$refs["formData"].validate(valid => {
        if (valid) {
          this.loading = true;
          groupEdit(this.formData, api_type)
            .then(rs => {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.loading = false;
              this.reset();
              this.$emit("CB-dialogState", 1);
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getRead() {
      groupRead(this.groupId)
        .then(rs => {
          this.formData = rs;
        })
        .catch(() => {});
    },
    //清空数据
    reset() {
      this.formData = {
        title: "",
        describe: "",
        status: 1
      };
      this.$refs["formData"].resetFields();
    },
    //关闭
    handleClose() {
      this.reset();
      this.$emit("CB-dialogState", false);
    }
  }
};
</script>
