<template>
  <div>
    <div :style="{ 'background-image': `url(${bgImage})` }" class="bg"></div>
    <div class="vertical middle center">
      <avatar :src="artist.photo" :username="artist.company_name"></avatar>
      <h1>{{ artist.company_name || artist.name }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ store, route }) {
    await store.dispatch('contractor/loadArtist', route.params.slug)
  },
  computed: {
    ...mapState({ artist: (state) => state.contractor.artist }),
    bgImage() {
      return require('@/assets/imgs/concert.png?webp')
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  height: 60vh;
  position: absolute;
  top: -10vh; // to place on header
  left: 0;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: $base;
  opacity: 0.5;
}
</style>
