<template>
  <nav :class="theme" class="navbar d-flex justify-content-between">
    <div>
      <nuxt-link to="/">
        <logo :height="50" :width="50"></logo>
      </nuxt-link>
    </div>
    <div>
      <menu-manager class="pr-4"></menu-manager>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/layout/logo'
import MenuManager from '@/components/menu/menuManager'
export default {
  components: {
    logo: Logo,
    'menu-manager': MenuManager
  },
  data() {
    return {
      theme: ''
    }
  }
}
</script>

<style lang="scss" scoped>
// nav {
//   transition: $transition;
//   background: $layer1;

//   .transparent {
//     transition: $transition;
//     background: transparent;
//   }
// }
</style>
