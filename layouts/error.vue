<template>
  <div class="error">
    <font-awesome icon="bug"></font-awesome>
    <h1>Uh-Oh</h1>
    <h4 class="mb-5">Parece que a corda da guitarra estourou</h4>
    <h3 v-if="error.statusCode === 404">{{ error.message }}</h3>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Object, default: () => {} }
  }
}
</script>
<style lang="scss" scoped>
.error {
  @extend .vertical, .center, .middle;
  height: 90vh;

  [data-icon] {
    font-size: 40px;
    margin-bottom: 5 * $space;
  }
}
</style>
