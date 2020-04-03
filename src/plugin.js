import Vue from 'vue'
// 加载树形菜单 import 'vue-tree-halower/dist/halower-tree.min.css'
import VTree from 'vue-tree-halower'
//图片查看器
import PicViewer from "./components/PicViewer";
//分页
import Page from './components/Page';
//播放器
// import Dplayer from '@/components/dplay/dplay'

//数据导入
import Download from './components/Download';
//时间范围检索
import Datepicker from './components/Datepicker';
Vue.nextTick(function() {
  // Vue.use(Dplayer)
  Vue.use(Page);
  Vue.use(Download);
  Vue.use(PicViewer);
  Vue.use(VTree);
  Vue.use(Datepicker);
});
