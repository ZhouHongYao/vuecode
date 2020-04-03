<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>

