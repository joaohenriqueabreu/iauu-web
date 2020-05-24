<template>
  <div>
    <div class="section main"></div>
    <div class="section search">
      <h1>Supimpe seu evento</h1>
      <div class="half-width vertical middle center">
        <form-input
          v-model="term"
          class="funny"
          :placeholder="placeholder"
          @enter="search"
        ></form-input>
        <nuxt-link ref="searchLink" :to="searchUrl">Vamos lá!</nuxt-link>
      </div>
    </div>
    <div class="section even">
      <h1>Todo mundo faz iauu</h1>
    </div>
    <div class="section odd">
      <h1>Por que iauu?</h1>
    </div>
    <div class="section even">
      <h1>Queridinhos da galera</h1>
    </div>
    <div class="section odd">
      <h1>Veja como é facil</h1>
    </div>
    <div class="section even">
      <h1 class="mb-4">Contrate sua banda agora</h1>
      <nuxt-link to="/search">Vamos lá!</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      placeholderInterval: null,
      content: [
        'Qual o nome daquela banda que começa com J?',
        'Quero uma banda de forro porreta',
        'Rock das antigas',
        'Um standup bem engraçado'
      ],
      placeholder: '',
      term: ''
    }
  },
  computed: {
    searchUrl() {
      // return `/search?q=${encodeURI(this.term)}`
      return 'search'
    }
  },
  watch: {
    term() {
      clearInterval(this.placeholderInterval)
      this.placeholder = 'Encontre os melhores artistas para seu evento'
    }
  },
  mounted() {
    let length = 5
    let index = 0
    let hold = 10
    const self = this
    self.placeholderInterval = setInterval(() => {
      length++
      // reached end of phrase
      if (length >= self.content[index].length) {
        // hold a bit so user can read phrase
        if (hold === 0) {
          // reset length
          hold = 10
          length = 5
          if (index === 3) {
            index = 0
          } else {
            index++
          }
        } else {
          hold--
        }
      }
      self.placeholder = self.content[index].substring(0, length)
    }, 100)
  },
  methods: {
    ...mapActions('app', ['setSearchFilters']),
    search() {
      this.setSearchFilters({ term: this.term })
      this.$router.push(this.searchUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 100vh;
  z-index: $base;

  &.main {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('~assets/imgs/home.jpg?webp');
    height: 110vh;
    width: 100%;
    opacity: 0.2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: $base;
  }

  &.search {
    @extend .vertical, .middle, .center;
    position: relative;
    z-index: $above;
  }

  &.even {
    @extend .vertical, .middle, .center;
    background: linear-gradient(180deg, $layer3 33%, $layer2 66%, $layer1 100%);
  }

  &.odd {
    @extend .vertical, .middle, .center;
    background: linear-gradient(180deg, $layer1 33%, $layer2 66%, $layer3 100%);
  }

  .funny {
    min-width: 35vw;
    margin-right: 2 * $space;
  }

  a {
    font-size: $huge;
    box-shadow: $shadow;
    padding: 2 * $space 4 * $space;
    border-radius: $rounded;
    border: 4px solid $brand;
    background: transparent;
    transition: $transition;
    &:hover {
      transition: $transition;
      background: $brand;
      color: $layer1;
    }
  }
}
</style>
