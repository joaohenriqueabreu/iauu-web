<template>
  <div>
    <h4>Bem vindo a Sua Agenda</h4>
    <p>
      Veja e interaja com seus próximos eventos e responda a propostas de
      clientes
    </p>
    <div v-if="timeslots">
      <full-calendar
        :timeslots="timeslots"
        :click-callback="openUnavailable"
        class="content"
      ></full-calendar>
      <modal ref="unavailableModal" height="small">
        <unavailable
          :default="selectedTimeslot"
          :submit-callback="closeUnavailableModal"
        ></unavailable>
      </modal>
      <modal ref="proposal"></modal>
      <modal ref="presentation"></modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UnavailableSlot from '@/components/artist/unavailable'
export default {
  components: {
    unavailable: UnavailableSlot
  },
  async asyncData({ store }) {
    await store.dispatch('schedule/load', store.state.auth.user.id)
  },
  data() {
    return {
      selectedTimeslot: ''
    }
  },
  computed: {
    ...mapState({ timeslots: (state) => state.schedule.schedule.timeslots })
  },
  methods: {
    openUnavailable({ dateStr }) {
      this.selectedTimeslot = dateStr
      this.$refs.unavailableModal.open()
    },
    closeUnavailableModal() {
      this.$refs.unavailableModal.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
