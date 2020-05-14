<template>
  <div class="menu">
    <div
      v-if="isLoggedIn"
      class="horizontal"
      @click="displaySubmenu = !displaySubmenu"
    >
      <overlay :rounded="true" :selected="displaySubmenu">
        <avatar :src="user.photo.url" :username="user.name"></avatar>
      </overlay>
    </div>
    <div v-else>
      <nuxt-link to="/login">
        <h5>Login</h5>
      </nuxt-link>
    </div>
    <slide-down-transition>
      <div v-show="displaySubmenu" class="submenu">
        <div class="vertical">
          <h5>{{ user.name }}</h5>
          <small>artista</small>
        </div>
        <div class="horizontal middle">
          <nuxt-link v-if="isArtist" to="/artist/products">
            <h6>Produtos</h6>
          </nuxt-link>
          <nuxt-link :to="`/${isArtist ? 'artist' : 'contractor'}/profile`">
            <h6>Perfil</h6>
          </nuxt-link>
          <nuxt-link to="/logout">
            <h6>Sair</h6>
          </nuxt-link>
        </div>
      </div>
    </slide-down-transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      displaySubmenu: false
    }
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters('auth', ['isLoggedIn', 'isArtist'])
  }
}
</script>

<style lang="scss" scoped>
.menu {
  @extend .vertical, .middle;
  margin-right: 2 * $space;
  width: 100%;
  align-items: flex-end;
}

h6 {
  font-weight: $bold;
}

.submenu {
  @extend .horizontal, .middle, .full-width;
  border-top: 1px solid $layer5;
  margin-top: 2 * $space;
  padding: 2 * $space;
  position: relative;
  height: 10vh;
  align-items: end;
  justify-content: space-between;

  h6 {
    margin-left: 5 * $space;
  }
}
</style>
