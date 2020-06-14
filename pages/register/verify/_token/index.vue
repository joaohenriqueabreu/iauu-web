<template>
  <div>
    <modal ref="verify" height="tiny">
      <template v-slot:main>
        <div class="vertical center middle full-height">
          <h6>Verificando sua conta, aguarde por favor...</h6>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      verified: false,
      error: null
    }
  },
  computed: {
    ...mapState({ accessToken: (state) => state.protected.token })
  },
  async mounted() {
    this.$refs.verify.open()
    try {
      await this.verify(this.$route.params.token)

      // Need to append bearer for authorization
      this.$auth.setUserToken(this.accessToken)

      setTimeout(this.handleVerified, 3000)
    } catch (error) {
      this.error = error
      setTimeout(this.handleFailed, 3000)
    }
  },
  methods: {
    ...mapActions('protected', ['verify', 'release']),
    handleVerified() {
      this.$toast.success('Conta verificada com sucesso! Bem vindo a Iauu')
      const self = this
      setTimeout(() => self.$router.push('/'), 3000)
    },
    handleFailed() {
      this.$toast.error('Tivemos um problema ao verificar sua conta.')
      // const self = this
      // setTimeout(() => self.$router.push('/'), 3000)
    }
  }
}
</script>

<style></style>
