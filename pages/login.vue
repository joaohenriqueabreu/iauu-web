<template>
  <div class="content">
    <div class="bg"></div>
    <form>
      <h5>Entre</h5>
      <form-email v-model="credentials.email"></form-email>
      <form-password v-model="credentials.password"></form-password>
      <div class="mb-5"></div>
      <submit-button @submit="login">Login</submit-button>
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
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async login() {
      await this.$auth.loginWith('local', {
        data: this.credentials
      })
      // await this.login(this.credentials)
      this.$router.push('/artist/schedule')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
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
