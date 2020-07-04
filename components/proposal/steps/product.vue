<template>
  <div>
    <div class="mb-5 vertical">
      <h6 class="mb-2">Escolha o produto do artista que você deseja contratar</h6>
      <u class="custom-product" @click="openCustomProductModal">Ou então clique aqui e escolha o que deseja incluir na apresentação</u>
    </div>
    <carousel class="full-height" :per-page="3">
      <slide v-for="(product, index) in products" :key="index" class="col-sm-4">
        <product-info :product="product" :not-items="notItems(product.items)" proposal-view></product-info>
      </slide>
    </carousel>
    <modal ref="custom" height="small">
      <template v-slot:header>
        <h4>Customize sua apresentação</h4>
      </template>
      <template v-slot:main>
        <h6 class="mb-2">Escolha os itens que deseja incluir em sua apresentação</h6>
        <p class="mb-5">O artista irá retornar brevemente com o valor final da apresentação</p>
        <div class="vertical">
          <div v-for="(item, index) in allItems" :key="index" class="mb-3">
            <div class="horizontal ">
              <font-awesome icon="check" class="mr-5"></font-awesome>
              <h6 class="mb-2">{{ item }}</h6>
            </div>
            <hr/>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="vertical center middle">
          <form-button class="mb-2 half-width">Selecionar</form-button>
          <span class="clickable text-center">Escolher outro formato</span>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Step from '@/components/proposal/steps/step'
import ProductInfo from '@/components/artist/product/info'
import Product from '@/models/product'
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
    chooseProduct() {
      this.editProposal({ prop: 'product', value: this.selectedProduct })
      this.$emit('complete')
      this.$emit('next')
    },
    notItems(productItems) {
      return this.$array.difference(this.allItems, productItems)
    },
    openCustomProductModal() {
      this.$refs.custom.open()
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

// /deep/ .product {
// Change child component
//   background: none;
//   box-shadow: none;
//   border-radius: none;
// }
</style>
