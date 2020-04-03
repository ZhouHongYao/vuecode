<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.keys" :clearable="true" style="width: 260px;" class="margin-bottom-10" placeholder="检索：用户名、URL、IP" @keyup.enter.native="handleFilter" />
        <Datepicker v-model="listQuery" />
        <el-button v-waves class="margin-bottom-10" type="primary" plain icon="el-icon-search" @click="handleFilter">搜索</el-button>
      </div>
      <el-table v-loading="listLoading" :data="dataList" element-loading-text="数据载入中" fit stripe @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="55" fixed="left" />
        <el-table-column min-width="100px" prop="name" label="操作用户" show-overflow-tooltip />
        <el-table-column min-width="220px" prop="url" label="请求URL" show-overflow-tooltip />
        <el-table-column min-width="220px" prop="method" label="请求方式" show-overflow-tooltip />
        <el-table-column min-width="180px" prop="ip" label="请求IP" show-overflow-tooltip />
        <el-table-column min-width="160px" prop="add_time" label="操作时间" show-overflow-tooltip sortable />
        <el-table-column align="center" label="操作" width="100" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain icon="el-icon-document" @click="readDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Page v-model="listQuery" :total="total" />
    <logDialog :ca-data="caData" :dialog-status="dialogStatus" @CB-dialogStatus="CB_dialogStatus"> 详情</logDialog>
  </div>
</template>

<script>
import { logList, logDel } from "@/api/system/log";
import waves from "@/directive/waves"; // 水波纹指令
import logDialog from "./logDetail";
export default {
  directives: {
    waves
  },
  components: {
    logDialog
  },
  data() {
    return {
      dataList: [],
      total: null,
      listLoading: false,
      multipleSelection: [],
      listQuery: {
        page: 1,
        listRows: this.$store.state.pageSize,
        keys: "",
        times: ""
      },
      //详情Dialog 参数
      dialogStatus: false,
      caData: "",
      //导出Dialog 参数
      exportDialogstatus: false,
      exportUrl: ""
    };
  },
  activated() {
    this.listQuery.listRows = this.$store.state.pageSize
    this.getData();
  },
  methods: {
    //获取主数据
    getData() {
      this.listLoading = true;
      logList(this.listQuery)
        .then(rs => {
          this.listLoading = false;
          this.dataList = rs.data;
          this.total = rs.count;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //查看详情
    readDetail(data) {
      this.caData = data;
      this.dialogStatus = true;
    },
    CB_dialogStatus() {
      this.caData = "";
      this.dialogStatus = false;
    },
    //根据条件检索
    handleFilter() {
      this.listQuery.page = 1;
      this.getData();
    },
    //多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    batchDelLog() {
      let ids = this.multipleSelection.map(item => {
        return item.id;
      });
      this.delLog(ids);
    },
    //删除
    delLog(id) {
      this.$confirm("删除后不可恢复，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logDel({ id: id })
            .then(rs => {
              this.$message({
                message: "数据删除成功！",
                type: "success"
              });
              this.getData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //导出数据
    exportLog() {
      this.exportDialogstatus = true;
      this.exportUrl = "/admin-api/log-xlsx";
    },
    CB_exportDialogstatus() {
      this.exportDialogstatus = false;
      this.exportUrl = "";
    }
  }
};
</script>
