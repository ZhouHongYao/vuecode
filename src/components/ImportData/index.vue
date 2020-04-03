<template>
  <span>
    <el-button v-waves class="filter-item margin-right-10" icon="el-icon-upload" type="primary" @click="importDialog = true">
      导入
    </el-button>
    <el-dialog :visible="importDialog" title="数据导入" width="780px" top="15vh" @close="handleClose" @open="openDialog">
      <div class="text-right">
        <el-button class="filter-item" icon="el-icon-download" type="primary" plain @click="importDialog = true">
          样表下载
        </el-button>
      </div>
      <hr class="hr_label">
      <el-form ref="form" :model="form" :rules="rules" class="margin-top-30" label-suffix="：" label-width="120px">
        <el-form-item ref="file.url" label="上传数据" prop="file.url">
          <Upload v-show="!form.file.url" :filters="filters" button_size="small" button-id="file" plain button_text="导入表格" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo"/>
          <el-row v-show="form.file.url">
            <el-col>
              <ul class="el-upload-list el-upload-list--text">
                <li class="el-upload-list__item is-success">
                  <a v-if="publicCheckTemp(form.file.url)" :href="form.file.url" class="el-upload-list__item-name blue" target="_blank">
                    <i class="el-icon-document"/>
                    导入数据
                  </a>
                  <a v-else class="el-upload-list__item-name blue" @click="publicCheckUrl(form.file.file, '论文首页')">
                    <i class="el-icon-document"/>
                    导入数据
                  </a>
                  <i class="el-icon-close" @click="file_close('file')"/>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"/>
                  </label>
                </li>
              </ul>
            </el-col>
          </el-row>
          <el-progress v-if="percent>0" :text-inside="true" :stroke-width="15" :percentage="percent" :status="status" class="margin-top-5"/>
          <div class="el-upload__tip" style="line-height: 25px;">
            请上传（.xls/.xlsx）格式Excel文件，大小不超过10MB。
          </div>
        </el-form-item>
        <el-form-item label="审核状态" prop="status" class="form_item">
          <el-radio v-model="form.status" :label="1">待审核</el-radio>
          <el-radio v-model="form.status" :label="2">审核通过</el-radio>
        </el-form-item>
        <el-form-item label="数据来源" prop="sjly">
          <el-input v-model="form.sjly" placeholder="请填写数据来源" clearable/>
        </el-form-item>
        <el-form-item label="日志备注" prop="beizhu">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="form.beizhu" type="textarea" maxlength="300" placeholder="该备注为导入数据日志的备注信息，非必填项"/>
          可填写
          <span class="danger">{{ 300-form.beizhu.length }}</span> 个字符
        </el-form-item>
      </el-form>
      <div class="text-right">
        <div class="form-title danger">
          <i class="fa fa-file-text-o padding-right-5"/>日志
        </div>
      </div>
      <el-table v-loading="listLoading" :data="dataList" element-loading-text="数据载入中" fit stripe>
        <el-table-column min-width="110" prop="name" label="教师姓名" show-overflow-tooltip sortable="custom"/>
        <el-table-column min-width="110" prop="account" label="教师工号" show-overflow-tooltip sortable="custom"/>
        <el-table-column min-width="110" prop="add_time" label="导入时间" show-overflow-tooltip sortable="custom"/>
        <el-table-column min-width="110" prop="num" label="导入数量" show-overflow-tooltip/>
        <el-table-column min-width="150" prop="beizhu" label="备注" show-overflow-tooltip/>
        <el-table-column min-width="100" prop="status" label="状态" show-overflow-tooltip/>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button v-waves :loading="loading" type="primary" icon="fa fa-floppy-o" @click="handleKeep()"> 确认保存</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
import { checkSelf } from "@/api/mixins";
import Upload from "@/components/plupload/pl-upload";
import waves from "@/directive/waves"; // 水波纹指令

const form = {
  sjly: "",
  beizhu: "",
  file: {
    url: "",
    name: "",
    path: ""
  }
};
export default {
  name: "ImportData",
  components: { Upload },
  directives: { waves },
  mixins: [checkSelf],
  props: ["model"],
  data() {
    return {
      importDialog: false,
      listLoading: false,
      loading: false,
      dataList: [],
      form: form,
      percent: 0,
      status: "",
      //限制上传文件
      filters: {
        max_file_size: "10mb",
        mime_types: [{ title: "Excel file", extensions: "xls,xlsx" }]
      },
      rules: {}
    };
  },
  activated() {},
  methods: {
    //上传进度
    CB_UploadProgress(file) {
      this.percent = file.percent;
    },
    //上传成功后的回调
    CB_GetFileInfo(res) {
      if (res && res.url) {
        this.form.file = res;
        this.percent = 0;
        this.$refs["file.url"].clearValidate();
        this.status = "success";
        this.$message({ message: "上传成功", type: "success" });
      } else {
        this.percent = 0;
        this.status = "exception";
        this.$message({ message: "上传失败", type: "error" });
      }
    },
    //刪除图片
    file_close() {
      this.form.file.name = "";
      this.form.file.url = "";
      this.form.file.path = "";
    },
    //打开
    openDialog() {
      console.log(this.model);
    },
    //关闭
    handleClose() {
      this.importDialog = false;
    }
  }
};
</script>
<style scoped>
.hr_label {
  height: 1px;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: #e2e2e2;
}
.form-title {
  display: block;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 15px;
}
</style>

