<template>
  <div :class="theme" class="page">
    <header>
      <landing-nav ref="nav"></landing-nav>
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
import LandingNav from '@/components/menu/landingNav'
export default {
  components: {
    'landing-nav': LandingNav
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

header {
  height: 10vh;
}

main {
  height: 100vh;
  padding-top: 10vh;
}

footer {
  height: 20vh;
  background: $layer1;
}
</style>
