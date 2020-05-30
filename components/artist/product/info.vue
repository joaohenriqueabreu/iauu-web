<template>
  <div>
    <div class="product">
      <header v-if="!readOnly" @click="removeProduct">
        <font-awesome icon="times"></font-awesome>
      </header>
      <main>
        <div class="title" @click="editProduct">
          <h6 class="mb-0">{{ product.name }}</h6>
          <font-awesome v-if="!readOnly" icon="edit" class="ml-4"></font-awesome>
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
</template>

<script>
import Attachment from '@/components/form/attachment'
export default {
  components: {
    attachment: Attachment
  },
  props: {
    product: { type: Object, default: () => {} },
    readOnly: { type: Boolean, default: true }
  },
  methods: {
    editProduct() {
      if (!this.readOnly) {
        this.$emit('edit', this.product)
      }
    },
    removeProduct() {
      this.$emit('remove', this.product.id)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
