<template>
  <div>
    <header>
      <nuxt-link :to="scheduleLink">
        <logo :height="50" :width="50"></logo>
        <h6>iauu</h6>
      </nuxt-link>
    </header>
    <main>
      <nuxt-link :to="scheduleLink">
        <font-awesome icon="calendar-alt"></font-awesome>
        <h6>Agenda</h6>
      </nuxt-link>
      <nuxt-link :to="scheduleLink">
        <font-awesome icon="music"></font-awesome>
        <h6>Apresentações</h6>
      </nuxt-link>
      <nuxt-link :to="scheduleLink">
        <font-awesome icon="search-dollar"></font-awesome>
        <h6>Propostas</h6>
      </nuxt-link>
    </main>
    <footer>
      <hr />
      <nuxt-link :to="scheduleLink">
        <font-awesome icon="user"></font-awesome>
        <h6>Perfil</h6>
      </nuxt-link>
      <nuxt-link to="/logout">
        <font-awesome icon="times"></font-awesome>
        <h6>Sair</h6>
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/layout/logo'
export default {
  components: {
    logo: Logo
  },
  computed: {
    ...mapGetters('auth', ['isArtist']),
    scheduleLink() {
      return this.isArtist ? '/artist' : '/contractor'
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  padding: 0 10px;
}

.logo {
  margin-left: 0;
  margin-right: 2 * $space;
}

[data-icon] {
  color: $brand;
  font-size: $huge;
}

main {
  background: none !important; // override main.scss
  box-shadow: none !important; // override main.scss
}

@include desktop {
  div {
    display: flex;
    flex-direction: column;
  }
  header {
    padding-top: 20px;
    height: 20vh;
  }

  main {
    height: 70vh;
  }

  footer {
    height: 10vh;
  }

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 7 * $space;
  }
}

@include mobile {
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  a {
    margin-right: 4 * $space;
  }

  h6,
  hr {
    display: none;
  }
}
</style>
