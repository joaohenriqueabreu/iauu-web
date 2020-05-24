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
    <div class="horizontal center middle half-width mb-5">
      <div v-for="(media, mediaIndex) in socialMedias" :key="mediaIndex" class="mx-2">
        <a :href="media.url" target="_blank">
          <media-thumbnail :media="media" avatar></media-thumbnail>
        </a>
      </div>
    </div>
    <div class="stats mb-5">
      <div v-for="(stat, statName) in artist.stats" :key="statName" class="stat">
        <div class="horizontal d-flex align-items-end mb-3">
          <h2 v-if="statName === 'score'" class="mr-2 mb-0">{{ stat | number('0.0') }}</h2>
          <h2 v-if="statName === 'fans' && stat >= 100000" class="mr-2 mb-0">
            {{ stat | number('0a') }}
          </h2>
          <h2 v-if="statName === 'fans' && stat < 100000" class="mr-2 mb-0">
            {{ stat | number('0,0') }}
          </h2>
          <h2 v-if="statName === 'presentations'" class="mr-2 mb-0">{{ stat | number('0,0') }}</h2>
          <h6><font-awesome :icon="$dictionary.artist.stats.icon[statName]"></font-awesome></h6>
        </div>
        <div class="horizontal">
          <h5 v-if="statName === 'score'" class="mr-1">{{ artist.rating.amount }}</h5>
          <h5>{{ $dictionary.artist.stats.label[statName] }}</h5>
        </div>
      </div>
    </div>
    <div class="story">
      <h4 class="mb-5">Nossa história</h4>
      {{ artist.story }}
    </div>
    <div class="mb-5 mx-5">
      <h4 class="mb-5">O que falam sobre nosso show?</h4>
      <div v-for="(testemonial, index) in artist.testemonials" :key="index" class="horizontal">
        <avatar :src="testemonial.photo" :size="50" class="mr-1"></avatar>
        <div class="testemonial">
          <h6>{{ testemonial.user }}</h6>
          <i>{{ testemonial.content }}</i>
        </div>
      </div>
    </div>
    <div class="proposal">
      <div class="row">
        <div class="vertical col-sm-4 col-6">
          <small class="hide-mobile">
            <span v-if="$auth.loggedIn">Valor da apresentação</span>
            <span v-else>Valor aproximado da apresentação</span>
          </small>
          <h4 v-if="$auth.loggedIn">{{ artist.rate | currency }}</h4>
          <h4 v-else>{{ rateMin | currency }} - {{ rateMax | currency }}</h4>
          <div class="mb-4 hide-desktop"></div>
        </div>
        <div class="vertical col-sm-4 col-6">
          <small>
            <span class="hide-mobile">Duração média</span>
          </small>
          <h4><font-awesome icon="clock" class="mr-2"></font-awesome>{{ avgDuration }} horas</h4>
        </div>
        <div class="col-sm-4 col-12 horizontal middle center">
          <submit-button v-if="$auth.loggedIn">
            Enviar proposta
          </submit-button>
          <div v-else>
            <h6 class="hide-mobile">Cadastre-se para contratar este artista</h6>
            <h6 class="hide-desktop">Cadastre-se</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="compensate">&nbsp;</div>
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
    socialMedias() {
      return this.$array.slice(this.artist.medias, 0, 4)
    },
    rateMin() {
      return Math.round(this.artist.rate * 0.5)
    },
    rateMax() {
      return Math.round(this.artist.rate * 1.5)
    },
    avgDuration() {
      return Math.round(this.$math.mean(this.$collection.map(this.artist.products, 'duration')))
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

@include desktop {
  .stats {
    display: flex;
    flex-direction: row;
    .stat {
      margin: 0 4 * $space;
    }
  }
}

@include mobile {
  .stats {
    display: flex;
    flex-direction: column;

    .stat {
      margin-bottom: 4 * $space;
    }
  }
}

.stats {
  justify-content: center;
  align-items: center;
  .stat {
    @extend .vertical, .middle, .center;
    width: 150px;
    height: 150px;
    border-radius: $rounded;
    background: $layer3;
    box-shadow: $shadow;
    border: 5px solid $brand;
  }
}

.story {
  padding: 4 * $space;
  // background: $layer3;
  border-radius: $edges;
  box-shadow: $shadow;
  margin: 5 * $space 4 * $space;
}

.testemonial {
  background: $layer3;
  margin: 2 * $space 0 2 * $space 4 * $space;
  padding: 3 * $space;
  box-shadow: $shadow;
  border-top-right-radius: $rounded;
  border-bottom-right-radius: $rounded;
  border-bottom-left-radius: $rounded;
  max-width: 80vw;
}

.proposal {
  // @extend .horizontal, .center, .middle, .full-width;
  @extend .full-width;
  padding: 2 * $space;
  position: fixed;
  bottom: 0;
  height: 15vh;
  background: $layer1;
}

.compensate {
  margin-bottom: 20vh; // compenstate fixed send proposal area
}
</style>
