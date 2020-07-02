<template>
  <div>
    <div class="horizontal middle d-flex justify-content-between mb-5">
      <h5 class="mr-2">Formatos</h5>
    </div>
    <div>
      <div class="horizontal center middle justify-content-between mb-3">
        <div class="clickable horizontal middle full-height middle" @click="openProductForm">
          <span class="mr-2">Adicione Produtos</span>
          <font-awesome icon="plus"></font-awesome>
        </div>
        <div>
          <form-button>Salvar</form-button>
        </div>
      </div>
      <product-item-table
        :products="products"
        @edit-product="openProductForm(product)"
      ></product-item-table>
      <div class="clickable horizontal middle" @click="openItemForm">
        <span class="mr-2">Adicione itens</span>
        <font-awesome icon="plus"></font-awesome>
      </div>
    </div>
    <remove-product ref="removeProductDialog"></remove-product>
    <product-form ref="productForm" @save="saveProduct"></product-form>
    <item-form ref="productItem" @save="saveItem"></item-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ProductForm from '@/components/artist/product/form'
import ItemForm from '@/components/artist/product/item'
import ProductItemTable from '@/components/artist/product/table'
import RemoveProduct from '@/components/artist/product/remove'
export default {
  components: {
    'product-form': ProductForm,
    'item-form': ItemForm,
    'product-item-table': ProductItemTable,
    'remove-product': RemoveProduct
  },
  async asyncData({ store, app }) {
    await store.dispatch('artist/loadProducts')

    return {
      products: store.state.artist.products
    }
  },
  mounted() {
    const items = []
    this.products.forEach((product) => items.push(product.items))
    this.productItems = this.$array.uniq(this.$array.flatten(items))
  },
  methods: {
    ...mapActions('artist', ['loadProducts', 'saveProduct', 'addItemToProduct']),
    openProductForm(product) {
      this.$refs.productForm.openModal(product)
    },
    openItemForm(item) {
      this.$refs.productItem.openModal()
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
table {
  td {
    max-width: 20vw;
  }
}

.small {
  font-size: $small;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: nowrap;
}

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
