<template>
  <div>
    <div :style="{ 'background-image': `url(${bgImage})` }" class="bg"></div>
    <div class="title">
      <avatar :src="artist.photo" :username="artist.company_name" :size="200"></avatar>
      <h1>{{ artist.company_name || artist.name }}</h1>
    </div>
    <div class="horizontal center middle mb-4">
      <font-awesome icon="music"></font-awesome>
      <h3>{{ artist.category }}</h3>
    </div>
    <div v-if="!$utils.isEmpty(artist.subcategories)" class="horizontal center middle mb-4">
      <div v-for="(subcategory, index) in artist.subcategories" :key="index" class="badge">
        <h6 class="mb-0">{{ subcategory }}</h6>
      </div>
    </div>
    <perfect-scrollbar>
      <div class="horizontal center middle half-width mb-5">
        <div v-for="(media, mediaIndex) in artist.medias" :key="mediaIndex" class="mx-4">
          <a :href="media.url" target="_blank">
            <media-thumbnail :media="media" avatar></media-thumbnail>
          </a>
        </div>
      </div>
    </perfect-scrollbar>
    <div class="horizontal center middle mb-5">
      <div v-for="(stat, statName) in artist.stats" :key="statName" class="stats">
        <div class="horizontal d-flex align-items-end mb-3">
          <h2 v-if="statName === 'score'" class="mr-2 mb-0">{{ stat | number('0.0') }}</h2>
          <h2 v-else class="mr-2 mb-0">{{ stat | number('0,0') }}</h2>
          <h6><font-awesome :icon="$dictionary.artist.stats.icon[statName]"></font-awesome></h6>
        </div>
        <div class="horizontal">
          <h5 v-if="statName === 'score'" class="mr-1">{{ artist.rating.amount }}</h5>
          <h5>{{ $dictionary.artist.stats.label[statName] }}</h5>
        </div>
      </div>
    </div>
    <div class="story">
      {{ artist.story }}
    </div>
    <div class="my-5 half-width">
      <submit-button>
        Enviar proposta
      </submit-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ store, route }) {
    await store.dispatch('contractor/loadArtist', route.params.slug)
  },
  computed: {
    ...mapState({ artist: (state) => state.contractor.artist }),
    bgImage() {
      return require('@/assets/imgs/concert.png?webp')
    },
    stats() {
      const stats = this.$object.clone(this.artist.stats)
      stats[`${this.artist.rating.amount} avaliações`] = this.artist.rating.rate
      return stats
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  height: 60vh;
  position: absolute;
  top: -10vh; // to place on header
  left: 0;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: $base;
  opacity: 0.5;
}

div:not(.bg) {
  z-index: $above;
}

.title {
  @extend .vertical, .middle, .center;
  position: relative;
  margin-bottom: 4 * $space;
}

.badge {
  background: $layer3;
  padding: $space 2 * $space;
  border-radius: $rounded;
  margin: 0 2 * $space;
}

.stats {
  @extend .vertical, .middle, .center;
  width: 150px;
  height: 150px;
  border-radius: $rounded;
  background: $layer3;
  margin: 0 4 * $space;
  box-shadow: $shadow;
  border: 5px solid $brand;
}

.story {
  @extend .half-width;
  padding: 4 * $space;
  // background: $layer3;
  border-radius: $edges;
  box-shadow: $shadow;
  margin-bottom: 5 * $space;
}
</style>
