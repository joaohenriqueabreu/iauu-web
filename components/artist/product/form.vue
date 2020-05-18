<template>
  <modal ref="form">
    <template v-slot:header>
      <h4>Cadastre um novo produto</h4>
    </template>
    <template v-slot:main>
      <div class="new-product-form vertical p-4">
        <form v-if="!$utils.isEmpty(product)">
          <form-input v-model="product.name" label="Título"></form-input>
          <form-input
            v-model="product.description"
            label="Descrição"
            :rows="3"
          ></form-input>
          <div class="horizontal middle center mb-4">
            <form-input
              v-model="product.price"
              class="mr-2"
              label="Valor (R$)"
            ></form-input>
            <form-input
              v-model="product.duration"
              label="Duração da apresentação"
            ></form-input>
          </div>
          <div class="horizontal d-flex justify-content-between mb-2">
            <h6>Adicionar documentos</h6>
            <font-awesome
              icon="plus"
              class="clickable"
              @click="uploadDocument"
            ></font-awesome>
          </div>
          <div class="vertical mb-5">
            <fade-transition group>
              <attachment
                v-for="(document, docIndex) in product.documents"
                :key="docIndex"
                :file="document"
                removable
                @remove="removeDocument(docIndex)"
              ></attachment>
            </fade-transition>
          </div>
          <div class="horizontal d-flex justify-content-between mb-2">
            <h6>Adicionar Fotos e Vídeos de suas apresetações</h6>
          </div>
          <div class="vertical mb-4">
            <fade-transition group>
              <div
                v-for="(media, mediaIndex) in product.medias"
                :key="mediaIndex"
              >
                <media-thumbnail
                  class="mb-2"
                  simple
                  removable
                  :media="media"
                  @remove="removeMedia(mediaIndex)"
                ></media-thumbnail>
              </div>
            </fade-transition>
            <div class="horizontal middle full-width">
              <form-input
                v-model="newMedia.url"
                class="full-width"
                placeholder="Cole o link de suas midias sociais aqui"
              ></form-input>
              <font-awesome
                icon="plus"
                class="clickable ml-5"
                @click="uploadMedia"
              ></font-awesome>
            </div>
          </div>
        </form>
      </div>
    </template>
    <template v-slot:footer>
      <div class="half-width mb-4">
        <submit-button @submit="save">Salvar</submit-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'
import * as filestack from 'filestack-js'
import Product from '@/models/product'
import Media from '@/models/media'
export default {
  data() {
    return {
      product: { type: Product, default: new Product() },
      newMedia: new Media()
    }
  },
  created() {
    this.client = filestack.init(process.env.fileStackApiKey)
  },
  methods: {
    ...mapActions('artist', ['addProduct']),
    openModal(product) {
      if (!this.$utils.isEmpty(product)) {
        // Need to copy object as js assignments are passed by reference
        this.$set(this, 'product', this.$object.clone(product.attributes))
      }

      this.$refs.form.open()
    },
    uploadDocument() {
      const options = {
        lang: 'pt',
        fromSources: ['local_file_system'],
        accept: ['.pdf'],
        onUploadDone: this.documentUploaded
      }
      this.client.picker(options).open()
    },
    documentUploaded({ filesUploaded }) {
      const media = new Media()
      media.id = filesUploaded[0].uploadId
      media.type = filesUploaded[0].mimetype
      media.name = filesUploaded[0].filename
      media.url = filesUploaded[0].url
      this.product.documents.push(media)
    },
    removeDocument(index) {
      this.$delete(this.product.documents, index)
    },
    uploadMedia() {
      if (this.$utils.isEmpty(this.newMedia.url)) {
        return
      }

      this.product.medias.push(this.newMedia)
      this.newMedia = new Media()
    },
    removeMedia(index) {
      this.$delete(this.product.medias, index)
    },
    save() {
      this.$emit('save', this.product)
      this.$refs.form.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.new-product-form {
  height: 400px;
}

.thumb-container {
  @extend .horizontal, .middle;
  border-radius: $rounded;
  box-shadow: $shadow;
  margin-bottom: 2 * $space;
  padding: $space;
}
</style>
