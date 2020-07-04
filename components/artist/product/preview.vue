<template>
  <modal ref="modal" hide-header>
    <template v-slot:main>
      <div class="bg-image" :style="{ 'background-image': `url(${productPhoto})` }"></div>
      <carousel v-if="!$utils.empty(product.medias)" :per-page="2" :navigationEnabled="true" :paginationEnabled="false">
        <slide
          v-for="(media, index) in product.medias"
          :key="index"
          class="clickable media-preview"
          @slideclick="openMedia(media)"
        >
          <media-viewer :media="media"></media-viewer>
        </slide>
      </carousel>
      <div class="vertical middle center mb-4">
        <h2 class="mb-4">{{ product.name }}</h2>
        <p class="px-4">{{ product.description }}</p>
      </div>
      <div class="px-5 mb-4" v-if="!$utils.empty(product.items)">
        <h5>O que está incluido neste formato?</h5>
        <div v-for="(item, index) in product.items" :key="index">
          <hr />
          <span>
            <font-awesome icon="check" class="mr-2"></font-awesome>
            {{ item }}
          </span>
        </div>
      </div>
      <div class="px-5" v-if="!$utils.empty(notItems)">
        <h5 class="mb-2">O que não está incluido neste formato?</h5>
        <small>Oferecemos estes itens em outros produtos. Selecione um formato mais completo se desejar contratar.</small>
        <div v-for="(item, index) in notItems" :key="index" class="not-items">
          <hr />
          <span>
            <font-awesome icon="check" class="mr-2"></font-awesome>
            {{ item }}
          </span>
        </div>
      </div>
      <div class="mb-5">&nbsp;</div>
    </template>
    <template v-slot:footer>
      <div class="horizontal middle center my-4 d-flex justify-content-between">
        <div>
          <h4>{{ product.price | currency }}</h4>
        </div>
        <div>
          <h4 class="horizontal">
            <font-awesome icon="clock" class="mr-"></font-awesome>
            {{ product.duration }} horas
          </h4>
        </div>
        <div>
          <form-button @action="selectProduct">Selecionar</form-button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    product: { type: Object, default: () => {} },
    notItems: { type: Array, default: () => {} }
  },
  computed: {
    productPhoto() {
      return !this.$utils.empty(this.product.photo)
        ? this.product.photo
        : this.$config.defaultBGImgUrl
    }
  },
  methods: {
    openMedia(media) {
      window.open(media.url, '_blank')
    },
    openModal() {
      this.$refs.modal.open()
    },
    selectProduct() {
      this.$emit('selected', this.product)
      this.$refs.modal.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-size: cover;
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 30vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 2 * $space;
}

.media-preview {
  max-width: 25vw;
  margin-right: 2 * $space;
  margin-left: 2 * $space;
}

.not-items {
  color: $layer5;
}

/deep/ footer {
  background: $layer1;
}
</style>
