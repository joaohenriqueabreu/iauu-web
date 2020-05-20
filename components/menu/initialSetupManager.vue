<template>
  <div>
    <div
      v-if="$auth.hasScope('artist') && !isAtSetupRoute"
      class="warning d-flex justify-content-between"
    >
      <h6>Adicione produtos para que os clientes lhe enviem propostas</h6>
      <nuxt-link to="/artist/products">Adicionar produtos</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAtSetupRoute() {
      return this.$route.path === '/artist/products'
    }
  }
}
</script>

<style lang="scss" scoped>
.warning {
  @extend .full-width, .horizontal, .middle;
  background: $layer3;
  box-shadow: $shadow;
  padding: 2 * $space;

  a {
    background: $layer4;
    box-shadow: $shadow;
    border-radius: $rounded;
    padding: 2 * $space;
    transition: $transition;

    &:hover {
      transition: $transition;
      background: $brandLayer;
      color: $layer4;
    }
  }
}
</style>
