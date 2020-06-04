<template>
  <div>
    <div class="mb-5">Escolha o produto do artista que você deseja contratar</div>
    <div
      v-for="(product, index) in products"
      :key="index"
      class="row"
      @click="viewProduct(product)"
    >
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="product-container">
          <img
            v-if="!$utils.empty(product.main_media) && product.main_media.type === 'image'"
            :src="product.main_media.url"
          />
          <div
            v-if="!$utils.empty(product.main_media) && product.main_media.type === 'video'"
            class="video"
          >
            <iframe
              :src="product.main_media.url"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="vertical">
            <div class="vertical d-flex justify-content-start">
              <h4 class="mb-2">{{ product.name }}</h4>
              <rating :score="product.rating.score"></rating>
            </div>

            <h5>{{ product.price | currency }}</h5>
          </div>
        </div>
      </div>
    </div>
    <modal ref="modal">
      <template v-slot:main>
        <product-info :product="selectedProduct"></product-info>
      </template>
      <template v-slot:footer>
        <action-button class="half-width" @callback="chooseProduct">Escolher produto</action-button>
      </template>
    </modal>
    <modal ref="video"></modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Step from '@/components/proposal/steps/step'
import ProductInfo from '@/components/artist/product/info'
export default {
  components: {
    'product-info': ProductInfo
  },
  extends: Step,
  props: {
    products: { type: Array, default: () => {} }
  },
  data() {
    return {
      selectedProduct: null
    }
  },
  methods: {
    ...mapActions('contractor', ['editProposal']),
    viewProduct(product) {
      this.selectedProduct = product
      this.$refs.modal.open()
    },
    chooseProduct() {
      this.editProposal({ prop: 'product', value: this.selectedProduct })
      this.$emit('complete')
      this.$emit('next')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  @extend .horizontal;
  width: 100%;
  margin-bottom: 4 * $space;
  background: $layer4;
  img,
  .video {
    height: 100%;
    width: 50%;
    padding: 0;

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  div {
    position: relative;
    padding: 2 * $space;
    width: 100%;

    h5 {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 2 * $space;
    }
  }

  cursor: pointer;
  box-shadow: none;
  transition: $transition;

  &:hover {
    box-shadow: $shadow;
    transition: $transition;
  }
  // margin: 4 * $space;
}

.products-container {
  @include desktop {
    display: flex;
    flex-direction: row;
    // width: 80vw;
    overflow-y: hidden;
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

/deep/ .product {
  // Change child component
  background: none;
  box-shadow: none;
  border-radius: none;
}
</style>
