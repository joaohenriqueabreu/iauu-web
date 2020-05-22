<template>
  <div>
    <div class="mx-0 row">
      <form-input v-model="term" class="col-sm-4" placeholder="Aniversário, Casamento"></form-input>
      <form-location v-model="location" class="col-sm-3" placeholder="Próximo de"></form-location>
      <form-range v-model="price" filter-name="currency" class="col-sm-3"></form-range>
      <form-select
        :allow-input="false"
        class="col-sm-2"
        icon-helper="sort-alpha-down"
        placeholder="Ordenar por"
      ></form-select>
    </div>
    <div class="full-width px-4">
      <hr />
    </div>
    <div class="p-4">
      <h4 v-if="!$utils.isEmpty(term)">Resultados para "{{ term }}"</h4>
      <h4 v-else>Artistas encontrados</h4>
    </div>
    <perfect-scrollbar>
      <div class="search-results">
        <div v-for="(artist, index) in artists" :key="index" class="px-4 mb-4">
          <artist-info :artist="artist" @select="selectedArtist"></artist-info>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchResult from '@/components/artist/profile/searchResult'
export default {
  components: {
    'artist-info': SearchResult
  },
  async asyncData({ store, app }) {
    await store.dispatch('contractor/searchArtists', store.state.app.searchFilters)
  },
  data() {
    return {
      term: '',
      location: '',
      price: 0
    }
  },
  computed: {
    ...mapState({ searchFilters: (state) => state.app.searchFilters }),
    ...mapState({ artists: (state) => state.contractor.artists })
  },
  mounted() {
    this.term = this.searchFilters.term
    this.location = this.searchFilters.location
    this.price = this.searchFilters.price
  },
  methods: {
    ...mapActions('contractor', ['selectArtist']),
    selectedArtist(artist) {
      this.selectArtist(artist.id)
      this.$router.push(`/search/artists/${artist.slug}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-results {
  height: 65vh;
}
</style>
