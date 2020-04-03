<template>
  <div class="components-container">
    <code><strong>Plupload 分片上传</strong> type:默认按钮、darg和photo

    </code>
    <Upload :filters="filters" button_size="small" plain button_text="上传文件" button_id="default" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo" />
    <el-row v-show="form.file.url">
      <el-col>
        <ul class="el-upload-list el-upload-list--text">
          <li class="el-upload-list__item is-success">
            <a :href="form.file.url" class="el-upload-list__item-name blue" target="_blank">
              <i class="el-icon-document" />
              {{ form.file.name }}
            </a>
            <i class="el-icon-close" @click="file_close(1)" />
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-circle-check" />
            </label>
          </li>
        </ul>
      </el-col>
    </el-row>

    <Upload :filters="filters" class="margin-top-50" type="drag" button_id="darg" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo" />

    <el-row v-show="form.file2.url">
      <el-col>
        <ul class="el-upload-list el-upload-list--text">
          <li class="el-upload-list__item is-success">
            <a :href="form.file2.url" class="el-upload-list__item-name blue" target="_blank">
              <i class="el-icon-document" />
              {{ form.file2.name }}
            </a>
            <i class="el-icon-close" @click="file_close(2)" />
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-circle-check" />
            </label>
          </li>
        </ul>
      </el-col>
    </el-row>

    <Upload :image-url="form.file3.url" :filters="filters" class="margin-top-50" type="photo" button_id="photo" plain button_text="上传文件" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo" />

    <el-progress v-if="percent>0" :text-inside="true" :stroke-width="15" :percentage="percent" :status="status" class="margin-top-5" />

  </div>
</template>

<script>
import Upload from "@/components/plupload/index";

export default {
  name: "plupload",
  components: { Upload },
  data() {
    return {
      form: {
        file: {
          url: "",
          path: "",
          name: ""
        },
        file2: {
          url: "",
          path: "",
          name: ""
        },
        file3: {
          url: "",
          path: "",
          name: ""
        }
      },
      percent: 0,
      status: "",
      //限制上传文件
      filters: {
        max_file_size: "10mb",
        mime_types: [
          { title: "file", extensions: "xls,xlsx,jpg,png" },
          { title: "Image files", extensions: "jpg,gif,png" }
        ]
      }
    };
  },
  methods: {
    //上传进度
    CB_UploadProgress(file) {
      this.percent = file.percent;
    },
    //上传成功后的回调
    CB_GetFileInfo(res, id) {
      if (res && res.url) {
        if (id == "darg") {
          this.form.file2 = res;
        } else if (id == "photo") {
          this.form.file3 = res;
        } else {
          this.form.file = res;
        }
        this.percent = 0;
        this.status = "success";
        this.$message({ message: "上传成功", type: "success" });
      } else {
        this.percent = 0;
        this.status = "exception";
        this.$message({ message: "上传失败", type: "error" });
      }
    },
    //上传错误后的回调
    CB_error() {
      this.percent = 0;
      this.status = "exception";
    },
    //刪除图片
    file_close(val) {
      if (val == 1) {
        this.form.file.name = "";
        this.form.file.url = "";
        this.form.file.path = "";
      } else if (val == 2) {
        this.form.file2.name = "";
        this.form.file2.url = "";
        this.form.file2.path = "";
      } else {
        this.form.file3.name = "";
        this.form.file3.url = "";
        this.form.file3.path = "";
      }
    }
  }
};
</script>
<style scoped>
.avatar {
  width: 120px;
  height: 150px;
  display: block;
}
</style>

