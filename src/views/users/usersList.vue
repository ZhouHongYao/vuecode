<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-input v-model="listQuery.keys" style="width: 200px;" clearable class="filter-item" placeholder="检索：用户名、姓名" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.status" clearable class="filter-item" placeholder="根据状态筛选用户">
          <el-option v-for="item in UserStatusOptions" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" plain icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button v-waves v-if="authCheck(17)" class="filter-item margin-left-10" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">添加</el-button>
        <el-button v-waves v-if="multipleSelection.length > 0 && authCheck(20)" class="filter-item" type="danger" icon="el-icon-delete" @click="handlePlDelete">批量移除</el-button>
        <goBack class="filter-item" />
      </div>
      <el-table v-loading="listLoading" :key="tableKey" :data="dataList" element-loading-text="数据载入中" fit stripe @selection-change="handleSelectionChange" @sort-change="handleSort">
        <el-table-column align="center" type="selection" width="45" />
        <el-table-column min-width="150px" prop="account" label="用户名" show-overflow-tooltip sortable />
        <el-table-column min-width="110px" prop="name" label="姓名" show-overflow-tooltip sortable />
        <el-table-column v-if="$route.params.group==9" min-width="160" prop="xisuo" label="系所" show-overflow-tooltip sortable="custom">
          <template slot-scope="scope">
            <span v-if="scope.row.xisuo">{{ scope.row.xisuo|division }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" prop="title" label="用户组" show-overflow-tooltip />
        <el-table-column min-width="100px" align="center" prop="status" label="状态" sortable>
          <template slot-scope="scope">
            <i :class="scope.row.status == '2'?'el-icon-success text-primary font-60':'el-icon-remove text-danger'" /> {{ scope.row.status|statusFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status=='2' && authCheck(22)" class="no-margin padding-5" plain size="mini" type="warning" @click="handleStatus(scope.row.id,'1')">
            <i class="el-icon-remove font-60" /> 禁用</el-button>
            <el-button v-if="scope.row.status=='1' && authCheck(22)" class="no-margin padding-5" plain size="mini" type="primary" @click="handleStatus(scope.row.id,'2')">
            <i class="el-icon-success font-60" /> 启用</el-button>
            <el-button v-if="authCheck(20)" type="danger" size="mini" plain icon="el-icon-delete" @click="handleDelete(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Page v-model="listQuery" :total="total" />
    <usersAdd :dialog-form-visible="dialogFormVisible" :group="group" :group-title="groupTitle" @CB-dialogStatus="CB_dialogStatus" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import waves from "@/directive/waves"; // 水波纹指令
import { getuserGroup, userList, userDel, userQiyong } from "@/api/system/user";
import goBack from "@/components/goBack";
import usersAdd from "./users_add";

const UserStatusOptions = [
  { id: "2", title: "正常" },
  { id: "1", title: "禁用" }
];

export default {
  name: "UserList",
  directives: { waves },
  components: { usersAdd, goBack },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "2": "正常",
        "1": "禁用"
      };
      return statusMap[status];
    },
    statusFeiFilter(status) {
      const statusMap = {
        "1": "启用",
        "2": "禁用"
      };
      return statusMap[status];
    },
    colorFeiFilter(status) {
      const statusMap = {
        "1": "text-success",
        "2": "text-muted"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableKey: 0,
      dataList: [],
      multipleSelection: [],
      total: 0,
      listLoading: false,
      listQuery: {
        listRows: this.$store.state.pageSize,
        page: 1,
        keys: "",
        group: null,
        status: null,
        _sort: "desc",
        _order: "id"
      },
      UserStatusOptions,
      dialogFormVisible: false,
      group: "",
      groupTitle: ""
    };
  },
  computed: mapState({
    userGroup: state => state.userGroup
  }),
  activated() {
    this.listQuery.group = this.$route.params.group;
    this.getData();
    this.getGroup();
  },
  methods: {
    //排序
    handleSort(val) {
      this.listQuery._order = val.prop;
      if (val.order === "ascending") {
        this.listQuery._sort = "asc";
      } else {
        this.listQuery._sort = "desc";
      }
      this.getData();
    },
    getGroup() {
      getuserGroup()
        .then(rs => {
          this.$store.dispatch("setUserGroup", rs);
        })
        .catch(() => {});
    },
    //获取主数据
    getData() {
      this.listLoading = true;
      userList(this.listQuery)
        .then(rs => {
          this.dataList = rs.data;
          this.total = rs.count;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //根据条件检索
    handleFilter() {
      this.listQuery.page = 1;
      this.getData();
    },
    //列表多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量移除
    handlePlDelete() {
      var data = [];
      for (var i in this.multipleSelection) {
        data.push(this.multipleSelection[i].id);
      }
      this.handleDelete(data);
    },
    //移除
    handleDelete(row) {
      this.$confirm("移除后不可恢复，确定要移除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userDel({ id: row })
            .then(rs => {
              this.$message({
                type: "success",
                message: "移除成功！"
              });
              this.getData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //添加管理员
    handleCreate() {
      this.group = this.$route.params.group;
      let item = this.userGroup.find(it => {
        return it.id === this.group;
      });
      this.groupTitle = item.title;
      this.dialogFormVisible = true;
    },
    CB_dialogStatus(val) {
      if (val) {
        this.getData();
      }
      this.dialogFormVisible = false;
      this.group = "";
      this.groupTitle = "";
    },
    //禁用启用
    handleStatus(id, status) {
      userQiyong({ id: id, status: status }).then(rs => {
        this.$message({
          type: "success",
          message: "操作成功"
        });
        this.getData();
      });
    }
  }
};
</script>
