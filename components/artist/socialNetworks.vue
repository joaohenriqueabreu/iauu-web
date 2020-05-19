<template>
  <div class="vertical center middle">
    <div class="horizontal d-flex justify-content-between mb-2">
      <h6 class="mb-4">Conecte suas redes sociais</h6>
    </div>
    <div class="vertical half-width mb-4">
      <fade-transition group>
        <div v-for="(media, index) in medias" :key="index">
          <media-thumbnail
            class="mb-2"
            simple
            removable
            :media="media"
            @remove="unlink(index)"
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
          @click="link"
        ></font-awesome>
      </div>
    </div>
  </div>
</template>

<script>
import Media from '@/models/media'
export default {
  data() {
    return {
      medias: [],
      newMedia: new Media()
    }
  },
  methods: {
    link() {
      this.medias.push(this.newMedia)
      this.newMedia = new Media()
    },
    unlink(index) {
      this.$delete(this.medias, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-box {
  @extend .horizontal, .middle, .center;
  margin: 0 5 * $space;

  [data-icon] {
    color: $layer5;
    font-size: 55px;
    font-weight: $bold;
    // box-shadow: $shadow;
    filter: drop-shadow($shadow);
    // border-radius: $rounded;
    transition: $transition;
    cursor: pointer;
    &:hover {
      transition: $transition;
      color: $brand;
    }
    &.active {
      transition: $transition;
      color: $brand;
    }
  }
}
</style>
