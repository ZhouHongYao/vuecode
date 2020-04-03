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
        this.cvs.addEventListener("click", this.mouseclickHandler, false);
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
    //点击监听
    mouseclickHandler(event) {
      if (this.isAdd) {
        return
      }
      let item = {
        x: event.pageX - this.cvsClientRect.x,
        y: event.pageY - this.cvsClientRect.y
      }
      console.log(item)
      this.arrs.forEach(v => {
        let i = this.judge(item, v)
        console.log(i, v)
      });
    },
    //绘制多边形
    drawPolygon(points) {
      if (!points[0].x) {
        return
      }
      this.ctx.strokeStyle = 'rgba(64, 158, 255,0.5)';
      this.ctx.fillStyle = "#409EFF";
      this.ctx.beginPath();
      this.ctx.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i].x, points[i].y);
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.save();
    },
    //画点
    drawAcr(item) {
      let acr = this.cvs.getContext('2d');
      acr.beginPath();
      acr.arc(item.x, item.y, 2, 0, 2 * Math.PI);
      acr.strokeStyle = 'rgba(64, 158, 255,0.5)';
      acr.fillStyle = "#409EFF";
      acr.fill();
      acr.stroke();
    },
    judge(dot, coordinates) {
      const x = dot.x;
      const y = dot.y;
      var crossNum = 0;
      for (var i = 0; i < coordinates.length - 1; i++) {
        var start = coordinates[i];
        var end = coordinates[i + 1];

        // 起点、终点斜率不存在的情况
        if (start.x === end.x) {
          // 因为射线向右水平，此处说明不相交
          if (x > start.x) continue;

          if ((end.y > start.y && y >= start.y && y <= end.y) || (end.y < start.y && y >= end.y && y <= start.y)) {
            crossNum++;
          }
          continue;
        }
        // 斜率存在的情况，计算斜率
        var k = (end.y - start.y) / (end.x - start.x);
        // 交点的x坐标
        var x0 = (y - start.y) / k + start.x;
        // 因为射线向右水平，此处说明不相交
        if (x > x0) continue;

        if ((end.x > start.x && x0 >= start.x && x0 <= end.x) || (end.x < start.x && x0 >= end.x && x0 <= start.x)) {
          crossNum++;
        }
      }

      return crossNum % 2 === 1;
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
