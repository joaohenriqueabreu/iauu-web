<template>
  <div>
    <header>
      <nuxt-link :to="scheduleLink" class="horizontal middle">
        <logo :height="50" :width="50"></logo>
        <h6>iauu</h6>
      </nuxt-link>
    </header>
    <main>
      <nuxt-link :to="scheduleLink" class="horizontal">
        <font-awesome icon="calendar"></font-awesome>
      </nuxt-link>
    </main>
    <footer>
      <hr />
      <nuxt-link to="/logout">
        Sair
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from '@/components/Logo'
export default {
  components: {
    logo
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

header {
  padding-top: 20px;
  height: 20vh;
}

main {
  height: 70vh;
  background: none !important; // override main.scss
  box-shadow: none !important; // override main.scss
}

footer {
  height: 10vh;
}
</style>
