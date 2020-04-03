<template>
  <div>
    <div class="app-container">
      <div class="filter-container">
        <el-input :clearable="true" v-model="listQuery.keys" style="width: 250px;" class="filter-item" placeholder="检索：用户组名称、教师、描述" @keyup.enter.native="handleFilter" />
        <el-select v-model="listQuery.status" clearable class="filter-item" placeholder="根据状态筛选用户组" style="width: 180px;">
          <el-option v-for="item in GroupStatusOptions" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
        <el-button v-waves class="filter-item margin-right-10" type="primary" plain icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button v-waves v-if="authCheck(24)" class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="handleCreate">添加</el-button>
      </div>
      <el-table v-loading="listLoading" :key="tableKey" :data="dataList" element-loading-text="数据载入中" fit stripe>
        <el-table-column align="center" prop="id" label="ID" width="65" sortable />
        <el-table-column min-width="150px" prop="title" label="用户组名称" show-overflow-tooltip sortable />
        <el-table-column min-width="260px" prop="describe" label="用户组描述" show-overflow-tooltip sortable />
        <el-table-column min-width="100px" align="center" prop="status" label="状态" sortable>
          <template slot-scope="scope">
            <i :class="scope.row.status == '2'?'el-icon-success text-primary font-60':'el-icon-remove text-muted'" /> {{ scope.row.status|statusFilter }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="authCheck(29)" type="primary" size="mini" plain icon="el-icon-setting" @click="quanxian(scope.row.id,scope.row.title)"> 权限 </el-button>
            <router-link v-if="authCheck(16)" :to="{name:'list',params:{group:scope.row.id}}" class="el-button el-button--primary el-button--mini is-plain" tag="button">
              <i class="el-icon-edit" /> 成员
            </router-link>
            <el-dropdown v-if="authCheck(25)||authCheck(26)||authCheck(31)" class="margin-left-10" @command="handleCommand">
              <el-button type="info" size="mini" plain>
                更多
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="authCheck(31)" :command="{type:'status',ID:scope.row.id,status:scope.row.status}">
                  <span :class="scope.row.status|colorFeiFilter">{{ scope.row.status|statusFeiFilter }}</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="authCheck(26)" :command="{type:'edit',ID:scope.row.id}">
                  <span class="text-primary">编辑</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="authCheck(25)" :command="{type:'delete',ID:scope.row.id}">
                  <span class="text-danger">删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Page v-model="listQuery" :total="total" />
    <!-- 用户组添加编辑Dialog -->
    <groupAdd :dialog-state="dialogState" :group-id="groupId" @CB-dialogState="CB_dialogState" />
    <!-- 用户组权限节点Dialog -->
    <nodeTree :dialog-status="dialogStatus" :rlid="rlid" :group-title="groupTitle" @CB-dialogStatus="CB_dialogStatus" />
  </div>
</template>

<script>
import { groupList, groupDel, groupSet } from "@/api/system/userGroup";
import waves from "@/directive/waves"; // 水波纹指令
import groupAdd from "./group_add";
import nodeTree from "./node_tree";

const GroupStatusOptions = [
  { id: "2", title: "启用" },
  { id: "1", title: "禁用" }
];

export default {
  name: "UserGroup",
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "2": "启用",
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
    },
    colorFilter(status) {
      const statusMap = {
        "2": "text-success",
        "1": "text-danger"
      };
      return statusMap[status];
    }
  },
  components: {
    groupAdd,
    nodeTree
  },
  data() {
    return {
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        listRows: this.$store.state.pageSize,
        keys: this.keys,
        group: this.group,
        _order: "id",
        _sort: "asc"
      },
      GroupStatusOptions,
      // 新增（编辑）窗口
      // groupId 用户组Id
      dialogState: false,
      groupId: "",
      // 权限节点窗口
      //  rlid 用户组Id
      //  groupTitle 用户组名称
      dialogStatus: false,
      rlid: "",
      groupTitle: ""
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
      groupList(this.listQuery)
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
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    //添加用户组
    handleCreate() {
      this.dialogState = true;
    },
    //编辑用户组
    handleUpdate(id) {
      this.groupId = id;
      this.dialogState = true;
    },
    //删除角色组
    handleDelete(val) {
      this.$confirm("删除后不可恢复，确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          groupDel({ id: val })
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
    //启用、锁定
    lock(id, status) {
      this.listLoading = true;
      let val = status === "2" ? "1" : "2";
      groupSet({
        id: id,
        status: val
      })
        .then(rs => {
          this.listLoading = false;
          this.$message.success("操作成功");
          this.getData();
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    //用户组Dialog回调
    CB_dialogState(val) {
      if (val === 1) {
        this.getData();
      }
      this.groupId = "";
      this.dialogState = false;
    },
    //用户组权限设置Dialog
    quanxian(id, title) {
      this.rlid = id;
      this.groupTitle = "设置【" + title + "】权限";
      this.dialogStatus = true;
    },
    CB_dialogStatus() {
      this.rlid = "";
      this.groupTitle = "";
      this.dialogStatus = false;
    },
    //点击下拉菜单按钮时触发
    handleCommand(row) {
      //根据传递的类型参数判断执行对应的方法
      switch (row.type) {
        //跳转到启用/锁定的方法
        case "status":
          this.lock(row.ID, row.status);
          break;
        //跳转到编辑的方法
        case "edit":
          this.handleUpdate(row.ID);
          break;
        //跳转到删除的方法
        case "delete":
          this.handleDelete(row.ID);
          break;
      }
    }
  }
};
</script>
