<template>
  <div>
    <form-input
      v-model="info.name"
      class="mb-3"
      label="Nome fantasia"
      placeholder="Seu nome incrível vem aqui"
    ></form-input>
    <form-input
      v-model="info.description"
      class="mb-3"
      label="História"
      :rows="5"
      placeholder="Conta um pouquinho da sua história para seus clientes"
    ></form-input>
    <hr />
    <form-input
      v-model="info.cnpj"
      label="CNPJ"
      class="mb-3  horizontal center middle"
    ></form-input>
    <form-input
      v-model="info.location"
      label="Endereço"
      class="mb-3 horizontal center middle"
    ></form-input>
    <form-input
      v-model="info.phone"
      label="Telefone"
      class="mb-3  horizontal center middle"
    ></form-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: { type: Object, default: () => {} }
    }
  }
}
</script>

<style></style>
