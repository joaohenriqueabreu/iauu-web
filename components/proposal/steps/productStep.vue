<template>
  <div>
    <div class="mb-5">Escolha o produto do artista que você deseja contratar</div>
    <perfect-scrollbar>
      <div class="products-container">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="mr-2"
          @click="selectProduct(product)"
        >
          <product-info :product="product" class="product-container"></product-info>
        </div>
      </div>
    </perfect-scrollbar>
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
  methods: {
    ...mapActions('event', ['editProposal']),
    selectProduct(product) {
      this.editProposal({ prop: 'product', value: product })
      this.$emit('complete')
      this.$emit('next')
    }
  }
}
</script>

<style lang="scss" scoped>
.products-container {
  @include desktop {
    display: flex;
    flex-direction: row;
    width: 80vw;
    overflow-y: hidden;
  }

  @include mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .product-container {
    @include desktop {
      margin: 4 * $space;
      width: 33vw;
    }

    @include mobile {
      margin: 4 * $space $space;
    }

    cursor: pointer;
    box-shadow: none;
    transition: $transition;

    &:hover {
      transition: $transition;
      box-shadow: $shadow;
    }
  }
}

/deep/ main {
  // Change child component
  background: $layer3 !important;
}
</style>
