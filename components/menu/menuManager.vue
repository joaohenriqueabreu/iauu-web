<template>
  <div class="menu">
    <client-only>
      <transition name="fade">
        <div v-if="$auth.loggedIn && displaySubmenu" class="submenu">
          <div>
            <nuxt-link :to="`/${$auth.hasScope('artist') ? 'artist' : 'contractor'}/schedule`">
              <h5>{{ $auth.user.name }}</h5>
            </nuxt-link>
          </div>
          <div class="pr-4 mr-5 menu-items">
            <nuxt-link v-if="$auth.hasScope('artist')" to="/artist/incorporate">
              <h6>Atalho para shows</h6>
            </nuxt-link>
            <nuxt-link v-if="$auth.hasScope('artist')" to="/artist/products">
              <h6>Produtos</h6>
            </nuxt-link>
            <nuxt-link :to="`/${$auth.hasScope('artist') ? 'artist' : 'contractor'}/profile`">
              <h6>Perfil</h6>
            </nuxt-link>
            <nuxt-link to="/logout">
              <h6>Sair</h6>
            </nuxt-link>
            <div class="clickable position-absolute top-right pr-4">
              <font-awesome icon="times" @click="displaySubmenu = false"></font-awesome>
            </div>
          </div>
        </div>
        <div v-else class="mainmenu vertical">
          <div v-if="$auth.loggedIn" class="horizontal mt-2" @click="displaySubmenu = true">
            <overlay :rounded="true" :selected="displaySubmenu">
              <avatar :src="$auth.user.photo.url" :username="$auth.user.name"></avatar>
            </overlay>
          </div>
          <div v-if="!$auth.loggedIn" key="guest" class="guest">
            <nuxt-link to="/register/whoareyou">
              <h5 class="mr-5">Cadastre-se</h5>
            </nuxt-link>
            <nuxt-link to="/login">
              <h5>Login</h5>
            </nuxt-link>
          </div>
        </div>
        <!-- </fade-transition> -->
        <!-- <fade-transition> -->
      </transition>
      <initial-setup-manager
        v-if="isAppRoute && $auth.loggedIn && $auth.user.requires_initial_setup"
        class="full-width my-3"
      ></initial-setup-manager>
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
  position: absolute;
  top: 0;
  right: 0;
  align-items: flex-end;
  @include desktop {
    max-height: 10vh;
  }
}

h6 {
  font-weight: $bold;
  margin-bottom: 2 * $space;
}

.guest {
  @extend .horizontal, .middle;
  padding-right: 2 * $space;
  height: 10vh;
}

.submenu {
  @include mobile {
    height: 20vh;
  }
  width: 100vw;
  background: $layer1;
  padding: 2 * $space;
  position: relative;
  height: 10vh;
  align-items: flex-end;
  justify-content: space-between;

  transition: $transition;

  h6 {
    margin-left: 5 * $space;
  }

  .menu-items {
    justify-content: flex-end;
    align-items: flex-end;
    @include desktop {
      display: flex;
      flex-direction: row;
    }

    @include mobile {
      display: flex;
      flex-direction: column;
    }
  }
}

.mainmenu {
  transition: $transition;
  padding-right: 4 * $space;
}
</style>
