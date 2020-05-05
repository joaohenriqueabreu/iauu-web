<template>
  <div class="content">
    <div class="bg"></div>
    <form>
      <h5>Entre</h5>
      <form-input v-model="credentials.email"></form-input>
      <form-input v-model="credentials.password" type="password"></form-input>
      <submit-button :submit-callback="submit">Login</submit-button>
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
    async submit() {
      await this.login(this.credentials)
      this.$router.push('/artist')
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  @extend .vertical, .middle, .center;
  position: relative;
  height: 100%;

  form {
    @extend .vertical, .middle;
    padding: 3 * $space;
    z-index: $above;
    min-height: 50vh;
    min-width: 25vw;
    background: $darkElevated;
    box-shadow: $shadow;

    input {
      width: 100%;
    }
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('~assets/imgs/concert.png');
    height: 100%;
    width: 100%;
    opacity: 0.2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
