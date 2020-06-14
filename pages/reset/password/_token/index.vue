<template>
  <main class="vertical center middle pt-0">
    <h6>Altere sua senha</h6>
    <form-password
      v-model="credentials.password"
      placeholder="Nova senha"
      class="half-width"
    ></form-password>
    <form-password
      v-model="credentials.confirmPassword"
      placeholder="Confirme sua senha"
      class="half-width"
    ></form-password>
    <div class="mb-4"></div>
    <form-button @callback="reset">Alterar senha</form-button>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  async asyncData({ app, route, redirect }) {
    try {
      await app.$axios.post('reset/authorize', { token: route.params.token })

      // ok, good to go
    } catch (error) {
      // app.$toast.error('O token fornecido não é válido')
      // app.delay()
      redirect('/')
    }
  },
  data() {
    return {
      credentials: {
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    ...mapActions('protected', ['resetPassword']),
    async reset() {
      try {
        await this.resetPassword(this.credentials)
        this.$toast.success('Senha atualizada com sucesso. Por favor, faça login novamente.')
        await this.delay()
      } catch (error) {
        this.$toast.error('Não foi possível alterar sua senha')
        await this.delay()
      } finally {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style></style>
