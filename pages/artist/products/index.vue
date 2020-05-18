<template>
  <div>
    <div class="horizontal middle d-flex justify-content-between mb-5">
      <h5 class="mr-2">Produtos</h5>
      <div class="add">
        <button @click="openProductForm()">
          <font-awesome icon="music"></font-awesome>
          Adicionar Produto
        </button>
      </div>
    </div>
    <div v-if="!$utils.isEmpty(products)" class="row">
      <div
        v-for="(product, prodIndex) in products"
        :key="prodIndex"
        class="col-sm-6 mb-4"
      >
        <div class="product">
          <header @click="openConfirmRemove(product.id)">
            <font-awesome icon="times"></font-awesome>
          </header>
          <main>
            <div class="title" @click="openProductForm(product)">
              <h6 class="mb-0">{{ product.name }}</h6>
              <font-awesome icon="edit" class="ml-4"></font-awesome>
            </div>

            <div class="horizontal middle">
              <span class="mr-4">
                <font-awesome icon="dollar-sign" class="mr-1"></font-awesome>
                {{ product.price }}
              </span>
              <span>
                <font-awesome icon="clock" class="mr-1"></font-awesome>
                {{ product.duration }} horas
              </span>
            </div>
            <hr />
            <perfect-scrollbar class="mb-4">
              <div class="description">
                {{ product.description }}
              </div>
            </perfect-scrollbar>
            <div v-if="!$utils.isEmpty(product.documents)">
              <h6>Documentos</h6>
              <hr />
              <perfect-scrollbar>
                <div class="documents">
                  <attachment
                    v-for="(document, docIndex) in product.documents"
                    :key="docIndex"
                    :file="document"
                  ></attachment>
                </div>
              </perfect-scrollbar>
            </div>
            <div class="mb-4"></div>
            <div v-if="!$utils.isEmpty(product.medias)">
              <h6>Mídias</h6>
              <hr />
              <perfect-scrollbar>
                <div class="vertical">
                  <media-thumbnail
                    v-for="(media, mediaIndex) in product.medias"
                    :key="mediaIndex"
                    :media="media"
                  ></media-thumbnail>
                </div>
              </perfect-scrollbar>
            </div>
          </main>
        </div>
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
import { mapState, mapActions } from 'vuex'
import Attachment from '@/components/form/attachment'
import ProductForm from '@/components/artist/product/form'
import RemoveProduct from '@/components/artist/product/remove'
export default {
  components: {
    attachment: Attachment,
    'product-form': ProductForm,
    'remove-product': RemoveProduct
  },
  // async asyncData({ store }) {
  //   await store.dispatch('artist/loadProducts')
  // },
  computed: {
    ...mapState({ products: (state) => state.artist.products })
  },
  async mounted() {
    await this.loadProducts()
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

.product {
  width: 100%;
  background: $layer3;
  border-radius: $edges;
  box-shadow: $shadow;
  padding: 4 * $space;
  height: 100%;
  position: relative;

  main {
    background: none;

    .title {
      @extend .horizontal, .middle, .full-width, .clickable;
      margin-bottom: 2 * $space;
      transition: $transition;
      color: $brand;

      [data-icon] {
        font-size: $small;
      }

      &:hover {
        transition: $transition;
        color: $layer5;
      }
    }
  }

  header {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;

    [data-icon] {
      transition: $transition;
      &:hover {
        transition: $transition;
        color: $layer5;
      }
    }
  }
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
