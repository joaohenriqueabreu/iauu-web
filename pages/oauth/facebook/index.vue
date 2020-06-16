<template>
  <div></div>
</template>

<script>
import queryString from 'query-string'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({ accessToken: (state) => state.protected.token })
  },
  // Can't do asyncData directly as facebook appends a hash that needs to be handled
  async mounted() {
    const token = queryString.parse(this.$route.hash).access_token
    try {
      console.log('Starting to fetch facebook')
      await this.facebookLogin(token)

      // this.$auth.loginWith('local')

      // this.$auth.setToken('local', `Bearer ${this.accessToken}`)
      await this.$auth.setUserToken(this.accessToken)
      await this.$auth.fetchUser()
      this.$toast.success('Bem vindo a Iauu')
      // await this.$utils.delay()
      this.$router.push('/')
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions('protected', ['facebookLogin'])
  }
}
</script>

<style></style>
