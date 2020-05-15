<template>
  <div class="vertical center middle">
    <h6 class="mb-4">Conecte suas redes sociais</h6>
    <div class="raised horizontal center middle">
      <div class="icon-box">
        <font-awesome
          :class="{ active: hasSpotify }"
          :icon="['fab', 'spotify']"
          @click="link('spotify')"
        ></font-awesome>
      </div>
      <div class="icon-box">
        <font-awesome
          :class="{ active: hasFacebook }"
          :icon="['fab', 'facebook']"
          @click="link('facebook')"
        ></font-awesome>
      </div>
      <div class="icon-box">
        <font-awesome
          :class="{ active: hasInstagram }"
          :icon="['fab', 'instagram']"
          @click="link('instagram')"
        ></font-awesome>
      </div>
      <div class="icon-box">
        <font-awesome
          :class="{ active: hasYoutube }"
          :icon="['fab', 'youtube']"
          @click="link('youtube')"
        ></font-awesome>
      </div>
    </div>
    <modal ref="social" height="tiny">
      <template v-slot:main>
        <div class="full-fill vertical middle center p5">
          <h6>
            <font-awesome icon="exclamation"></font-awesome>
            Lembre-se de deixar suas redes públicas!
          </h6>
          <div class="mb-4"></div>
          <form-input
            v-model="url"
            class="half-width"
            :label="network"
            placeholder="Cole aqui o endereço de sua conta"
          ></form-input>
        </div>
      </template>
      <template v-slot:footer>
        <div class="half-width">
          <submit-button @submit="save">Conectar</submit-button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spotify: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      facebook: { type: String, default: '' },
      network: { type: String, default: '' },
      url: { type: String, default: '' }
    }
  },
  computed: {
    hasSpotify() {
      return !this.$utils.isEmpty(this.spotify)
    },
    hasFacebook() {
      return !this.$utils.isEmpty(this.facebook.length)
    },
    hasInstagram() {
      return !this.$utils.isEmpty(this.instagram.length)
    },
    hasYoutube() {
      return !this.$utils.isEmpty(this.youtube.length)
    }
  },
  methods: {
    link(network) {
      this.network = network
      this.url = ''
      this.$refs.social.open()
    },
    save() {
      this[this.network] = this.url
      this.$emit('upload', this.network, this.url)
      this.$refs.social.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-box {
  @extend .horizontal, .middle, .center;
  margin: 0 5 * $space;

  [data-icon] {
    color: $layer5;
    font-size: 55px;
    font-weight: $bold;
    // box-shadow: $shadow;
    filter: drop-shadow($shadow);
    // border-radius: $rounded;
    transition: $transition;
    cursor: pointer;
    &:hover {
      transition: $transition;
      color: $brand;
    }
    &.active {
      transition: $transition;
      color: $brand;
    }
  }
}
</style>
