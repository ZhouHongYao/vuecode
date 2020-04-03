<template>
  <div>
    <a target="_blank text-info" href="https://github.com/mirari/v-viewer">
      <h3 class="text-center">Image viewer component for vue, supports rotation, scale, zoom and so on, based on viewer.js</h3>
    </a>

    <div v-viewer class="pointer padding-30">
      <img v-for="(item, index) in imgArr" :key="index" :src="item" height="100" class="margin-10" width="200">
    </div>
    <div class="padding-30">
      <PicViewer :img-arr="imgArr" title="查看" class="" />
    </div>
    <!-- <Dplayer /> -->
    <viewer :options="options" :images="imgArrs" class="padding-left-30" @inited="inited">
      <p>缩略图 点击查看大图/相关图片</p>
      <div v-for="(item, index) in imgArrs" :key="index">
        <img :src="item.img" :data-original="item.imgage" height="100" class="margin-10 pointer" width="200">
      </div>
    </viewer>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
export default {
    data() {
        return {
            imgArr: [
                "http://www.wallcoo.com/holiday/2009_Christmas_Ornaments/wallpapers/1440x900/Christmas_sparkling_2.jpg",
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537438779490&di=a136c65d3dc1427bc86163aec8d16293&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg"
            ],
            imgArrs: [
                {
                    img:
                        "http://www.wallcoo.com/holiday/2009_Christmas_Ornaments/wallpapers/1440x900/Christmas_sparkling_2.jpg",
                    imgage:
                        "http://pic1.win4000.com/wallpaper/8/59ace80683afd.jpg"
                },
                {
                    img:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537438779490&di=a136c65d3dc1427bc86163aec8d16293&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg",
                    imgage:
                        "http://pic1.win4000.com/wallpaper/8/59ace80683afd.jpg"
                }
            ],
            options: {
                url: "data-original"
            }
        };
    },
    activated() {
        setTimeout(() => {
            this.imgArrs = [];
            for (let index = 0; index < 5; index++) {
                this.imgArrs.push({
                    img:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537438779490&di=a136c65d3dc1427bc86163aec8d16293&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg",
                    imgage:
                        "http://pic1.win4000.com/wallpaper/8/59ace80683afd.jpg"
                });
            }
        }, 3000);
    },
    methods: {
        inited(viewer) {
            this.$viewer = viewer;
        }
    }
};
</script>

