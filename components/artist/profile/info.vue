<template>
  <div class="">
    <form-input
      class="mb-3"
      icon="signature"
      label="Nome fantasia"
      placeholder="Seu nome incrível vem aqui"
      :model="artist"
      prop="company_name"
      @input="updateProfile"
    ></form-input>
    <form-textarea
      class="mb-3"
      label="História"
      :rows="5"
      placeholder="Conte um pouquinho da sua história para seus clientes"
      :model="artist"
      prop="story"
      @input="updateProfile"
    ></form-textarea>
    <hr />
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <form-masked
          icon="id-card"
          placeholder="CPF/CNPJ"
          mask="document"
          :model="artist"
          prop="document"
          @input="updateProfile"
        ></form-masked>
        <form-location
          :default="artist.address"
          street
          placeholder="Endereço"
          :model="artist"
          prop="address"
          @selected="updateProfile"
        ></form-location>
        <form-masked
          icon="phone"
          placeholder="Telefone"
          mask="phone"
          :model="artist"
          prop="phone"
          @input="updateProfile"
        ></form-masked>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      info: { type: Object, default: () => {} }
    }
  },
  computed: {
    ...mapState({ artist: (state) => state.artist.artist })
  },
  created() {
    this.info = this.artist || {}
  },
  methods: {
    ...mapMutations('artist', { updateProfile: 'update_profile' })
  }
}
</script>

<style lang="scss" scoped></style>
