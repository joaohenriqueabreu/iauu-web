<template>
  <div class="vertical center middle">
    <h4>
      Seu perfil está <i>{{ profileStrength }}</i>
    </h4>
    <small class="mb-5">
      {{ strengthMessage }}
    </small>
    <gauge
      :value="completeness"
      :min="0"
      :max="100"
      :scale-step="0"
      :inner-radius="70"
      :start-angle="0"
      :end-angle="360"
      :separator-thickness="0"
    ></gauge>
  </div>
</template>

<script>
export default {
  computed: {
    completeness() {
      return 60
    },
    profileStrength() {
      return 'ok'
    },
    strengthMessage() {
      return 'Inclua mais informações para que sua empresa apareça com mais frequência nas buscas'
    }
  }
}
</script>

<style lang="scss">
.gauge {
  height: 20vh;
}
</style>
