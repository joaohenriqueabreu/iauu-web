<template>
  <div>
    <h6 class="mb-4">Qual tipo de apresentação sua empresa realiza?</h6>
    <small class="mb-4">
      <font-awesome icon="exclamation"></font-awesome>
      Não deixe de selecionar as opções para facilitar a busca dos clientes
    </small>
    <div class="half-width">
      <form-select :options="categories" @select="categorySelect"></form-select>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return ['rock', 'pop', 'jazz', 'funk', 'pagode']
    }
  }
}
</script>

<style></style>
