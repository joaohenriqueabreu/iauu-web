<template>
  <div class="content">
    <client-only>
      <aside>
        <side-menu></side-menu>
      </aside>
      <div class="vertical">
        <header class="d-flex justify-content-end">
          <menu-manager></menu-manager>
        </header>
        <main>
          <alert></alert>
          <nuxt />
        </main>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuManager from '@/components/menu/menuManager'
import SideMenu from '@/components/menu/sideMenu'

export default {
  components: {
    'side-menu': SideMenu,
    'menu-manager': MenuManager
  },
  computed: {
    ...mapState({ theme: (state) => state.layout.theme })
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  min-height: 10vh;
  padding: 10px 0;
  background: transparent;
}

main {
  position: relative;
  padding: 0 20px;
  padding-bottom: 8 * $space;

  @include desktop {
    margin-left: 15vw;
  }
}

aside {
  background: $layer1;
  position: fixed;
  left: 0;
  z-index: $moveToTop;
  @include desktop {
    display: flex;
    flex-direction: column;
    stop: 0;
    width: 15vw;
    height: 100vh;
  }

  @include mobile {
    display: flex;
    flex-direction: row;
    bottom: 0;
    width: 100vw;
    height: 10vh;
  }
}
</style>
