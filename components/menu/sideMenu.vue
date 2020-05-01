<template>
  <nuxt-link :to="scheduleLink" class="horizontal">
    <font-awesome icon="calendar"></font-awesome>
    agenda
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['isArtist']),
    scheduleLink() {
      return this.isArtist ? '/artist' : '/contractor'
    }
  }
}
</script>

<style></style>
