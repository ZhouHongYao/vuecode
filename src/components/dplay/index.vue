<template>
  <div>
    <d-player ref="player" :options="options" @play="play" />
  </div>
</template>
<script>
export default {
    name: "vue-dplay",
    // props: {
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    data() {
        return {
            options: {
                video: {
                    url: "http://static.smartisanos.cn/common/video/t1-ui.mp4",
                    pic:
                        "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg"
                },
                autoplay: false,
                contextmenu: [
                    {
                        text: "GitHub",
                        link: "https://github.com/MoePlayer/vue-dplayer"
                    }
                ]
            },
            player: null
        };
    },
    mounted() {
        const player = this.$refs.player.dp;
        player.play();
        // setTimeout(() => {
        //     player.pause();
        // }, 2000);
    },
    methods: {
        play() {
            console.log("play callback");
        }
    }
};
</script>
<style>
.dplayer {
    width: 800px;
    margin: 50px auto;
}
</style>
