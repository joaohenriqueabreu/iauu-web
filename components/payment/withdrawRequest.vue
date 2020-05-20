<template>
  <modal ref="modal">
    <template v-slot:main>
      <h1>This is a withdraw request</h1>
    </template>
    <template v-slot:footer>
      <div class="half-width">
        <submit-button>Solicitar Saque</submit-button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  methods: {
    openModal() {
      this.$refs.modal.open()
    }
  }
}
</script>

<style></style>
