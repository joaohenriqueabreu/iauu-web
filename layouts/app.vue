<template>
  <div :class="theme" class="page">
    <div class="horizontal">
      <aside :class="theme">
        <side-menu></side-menu>
      </aside>
      <div class="vertical">
        <main>
          <header class="d-flex justify-content-end">
            <menu-manager></menu-manager>
          </header>
          <nuxt />
        </main>
      </div>
    </div>
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
  height: 10vh;
  padding: 10px 0;
}

main {
  padding: 0 20px;
  @include desktop {
    width: 85vw;
    min-height: 100vh;
    overflow: auto;
  }

  @include mobile {
    width: 100vw;
  }
}
aside {
  @include desktop {
    width: 15vw;
  }

  @include mobile {
    display: none;
  }
}
</style>
