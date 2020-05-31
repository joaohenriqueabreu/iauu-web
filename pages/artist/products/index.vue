<template>
  <div>
    <div class="horizontal middle d-flex justify-content-between mb-5">
      <h5 class="mr-2">Produtos</h5>
      <div class="add">
        <button @click="openProductForm">
          <font-awesome icon="music"></font-awesome>
          Adicionar Produto
        </button>
      </div>
    </div>
    <div v-if="!$utils.empty(products)" class="row">
      <div v-for="(product, prodIndex) in products" :key="prodIndex" class="col-sm-6 mb-4">
        <product-info
          :product="product"
          :read-only="false"
          @remove="openConfirmRemove"
          @edit="openProductForm"
        ></product-info>
      </div>
    </div>
    <div v-else class="horizontal middle">
      <h6>Nenhum produto cadastrado ainda</h6>
    </div>
    <remove-product ref="removeProductDialog"></remove-product>
    <product-form ref="productForm" @save="saveProduct"></product-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ProductForm from '@/components/artist/product/form'
import ProductInfo from '@/components/artist/product/info'
import RemoveProduct from '@/components/artist/product/remove'
export default {
  components: {
    'product-info': ProductInfo,
    'product-form': ProductForm,
    'remove-product': RemoveProduct
  },
  async asyncData({ store, app }) {
    await store.dispatch('artist/loadProducts', app.$auth.user.id)

    return {
      products: store.state.artist.products
    }
  },
  methods: {
    ...mapActions('artist', ['loadProducts', 'saveProduct']),
    openProductForm(product) {
      this.$refs.productForm.openModal(product)
    },
    openConfirmRemove(productId) {
      this.$refs.removeProductDialog.openModal(productId)
    },
    async remove(productId) {
      await this.removeProduct(productId)
      this.$nextTick(function() {
        this.$refs.confirm.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  @extend .horizontal, .center, .middle;
  outline: none;
  min-width: 5vh;
  background: $layer3;
  transition: $transition;
  padding: 2 * $space;
  border-radius: $rounded;
  border: none;
  font-weight: $bold;
  box-shadow: $shadow;
  color: $brand;

  &:hover {
    transition: $transition;
    background: $brand;
    color: $layer3;
  }
}

.description {
  max-height: 100px;
  position: relative;
}

.documents {
  @extend .vertical, .middle, .full-width;
  position: relative;
  padding: 2 * $space;
}

.new-product-form {
  max-height: 50vh;
}
</style>
