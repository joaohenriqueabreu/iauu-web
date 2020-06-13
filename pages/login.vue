<template>
  <div class="login">
    <div class="bg"></div>
    <form>
      <h5>Entre</h5>
      <form-email v-model="credentials.email" @input="resetError"></form-email>
      <form-password v-model="credentials.password" @input="resetError"></form-password>
      <form-validation :active="hasError">Usuário ou senha inválidos</form-validation>
      <div class="mb-5"></div>
      <action-button ref="login" @callback="login">Login</action-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      hasError: false
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.credentials
        })
        this.$router.push('/artist/schedule')
      } catch (error) {
        console.log(error)
        this.hasError = true
        this.$refs.login.reset()
      }
    },
    resetError() {
      this.hasError = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  @extend .vertical, .middle, .center;
  position: relative;
  height: 100vh;

  form {
    @extend .vertical, .middle;
    padding: 3 * $space;
    z-index: $above;
    min-height: 50vh;
    min-width: 25vw;
    background: $layer2;
    box-shadow: $shadow;

    input {
      width: 100%;
    }
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('~assets/imgs/concert.png?webp');
    height: 100%;
    width: 100%;
    opacity: 0.2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
