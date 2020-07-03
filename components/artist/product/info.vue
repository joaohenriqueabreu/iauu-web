/* eslint-disable */
<template>
<div>
  <div class="info full-height">
    <image-uploader ref="photoUploader" @uploaded="setPhoto">
      <div class="media clickable" :style="{ 'background-image': `url(${productPhoto})` }" @click="uploadPhoto"></div>      
    </image-uploader>    
    <div class="product">
      <main>
        <div class="title" @click="editProduct">
          <h2 class="cap mb-0">{{ product.name }}</h2>
          <font-awesome icon="edit" class="ml-4"></font-awesome>
        </div>
        <div class="horizontal middle mb-3">
          <span class="mr-4">
            <b>{{ product.price | currency }}</b>
          </span>
          <span>
            <font-awesome icon="clock" class="mr-1"></font-awesome>
            {{ product.duration }} horas
          </span>
        </div>
        <div class="description one-line">
          {{ product.description }}
        </div>
        <div class="items mb-5">
          <div v-for="(item, index) in product.items" :key="index">
            <hr />
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="horizontal center middle clickable" @click="editProduct">
          <form-button>Modificar</form-button>
        </div>
      </main>
    </div>
  </div>
</div>  
</template>

<script>
import { mapActions } from 'vuex'
import Attachment from '@/components/form/attachment'
export default {
  props: {
    product: { type: Object, default: () => {} }
  },
  computed: {
     productPhoto() {
      return !this.$utils.empty(this.product.photo)
        ? this.product.photo
        : this.$config.defaultBGImgUrl
    },
  },
  methods: {
    ...mapActions('artist', ['saveProduct']),
    editProduct() {
      this.$emit('edit', this.product)
    },
    removeProduct() {
      this.$emit('remove', this.product.id)
    },
    uploadPhoto() {
      this.$refs.photoUploader.upload()
    },
    async setPhoto({ url }) {
      let product = this.$object.clone(this.product)
      product.photo = url
      await this.saveProduct(product)
    },
  }
}
</script>

<style lang="scss" scoped>
.info {
  background: $layer3;
  box-shadow: $shadow;
}

.media {
  min-height: 200px;
  // border-top-left-radius: $edges;
  // border-top-right-radius: $edges;
  background-size: cover;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.product {
  width: 100%;
  // height: 100%;
  // background: $layer3;
  // border-bottom-left-radius: $edges;
  // border-bottom-right-radius: $edges;
  // box-shadow: $shadow;
  padding: 4 * $space;
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
/* eslint-enable */
