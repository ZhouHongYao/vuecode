<template>
  <el-dialog :visible="dialogVisible" :modal-append-to-body="false" title="请选择头像" class="dialog-infoimg" width="40%" @close="handleClose" @open="openDialog">
    <el-row>
      <el-col>已设置头像</el-col>
      <el-col class="Info-Img margin-top-5"><img :src="img_data" :onerror="user.userinfo.sex==2?defaultImg2:defaultImg" alt="" class="img-md img-circle"></el-col>
      <el-col class="mar-top">选择系统内置头像</el-col>
      <el-col class="morenF">
        <img v-for="(item,index) in avatarData" :src="item" :key="index" class="img-md" alt="" @click="xuanzeImg(index+1)">
      </el-col>
    </el-row>
    <el-row class="margin-top-10">
      <el-col>上传自定义头像 </el-col>
      <el-col class="margin-top-5">
        <Upload :filters="filters" button_id="xxxx" button_size="small" plain button_text="上传头像" @Callback-UploadProgress="CB_UploadProgress" @Callback-GetFileInfo="CB_GetFileInfo" />
      </el-col>
    </el-row>
    <el-progress v-if="percent>0" :text-inside="true" :stroke-width="15" :percentage="percent" :status="status" class="margin-top-5" />
    <div class="el-upload__tip" style="line-height: 25px;">
      只能上传jpg/png/jpeg格式文件，且大小不超过，大小不超过1MB。
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleConfirm"> 保存 </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Upload from "@/components/plupload/index";
import { imgEdit, getImgs } from "@/api/teacher/teacher";

export default {
  components: { Upload },
  props: ["dialogVisible"],
  data() {
    return {
      defaultImg: 'this.src="' + require("@/assets/images/photos/1.png") + '"',
      defaultImg2: 'this.src="' + require("@/assets/images/photos/6.png") + '"',
      //限制上传文件
      filters: {
        max_file_size: "1mb",
        mime_types: [{ title: "Image files", extensions: "jpg,gif,png" }]
      },
      img_data: "",
      file: {
        url: "",
        path: "",
        name: ""
      },
      percent: 0,
      status: ""
    };
  },
  computed: {
    ...mapGetters(["head"]),
    ...mapState({
      user: state => state.user,
      avatarData: state => state.avatarData
    })
  },
  methods: {
    openDialog() {
      this.file.url = this.img_data = this.head;
      getImgs()
        .then(rs => {
          this.$store.dispatch("setAvatar", rs);
        })
        .catch(() => {});
    },
    //离开此页面
    handleClose(val) {
      this.clear();
      this.$emit("CB-ImgDialog", false);
    },
    //上传进度
    CB_UploadProgress(file) {
      this.percent = file.percent;
    },
    //上传成功后的回调
    CB_GetFileInfo(res) {
      if (res && res.url) {
        this.file = res;
        this.percent = 0;
        this.status = "success";
        this.$message({ message: "上传成功", type: "success" });
        this.img_data = this.file.url;
        this.$forceUpdate();
      } else {
        this.percent = 0;
        this.status = "exception";
        this.img_data = this.head;
        this.$message({ message: "上传失败", type: "error" });
      }
    },
    //刪除图片
    file_close() {
      this.file.name = "";
      this.file.url = "";
      this.file.path = "";
      this.$forceUpdate();
    },
    //保存头像
    handleConfirm() {
      let data = {
        file: this.file
      };
      imgEdit(data)
        .then(rs => {
          this.user.userinfo.head = this.img_data;
          this.$store.dispatch("setUserinfo", this.user);
          this.$message.success("保存成功");
          this.$emit("CB-ImgDialog", false);
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    },
    //设置默认图片
    xuanzeImg(val) {
      this.file.url = this.img_data = this.avatarData[val - 1];
    },
    clear() {
      this.img_data = "";
      this.file = {
        url: "",
        path: "",
        name: ""
      };
    }
  }
};
</script>
<style scoped>
.morenF > img:hover {
  cursor: pointer;
  box-shadow: 0px 0px 3px #1d8ce0;
}
img {
  border-radius: 50%;
}
.morenTitle {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}

.morenF > img,
.Info-Img img {
  background: #e5e5e5;
  padding: 4px;
}

.Info-Img {
  position: relative;
  cursor: pointer;
  display: inline-block;
}

.Info-Img > span {
  position: relative;
  top: -17px;
}

.Info-Img > div {
  margin-left: 2px;
  top: 15px;
  position: relative;
  display: inline-block;
}

.Info-Img > div img:hover {
  box-shadow: 0px 0px 3px #1d8ce0;
}

.Info-Img > div span {
  position: absolute;
  right: 0px;
  top: 0px;
}

.Info-Img > div span:hover {
  color: #ff4949;
  cursor: pointer;
}

.C-img-row {
  display: flex;
  justify-content: center;
}

.morenF {
  margin: auto;
}

.morenF > img {
  margin: 5px 5px;
}

.dialog-infoimg > div {
  width: 32%;
}
</style>
