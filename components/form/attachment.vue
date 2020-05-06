<template>
  <div>
    <div v-if="file.id" class="attachment horizontal middle">
      <font-awesome icon="paperclip"></font-awesome>
      <span class="ext">{{ fileExtension }}</span>
      <span>{{ file.subtitle }}</span>
    </div>
  </div>
</template>

<script>
import Media from '@/models/media'
export default {
  props: {
    file: { type: Media, default: () => {} }
  },
  computed: {
    fileExtension() {
      return this.file.type.substring(0, 3)
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment {
  width: 200px;
  cursor: pointer;
  background: $brand;
  box-shadow: $shadow;
  border-radius: $rounded;
  margin-right: 2 * $space;
  padding: 2 * $space;

  .ext {
    margin-right: $space;
    text-transform: uppercase;
    letter-spacing: $space / 4;
    font-weight: $bold;
  }

  span,
  h6,
  [data-icon] {
    color: $bg1;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
