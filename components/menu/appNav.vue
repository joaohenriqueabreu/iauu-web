<template>
  <nav class="navbar d-flex justify-content-between">
    <nuxt-link to="/">
      <logo :height="50" :width="50"></logo>
    </nuxt-link>

    <avatar :src="user.photo.url" :username="user.name"></avatar>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import logo from '@/components/Logo'
export default {
  components: {
    logo
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user })
  }
}
</script>

<style></style>
