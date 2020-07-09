<template>
  <div>
    <client-only>
      <fade-transition>
        <div v-if="!selectingFilter" class="filters mx-5 d-flex justify-content-around">
          <font-awesome icon="search" @click="showSearchFilter"></font-awesome>
          <font-awesome icon="map-marker-alt" @click="showAddressFilter"></font-awesome>
          <font-awesome icon="dollar-sign" @click="showPriceFilter"></font-awesome>
          <font-awesome icon="sort-alpha-down" @click="showSortFilter"></font-awesome>
        </div>
        <div v-else class="mx-0 row">
          <form-input
            v-show="currentFilter === 'term'"
            v-model="term"
            class="col-sm-4"
            placeholder="Aniversário, Casamento, Rock Anos 80, ..."
          ></form-input>
          <form-location
            v-show="currentFilter === 'address'"
            v-model="location"
            class="col-sm-3"
            placeholder="Próximo de"
          ></form-location>
          <form-range
            v-show="currentFilter === 'price'"
            v-model="price"
            filter-name="currency"
            class="col-sm-3"
          ></form-range>
          <form-select
            v-show="currentFilter === 'sort'"
            :allow-input="false"
            class="col-sm-2"
            icon="sort-alpha-down"
            placeholder="Ordenar por"
            :options="['Relevância', 'Núm de Apresentações', 'Avaliação']"
          ></form-select>
        </div>
      </fade-transition>
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
      price: 0,
      selectingFilter: false,
      currentFilter: ''
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
    ...mapActions('contractor', ['loadArtist']),
    selectedArtist(artist) {
      // await this.loadArtist(artist.slug)
      this.$router.push(`/search/artists/${artist.slug}`)
    },
    showSearchFilter() {
      this.selectingFilter = true
      this.currentFilter = 'term'
    },
    showAddressFilter() {
      this.selectingFilter = true
      this.currentFilter = 'address'
    },
    showPriceFilter() {
      this.selectingFilter = true
      this.currentFilter = 'price'
    },
    showSortFilter() {
      this.selectingFilter = true
      this.currentFilter = 'sort'
    }
  }
}
</script>

<style lang="scss" scoped>
.search-results {
  height: 65vh;
}

.filters {
  [data-icon] {
    cursor: pointer;
    background: $layer4;
    height: 30px;
    width: 30px;
    border-radius: $rounded;
    box-shadow: $shadow;
    color: $brand;
    padding: 5px;
    margin-right: 4 * $space;
    transition: $transition;

    &:hover {
      transition: $transition;
      color: $brandLayer;
    }
  }
}
</style>
