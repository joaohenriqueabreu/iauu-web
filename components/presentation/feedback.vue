<template>
  <modal ref="modal">
    <template v-slot:main>
      <h5>Feedback da apresentação</h5>
      <div>
        Conta pra gente como foi sua experiência com {{ otherParty.user.name }}
      </div>
    </template>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    presentation: { type: Object, default: () => {}},
    rating: { type: Number, default: 0 }
  },
  computed: {
    otherParty() {
      if (this.$auth.hasScope('artist')) {
        return this.presentation.artist
      }

      return this.presentation.contractor
    }
  },
  methods: {
    ...mapActions('artist', ['sendFeedback']),
    feedback() {
      this.$emit('feedback')
    }
  }
}
</script>

<style>

</style>