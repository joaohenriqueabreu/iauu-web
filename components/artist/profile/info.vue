<template>
  <div class="">
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
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <form-input
          v-model="info.cnpj"
          label="CNPJ"
          class="mb-3  horizontal center middle"
        ></form-input>
        <form-location
          v-model="info.location"
          label="Endereço"
          class="mb-3 horizontal center middle"
        ></form-location>
        <form-input
          v-model="info.phone"
          label="Telefone"
          class="mb-3  horizontal center middle"
        ></form-input>
      </div>
    </div>
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

<style lang="scss" scoped></style>
