<template>
  <vue-carousel :perPage="page" :navigationEnabled="navigate">
    <slot></slot>
  </vue-carousel>
</template>

<script>
import { Carousel } from 'vue-carousel'
export default {
  components: {
    'vue-carousel': Carousel
  },
  props: {
    page: 0,
    navigate: false
  }
}
</script>

<!-- VueCarousel overrides -->
<style lang="scss">

</style>