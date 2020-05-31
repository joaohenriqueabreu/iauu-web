<template>
  <div>
    <client-only>
      <div class="mx-0 row">
        <form-input
          v-model="term"
          class="col-sm-4"
          placeholder="Aniversário, Casamento, Rock Anos 80, ..."
        ></form-input>
        <form-location v-model="location" class="col-sm-3" placeholder="Próximo de"></form-location>
        <form-range v-model="price" filter-name="currency" class="col-sm-3"></form-range>
        <form-select
          :allow-input="false"
          class="col-sm-2"
          icon-helper="sort-alpha-down"
          placeholder="Ordenar por"
          :options="['Relevância', 'Núm de Apresentações', 'Avaliação']"
        ></form-select>
      </div>
    </client-only>
    <div class="full-width px-4">
      <hr />
    </div>
    <div class="px-4 py-2">
      <h4 v-if="!$utils.empty(term)">Resultados para "{{ term }}"</h4>
      <h4 v-else>Artistas encontrados</h4>
    </div>
    <div class="search-results">
      <div v-for="(artist, index) in artists" :key="index" class="px-4 mb-4">
        <artist-info :artist="artist" @select="selectedArtist"></artist-info>
      </div>
    </div>
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
