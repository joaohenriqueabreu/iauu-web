<template>
  <div>
    <div class="confirm">
      <div class="mb-5">
        <h5>Enviar proposta?</h5>
        <small v-if="areAllStepsCompleted">
          O artista irá respondê-lo em breve com sua disponibilidade para a data e o valor da
          apresentação
        </small>
      </div>
      <div class="half-width horizontal middle center">
        <div v-if="areAllStepsCompleted">
          <submit-button>Enviar!</submit-button>
        </div>
        <div v-else class="vertical middle center">
          <h6>
            Ainda faltam alguns detalhes para finalizar a proposta
            <font-awesome icon="frown"></font-awesome>
          </h6>
          <small>Finalize os detalhes da apresentação para poder enviar a proposta</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    completed: { type: Array, default: () => {} }
  },
  computed: {
    areAllStepsCompleted() {
      return !this.$utils.isEmpty(this.completed) && this.completed.length === 4
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
  @extend .vertical, .center, .middle, .full-height;
}
</style>
