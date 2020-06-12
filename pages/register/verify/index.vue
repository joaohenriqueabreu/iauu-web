<template>
  <div class="vertical middle center full-height">
    <h3 class="no-cap">
      Enviamos um link para seu email com as instruções de login
    </h3>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$toast.success('Obrigado por se cadastrar na Iauu')
  }
}
</script>

<style lang="scss" scoped>
div {
  height: 80vh;
}
</style>
