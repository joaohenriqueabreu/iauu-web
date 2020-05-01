<template>
  <div>
    <h2>Sua Agenda</h2>
    <div v-if="timeslots">
      <full-calendar
        :timeslots="timeslots"
        :click-callback="select"
      ></full-calendar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ store }) {
    await store.dispatch('schedule/load', store.state.auth.user.id)
  },
  computed: {
    ...mapState({ timeslots: (state) => state.schedule.schedule.timeslots })
  },
  methods: {
    select({ dateStr }) {
      alert(dateStr)
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  min-height: 80vh;
  width: 80vw;
}
</style>
