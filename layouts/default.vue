<template>
  <div class="theme" class="page">
    <header>
      <transparent-nav ref="nav"></transparent-nav>
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <h1>this is a footer</h1>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TransparentNav from '@/components/menu/transparentNav'
export default {
  components: {
    'transparent-nav': TransparentNav
  },
  computed: {
    ...mapState({ theme: (state) => state.layout.theme })
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100vw;
  z-index: $above;
}
main {
  min-height: 400vh;
}
</style>
