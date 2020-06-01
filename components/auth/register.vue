<template>
  <div class="login">
    <div class="bg" :class="[userType]"></div>
    <form>
      <h5>Cadastre já!</h5>
      <form-input
        v-model="credentials.name"
        placeholder="Nome completo"
        icon-helper="user"
      ></form-input>
      <form-email v-model="credentials.email" placeholder="Entre com seu email"></form-email>
      <form-password
        v-model="credentials.password"
        placeholder="Crie uma senha para acessar a plataforma"
      ></form-password>
      <form-password
        v-model="credentials.passwordConfirmation"
        placeholder="Confirme sua senha"
      ></form-password>
      <div class="mb-5"></div>
      <action-button @callback="login">Cadastrar</action-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    userType: { type: String, default: '' }
  },
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        name: ''
      }
    }
  },
  mounted() {
    this.credentials.type = this.userType
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
        // this.$sentry.captureException(error)
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
    min-width: 50vw;
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
