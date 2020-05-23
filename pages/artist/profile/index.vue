<template>
  <div>
    <form>
      <image-uploader ref="bgUploader" @uploaded="setBackground">
        <header :style="{ 'background-image': `url(${form.backgroundUrl})` }" @click="uploadBG">
          <input v-model="form.backgroundUrl" type="hidden" />
        </header>
      </image-uploader>
      <main>
        <div class="logo">
          <image-uploader ref="avatarUploader" :rounded="true" @uploaded="setAvatar">
            <avatar :src="form.avatarUrl" :size="150" @click="uploadAvatar"></avatar>
            <input v-model="form.avatarUrl" type="hidden" />
          </image-uploader>
        </div>
        <div class="pt-5"></div>
        <div class="boxed">
          <ul class="nav nav-tabs mt-4">
            <li class="nav-link first">
              <a class="nav-link" :class="{ active: statsTab }" @click="activeTab = 'stats'"
                >Stats</a
              >
            </li>
            <li class="nav-link">
              <a class="nav-link" :class="{ active: infoTab }" @click="activeTab = 'info'"
                >Informações</a
              >
            </li>
            <li class="nav-link">
              <a class="nav-link" :class="{ active: socialTab }" @click="activeTab = 'social'"
                >Redes Sociais</a
              >
            </li>
            <li class="nav-link">
              <a
                class="nav-link"
                :class="{ active: categoriesTab }"
                @click="activeTab = 'categories'"
                >Categorias</a
              >
            </li>
          </ul>
          <div class="mb-5 raised vertical middle" :class="{ first: statsTab }">
            <fade-transition mode="out-in">
              <profile-stats v-show="statsTab" key="stats"></profile-stats>
            </fade-transition>
            <fade-transition mode="out-in">
              <artist-info v-show="infoTab" ref="info" key="artist"></artist-info>
            </fade-transition>
            <fade-transition mode="out-in">
              <social-networks v-show="socialTab" ref="social" key="social"></social-networks>
            </fade-transition>
            <fade-transition mode="out-in">
              <artist-categories
                v-show="categoriesTab"
                key="categories"
                :categories="categories"
              ></artist-categories>
            </fade-transition>
          </div>
        </div>
      </main>
      <footer>
        <div class="half-width">
          <submit-button>Salvar</submit-button>
        </div>
      </footer>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SocialNetworks from '@/components/artist/profile/socialNetworks'
import ArtistInfo from '@/components/artist/profile/info'
import ArtistCategories from '@/components/artist/profile/categories'
import ProfileStats from '@/components/artist/profile/stats'
export default {
  components: {
    'social-networks': SocialNetworks,
    'artist-info': ArtistInfo,
    'artist-categories': ArtistCategories,
    'profile-stats': ProfileStats
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('categories')
    return { categories: data }
  },
  data() {
    return {
      activeTab: { type: String, default: 'stats' },
      form: {
        backgroundUrl: { type: String, default: '' },
        avatarUrl: { type: String, default: '' },
        social: { type: Object, default: () => {} },
        category: { type: Object, default: () => {} },
        info: { type: Object, default: () => {} }
      }
    }
  },
  computed: {
    statsTab() {
      return this.activeTab === 'stats'
    },
    infoTab() {
      return this.activeTab === 'info'
    },
    socialTab() {
      return this.activeTab === 'social'
    },
    categoriesTab() {
      return this.activeTab === 'categories'
    }
  },
  created() {
    // TODO grab from user store
    this.form.backgroundUrl = this.$config.defaultBGImgUrl
    this.form.avatarUrl = this.$config.defaultAvatarImgUrl
    this.activeTab = 'stats'
  },
  methods: {
    ...mapActions('app', ['showMessage']),

    uploadBG() {
      this.$refs.bgUploader.upload()
    },
    uploadAvatar() {
      this.$refs.avatarUploader.upload()
    },
    setBackground({ url }) {
      this.form.backgroundUrl = url
    },
    setAvatar({ url }) {
      this.form.avatarUrl = url
    },
    categorySelect(category) {
      alert(category)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  header {
    height: 30vh;
    background-size: cover;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  main {
    min-height: 70vh;
    position: relative;
    margin-bottom: 5 * $space;
    .logo {
      position: absolute;
      top: -75px;
      left: 40%;
      z-index: $above;
    }

    .boxed {
      @extend .vertical, .middle;
      background: $layer3;
      box-shadow: $shadow;
      border-radius: $edges;
      padding: 5 * $space;

      .raised {
        transition: $transition;
        background: $layer4;
        padding: 4 * $space;
        box-shadow: $shadow;
        width: 100%;
        border-radius: $edges;
        min-height: 50vh;

        &.first {
          border-radius: 0 $edges $edges $edges;
        }
      }
    }

    .vue-avatar--wrapper {
      box-shadow: $shadow;
    }
  }

  footer {
    height: 10vh;
    position: relative;
  }

  // Overwrite bootstrap styling
  .nav-tabs {
    border-bottom: none;
    z-index: $moveToTop;
    .nav-link {
      padding-bottom: 0;
      border: none;
      border-top-left-radius: $edges;
      border-top-right-radius: $edges;
      cursor: pointer;
      transition: $transition;

      &.first {
        padding-left: 0;
        padding-right: 0;
      }

      &.active {
        background: $layer4;
        border: none;
        color: $brand;
        box-shadow: 0 -19px 19px 2px rgba(0, 0, 0, 0.1);
      }

      &:hover {
        transition: $transition;
        color: $layer5;
      }
      a {
        padding-bottom: 2 * $space;
      }
    }
  }
}
</style>
