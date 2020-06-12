<template>
  <div class="menu">
    <client-only>
      <div v-if="$auth.loggedIn" class="horizontal" @click="displaySubmenu = !displaySubmenu">
        <overlay :rounded="true" :selected="displaySubmenu">
          <avatar :src="$auth.user.photo.url" :username="$auth.user.name"></avatar>
        </overlay>
      </div>
      <div v-else class="pr-4 horizontal">
        <nuxt-link to="/register/whoareyou">
          <h5 class="mr-5">Cadastre-se</h5>
        </nuxt-link>
        <nuxt-link to="/login">
          <h5>Login</h5>
        </nuxt-link>
      </div>
      <fade-transition mode="out-in">
        <div v-if="$auth.loggedIn" v-show="displaySubmenu" class="submenu">
          <div class="vertical">
            <h5>{{ $auth.user.name }}</h5>
            <small>{{ $auth.user.role[0] }}</small>
          </div>
          <div class="horizontal middle">
            <nuxt-link :to="`/${$auth.hasScope('artist') ? 'artist' : 'contractor'}/schedule`">
              <h6>Home</h6>
            </nuxt-link>
            <nuxt-link v-if="$auth.hasScope('artist')" to="/artist/incorporate">
              <h6>Atalho para shows</h6>
            </nuxt-link>
            <nuxt-link v-if="$auth.hasScope('artist')" to="/artist/products">
              <h6>Produtos</h6>
            </nuxt-link>
            <nuxt-link :to="`/${$auth.hasScope('artist') ? 'artist' : 'contractor'}/profile`">
              <h6>Perfil</h6>
            </nuxt-link>
            <h6 class="clickable" @click="$auth.logout('local')">Sair</h6>
          </div>
        </div>
      </fade-transition>
      <initial-setup-manager
        v-if="isAppRoute && $auth.loggedIn && $auth.user.requires_initial_setup"
        class="full-width my-3"
      >
      </initial-setup-manager>
    </client-only>
  </div>
</template>

<script>
import InitialSetupManager from '@/components/menu/initialSetupManager'
export default {
  components: {
    'initial-setup-manager': InitialSetupManager
  },
  data() {
    return {
      displaySubmenu: false
    }
  },
  computed: {
    isAppRoute() {
      const route = this.$route.path.split('/')
      return route.includes('artist') || route.includes('contractor') || route.includes('admin')
    }
  },
  watch: {
    $route(to, from) {
      this.displaySubmenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  @extend .vertical, .middle;
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
