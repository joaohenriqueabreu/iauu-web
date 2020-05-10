<template>
  <div>
    <h4>Bem vindo a Sua Agenda</h4>
    <p>
      Veja e interaja com seus próximos eventos e responda a propostas de
      clientes
    </p>
    <div v-if="timeslots">
      <full-calendar
        ref="fullcalendar"
        class="content"
        @reload-events="reloadEvents"
        @event-click="openEvent"
        @date-click="openUnavailable"
      ></full-calendar>
      <modal ref="unavailableModal" height="small">
        <template v-slot:main>
          <unavailable
            :default="selectedTimeslot"
            @save="closeUnavailableModal"
          ></unavailable>
        </template>
      </modal>
      <modal ref="proposalModal">
        <template v-slot:main>
          <proposal @update="closeProposalModal"></proposal>
        </template>
      </modal>
      <modal ref="presentationModal">
        <template v-slot:main>
          <presentation @update="closePresentationModal"></presentation>
        </template>
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
  async asyncData({ app, store }) {
    await store.dispatch('schedule/loadSchedule', {
      id: store.state.auth.user.id,
      year: new Date().getFullYear()
    })
  },
  data() {
    return {
      selectedTimeslot: '',
      selectedProposalId: null,
      selectedPresentationId: null
    }
  },
  computed: {
    ...mapState({ timeslots: (state) => state.schedule.schedule.timeslots }),
    ...mapState({ userId: (state) => state.auth.user.id })
  },
  methods: {
    ...mapActions('event', ['loadProposal', 'loadPresentation']),
    ...mapActions('schedule', ['loadSchedule']),
    ...mapActions('app', ['showMessage']),
    async reloadEvents(year) {
      await this.loadSchedule({ id: this.userId, year })
      this.$refs.fullcalendar.loadCalendarEvents()
    },
    openUnavailable({ dateStr }) {
      if (this.haveEventsOnDate(dateStr)) {
        this.showMessage({
          message:
            'Existem apresentações ou propostas neste dia, cancele-as antes de marcar como indisponível',
          type: 'error'
        })

        return
      }

      this.selectedTimeslot = dateStr
      this.$refs.unavailableModal.open()
    },
    async openEvent({ id, type }) {
      if (type === 'proposal') {
        await this.loadProposal(id)
        this.$refs.proposalModal.open()
      }

      if (type === 'presentation') {
        await this.loadPresentation(id)
        this.$refs.presentationModal.open()
      }
    },
    closeUnavailableModal() {
      this.$refs.unavailableModal.close()
    },
    closeProposalModal() {
      this.$refs.proposalModal.close()
    },
    closePresentationModal() {
      this.$refs.presentationModal.close()
    },
    haveEventsOnDate(date) {
      const indexOfEvent = this.$array.findIndex(this.timeslots, (timeslot) => {
        return (
          ['proposal', 'presentation'].includes(timeslot.type) &&
          this.moment(date).isSame(this.moment(timeslot.start_dt), 'day')
        )
      })

      return indexOfEvent !== -1
    }
  }
}
</script>

<style lang="scss" scoped></style>
