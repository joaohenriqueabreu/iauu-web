<template>
  <div>
    <div class="login">
      <div class="bg"></div>
      <form>
        <h5>Cadastre já!</h5>
        <form-input v-model="credentials.name" placeholder="Nome completo" icon="user"></form-input>
        <form-email v-model="credentials.email" placeholder="Entre com seu email"></form-email>
        <form-password
          v-model="credentials.password"
          placeholder="Crie uma senha para acessar a plataforma"
        ></form-password>
        <form-password
          v-model="credentials.passwordConfirmation"
          placeholder="Confirme sua senha"
        ></form-password>
        <div v-if="error" class="mt-2 error">
          Problemas ao registrar sua conta
        </div>
        <div class="mb-4"></div>
        <form-button class="mb-4" @action="signup">Cadastrar</form-button>
        <facebook-login></facebook-login>
        <google-login></google-login>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FacebookLogin from '@/components/auth/facebook'
import GoogleLogin from '@/components/auth/google'
export default {
  components: {
    'facebook-login': FacebookLogin,
    'google-login': GoogleLogin
  },
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        name: ''
      },
      error: null
    }
  },
  methods: {
    ...mapActions('protected', ['register']),
    async signup() {
      this.$auth.setToken('local', null)
      try {
        await this.register(this.credentials)
        this.$router.push('/register/verify')
      } catch (error) {
        console.log('deveria ter parado aqui')
        this.$sentry.captureException(error)
        this.error = error
      }
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
    min-width: 30vw;
    background: transparent;
    box-shadow: $shadow;
    border-radius: $edges;

    input {
      width: 100%;
    }
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 110%;
    width: 100%;
    opacity: 0.2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: -10vh;

    &.artist {
      background-image: url('~assets/imgs/general/artist-signup.jpg?webp');
    }

    &.contractor {
      background-image: url('~assets/imgs/general/contractor-signup.jpg?webp');
    }
  }
}
</style>
