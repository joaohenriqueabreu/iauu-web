<template>
  <div :class="theme" class="app">
    <header>
      <nav>
        <h1>this is a header</h1>
      </nav>
    </header>
    <perfect-scrollbar>
      <main>
        <nuxt />
      </main>
      <footer>
        <h1>this is a footer</h1>
      </footer>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({ theme: (state) => state.layout.theme })
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
  max-height: 100vh;

  header {
    height: 10vh;
    position: relative;
    box-shadow: $shadow;
    z-index: $above;
    padding: 10px;
    nav {
    }
  }

  main {
    height: 90vh;
  }

  .ps {
    position: relative;
    max-height: 100vh;
  }

  footer {
    position: absolute;
    // bottom: 0  ;
    height: 10vh;
    width: 100%;
  }

  &.dark {
    background: $darkElevated;
    main {
      background: $darkBG;
    }
  }

  &.bright {
    background: $brightAlt;
    main {
      background: $brightBG;
    }
  }
}
</style>
