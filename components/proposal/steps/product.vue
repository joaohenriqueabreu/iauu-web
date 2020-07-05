<template>
  <div>
    <div class="mb-5 vertical">
      <h6 class="mb-2">Escolha o produto do artista que você deseja contratar</h6>
      <u class="custom-product" @click="openCustomProductModal">Ou então clique aqui e escolha o que deseja incluir na apresentação</u>
    </div>
    <carousel class="full-height" :per-page="3">
      <slide v-for="(product, index) in products" :key="index" class="col-sm-4">
        <product-info :product="product" :not-items="notItems(product.items)" @selected="chooseProduct(product)" proposal-view></product-info>
      </slide>
    </carousel>
    <custom-product :allItems="allItems" @selected="chooseProduct" ref="custom"></custom-product>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Step from '@/components/proposal/steps/step'
import ProductInfo from '@/components/artist/product/info'
import CustomProduct from '@/components/proposal/steps/customProduct'
import Product from '@/models/product'
export default {
  components: {
    'product-info': ProductInfo,
    'custom-product': CustomProduct
  },
  extends: Step,
  props: {
    products: { type: Array, default: () => {} }
  },
  data() {
    return {
      selectedProduct: null,
      customItems: []
    }
  },
  computed: {
    allItems() {
      const allItems = []
      this.products.forEach((product) => {
        allItems.push(product.items)
      })

      return this.$array.uniq(this.$array.flatten(allItems))
    }
  },
  methods: {
    ...mapActions('contractor', ['editProposal']),
    view(product) {
      this.selectedProduct = product
      this.$refs.modal.open()
    },
    chooseProduct(product) {
      this.editProposal({ prop: 'product', value: product })
      this.$emit('complete')
      this.$emit('next')
    },
    notItems(productItems) {
      return this.$array.difference(this.allItems, productItems)
    },
    openCustomProductModal() {
      this.$refs.custom.openModal()
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

.custom-product {
  @extend .clickable;
  transition: $transition;

  &:hover {
    transition: $transition;
    color: $brandLayer;
  }
}
</style>
