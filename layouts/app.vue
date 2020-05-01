<template>
  <div :class="theme" class="page">
    <header>
      <app-nav></app-nav>
    </header>
    <!-- <perfect-scrollbar class="horizontal"> -->
    <div class="horizontal">
      <aside :class="theme">
        <side-menu></side-menu>
      </aside>
      <main>
        <nuxt />
      </main>
    </div>
    <!-- </perfect-scrollbar> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppNav from '@/components/menu/appNav'
import SideMenu from '@/components/menu/sideMenu'
export default {
  components: {
    'side-menu': SideMenu,
    'app-nav': AppNav
  },
  computed: {
    ...mapState({ theme: (state) => state.layout.theme })
  }
}
</script>

<style lang="scss" scoped>
main {
  padding: 20px;
  @include desktop {
    width: 82vw;
  }

  @include mobile {
    width: 100vw;
  }
}
aside {
  padding: 50px 10px;
  @include desktop {
    width: 13vw;
  }

  @include mobile {
    display: none;
  }
}
</style>
