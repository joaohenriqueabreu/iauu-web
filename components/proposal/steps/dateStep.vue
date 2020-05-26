<template>
  <div>
    <div>
      <h6>Escolha a data do seu evento:</h6>
      <small>Esta é a agenda do artista</small>
    </div>
    <div>
      <calendar ref="fullcalendar" class="content" @date-click="addDate"></calendar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addDate() {
      this.$emit('complete')
    }
  }
}
</script>

<style></style>
