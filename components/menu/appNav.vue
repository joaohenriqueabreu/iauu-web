<template>
  <nav class="navbar d-flex justify-content-end">
    <div>
      <menu-manager></menu-manager>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import MenuManager from '@/components/menu/menuManager'
export default {
  components: {
    'menu-manager': MenuManager
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user })
  }
}
</script>

<style></style>
