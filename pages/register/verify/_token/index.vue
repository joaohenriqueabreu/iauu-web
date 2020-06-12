<template>
  <div>
    <modal ref="verify" height="tiny">
      <template v-slot:main>
        <div class="vertical center middle">
          <h6 class="no-cap">Verifying your accout, please wait...</h6>
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
      verified: false
    }
  },
  computed: {
    ...mapState({ accessToken: (state) => state.security.token })
  },
  async mounted() {
    this.$refs.verify.open()
    try {
      await this.verify(this.$route.params.token)
      console.log(this.accessToken)

      // Need to append bearer for authorization
      this.$auth.setUserToken(this.accessToken)

      setTimeout(this.handleVerified, 3000)
    } catch (error) {
      console.log(error.message)
      // TODO handle...
    }
  },
  methods: {
    ...mapActions('security', ['verify', 'release']),
    handleVerified() {
      this.$refs.verify.close()
      this.$toast.success('Conta verificada com sucesso! Bem vindo a Iauu')
      const self = this
      setTimeout(() => self.$router.push('/'), 3000)
    }
  }
}
</script>

<style></style>
