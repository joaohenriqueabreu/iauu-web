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
        :date-click-callback="openUnavailable"
        :event-click-callback="openEvent"
        class="content"
      ></full-calendar>
      <modal ref="unavailableModal" height="small">
        <unavailable
          :default="selectedTimeslot"
          :submit-callback="closeUnavailableModal"
        ></unavailable>
      </modal>
      <modal ref="proposalModal">
        <proposal></proposal>
      </modal>
      <modal ref="presentationModal">
        <presentation></presentation>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UnavailableSlot from '@/components/artist/unavailable'
import Proposal from '@/components/artist/proposal'
import Presentation from '@/components/artist/presentation'
export default {
  components: {
    unavailable: UnavailableSlot,
    proposal: Proposal,
    presentation: Presentation
  },
  async asyncData({ store }) {
    await store.dispatch('schedule/load', store.state.auth.user.id)
  },
  data() {
    return {
      selectedTimeslot: '',
      selectedProposalId: null,
      selectedPresentationId: null
    }
  },
  computed: {
    ...mapState({ timeslots: (state) => state.schedule.schedule.timeslots })
  },
  methods: {
    ...mapActions('event', ['loadProposal', 'loadPresentation']),
    openUnavailable({ dateStr }) {
      this.selectedTimeslot = dateStr
      this.$refs.unavailableModal.open()
    },
    async openEvent({ event }) {
      const { id, type } = event.extendedProps
      if (type === 'proposal') {
        await this.loadProposal(id)
        this.$refs.proposalModal.open()
      }
    },
    closeUnavailableModal() {
      this.$refs.unavailableModal.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
