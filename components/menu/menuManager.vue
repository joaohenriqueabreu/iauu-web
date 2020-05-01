<template>
  <div>
    <div v-if="isLoggedIn" class="horizontal">
      <nuxt-link to="/profile">
        <avatar :src="user.photo.url" :username="user.name"></avatar>
      </nuxt-link>
      <div class="vertical">
        <nuxt-link to="/artist">
          <h6>{{ user.name }}</h6>
          <small>artista</small>
        </nuxt-link>
      </div>
    </div>
    <div v-else>
      <nuxt-link to="/login">
        <h5>Login</h5>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters('auth', ['isLoggedIn'])
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-right: 2 * $space;
}

h6 {
  font-weight: $bold;
}
</style>
