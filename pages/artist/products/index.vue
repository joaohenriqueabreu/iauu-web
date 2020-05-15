<template>
  <div>
    <div class="horizontal middle d-flex justify-content-between mb-5">
      <h5 class="mr-2">Produtos</h5>
      <div class="add">
        <button @click="openNewProductModal">
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
          <header @click="openConfirm(product.id)">
            <font-awesome icon="times"></font-awesome>
          </header>
          <main>
            <h6>{{ product.name }}</h6>
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
    <modal ref="confirm" height="tiny">
      <template v-slot:main>
        <div class="vertical middle center p-4">
          <h6>Por favor leia essa informação antes de remover um produto</h6>
          <p class="mb-4">
            Ao remover ou alterar um produto apresentações confirmadas não
            sofrerão alterações (utilizando assim o mesmo produto). Caso seja de
            interesse de ambas as partes, favor cancelar a apresentação e
            renegociar com seu cliente os novos termos do produto
          </p>
          <div class="horizontal center middle">
            <submit-button class="mr-4" @submit="remove(selectedProductId)"
              >Ok, remover produto</submit-button
            >
            <span class="clickable" @click="$refs.confirm.close()"
              >Não remover</span
            >
          </div>
        </div>
      </template>
    </modal>
    <modal ref="addProduct">
      <template v-slot:header>
        <h4>Cadastre um novo produto</h4>
      </template>
      <template v-slot:main>
        <perfect-scrollbar>
          <div class="new-product-form vertical middle p-4">
            <form>
              <form-input v-model="newProduct.name" label="Título"></form-input>
              <form-input
                v-model="newProduct.description"
                label="Descrição"
                :rows="3"
              ></form-input>
              <div class="horizontal middle center">
                <form-input
                  v-model="newProduct.value"
                  class="mr-2"
                  label="Valor (R$)"
                ></form-input>
                <form-input
                  v-model="newProduct.duration"
                  label="Duração da apresentação"
                ></form-input>
              </div>
            </form>
          </div>
        </perfect-scrollbar>
      </template>
      <template v-slot:footer>
        <div class="half-width mb-4">
          <submit-button @submit="add">Cadastrar</submit-button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Product from '@/models/product'
import Attachment from '@/components/form/attachment'
export default {
  components: {
    attachment: Attachment
  },
  async asyncData({ store }) {
    await store.dispatch('artist/loadProducts')
  },
  data() {
    return {
      selectedProductId: 0,
      newProduct: new Product()
    }
  },
  computed: {
    ...mapState({ products: (state) => state.artist.products })
  },
  methods: {
    ...mapActions('artist', ['removeProduct']),
    openNewProductModal() {
      this.$refs.addProduct.open()
    },
    openConfirm(productId) {
      this.$refs.confirm.open()
      this.selectedProductId = productId
    },
    async add() {},
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
  @extend .horizontal, .middle;
  max-width: 100%;
  position: relative;
}

.new-product-form {
  max-height: 50vh;
}
</style>
