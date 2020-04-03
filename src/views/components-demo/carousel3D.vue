<template>
  <div class="components-container">
    <h3 class="text-center margin-50">Vue Carousel 3D - Beautiful, flexible and touch supported 3D Carousel for Vue.js.</h3>
    <div>
      <carousel-3d :autoplay="true" :controls-visible="true" :width="carousel_width" :height="carousel_height" dir="rtl">
        <slide v-for="(slide, i) in slides" :index="i" :key="i" class="slide_box">
          <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="slide.src" style="height:100%;width:auto">
          </template>
        </slide>
      </carousel-3d>
    </div>
    <div class="text-center">
      宽度:
      <el-input v-model="carousel_width" placeholder="宽度" style="width:120px" /> 高度:
      <el-input v-model="carousel_height" placeholder="高度" style="width:120px" />
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  name: "carousel3D",
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      carousel_width: "700",
      carousel_height: "430",
      slides: [
        {
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537352857664&di=0e48387d900a12ff9aec37fa16f9b3e1&imgtype=0&src=http%3A%2F%2Fpic27.photophoto.cn%2F20130607%2F0036036826432444_b.jpg"
        },
        {
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537352897118&di=8c1e7fd0a36417cc0a99339373d3c3bd&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201702%2F10%2Fa3d01e55a00c01e668099b9f3ac8d9b5.jpg"
        },
        {
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537352978904&di=8c922577d742b821262a84a270811f2d&imgtype=0&src=http%3A%2F%2Fpic27.photophoto.cn%2F20130625%2F0036036872410250_b.jpg"
        },
        {
          src:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537352897115&di=2c954eb8d13254f155d65cce4472da26&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F170310%2F330850-1F31001591410.jpg"
        },
        {
          src: "http://pic1.win4000.com/wallpaper/8/59ace80683afd.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.slide_box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  border: 0px;
}
</style>

