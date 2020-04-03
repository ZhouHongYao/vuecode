<template>
  <div style="position: absolute;">
    <div class="canvas-box">
      <canvas id="cvs" width="600" height="800">不支持canvas</canvas>
    </div>
    <div class="canvas-tab">
      <el-button type="primary" class="margin-bottom-20" @click="add">添加</el-button>
      <el-table :data="arrs" element-loading-text="数据载入中" highlight-current-row fit stripe>
        <el-table-column align="center" type="index" width="50" label="#" />
        <el-table-column min-width="120px" label="名称" show-overflow-tooltip sortable />
        <el-table-column min-width="120px" prop="note" label="备注" show-overflow-tooltip />
        <el-table-column width="100px" label="操作" align="right" fixed="right">
          <template slot-scope="scope">
            <el-button class="margin-left-10" type="danger" size="mini" plain icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestCanvas",
  data() {
    return {
      arrs: [],
      points: [],
      cvs: null,
      cvsClientRect: null,
      ctx: null,
      isAdd: false
    }
  },
  mounted: function() {
    this.cvs = document.getElementById("cvs");
    this.cvsClientRect = this.cvs.getBoundingClientRect();
    this.ctx = this.cvs.getContext('2d');
    if (this.isAdd) {
      this.cvs.addEventListener("click", this.mousemoveHandler, false);
    }

    this.cvs.addEventListener("mousedown", (event) => {
      if (!this.isAdd) {
        return
      }
      if (event.button == 0) {
        let item = {
          x: event.pageX - this.cvsClientRect.x,
          y: event.pageY - this.cvsClientRect.y
        }
        this.points.push(item);
        this.drawAcr(item)
        if (this.points.length >= 1) {
          this.drawPolygon(this.points);
        }
      } else if (event.button === 2) {
        if (this.points.length < 3) {
          this.points = []
          return
        }
        this.arrs.push(this.points)
        this.points = []
        this.isAdd = false
        this.ctx.save();
      }
    }, false);

    document.oncontextmenu = function(e) {
      return false;
    }
  },
  methods: {
    add() {
      this.isAdd = true
    },
    del(row) {
      console.log(row)
    },
    mousemoveHandler(event) {
      let item = {
        x: event.pageX - this.cvsClientRect.x,
        y: event.pageY - this.cvsClientRect.y
      }
      console.log(this.ctx.isPointInPath(item.x, item.y));
      // if (this.ctx.isPointInPath(item.x, item.y)) {

      // }
    },
    drawPolygon(points) {
      if (!points[0].x) {
        return
      }
      let poly = this.cvs.getContext('2d');
      poly.strokeStyle = 'rgba(64, 158, 255,0.5)';
      // poly.fillStyle = "#409EFF";
      poly.beginPath();
      poly.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        poly.lineTo(points[i].x, points[i].y);
      }
      poly.closePath();
      poly.fill();
      poly.stroke();
    },
    drawAcr(item) {
      this.ctx.beginPath();
      this.ctx.arc(item.x, item.y, 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = "#409EFF";
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  -moz-user-select: none;
  -webkit-user-select: none;
}
.canvas-box {
  width: 800px;
  height: 1000px;
  border: 2px solid #eee;
  margin-left: 20px;
  margin-top: 20px;
  display: inline-block;
  vertical-align: top;
}
.canvas-tab {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
