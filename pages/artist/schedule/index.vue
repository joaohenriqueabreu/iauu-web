<template>
  <div>
    <div class="d-flex justify-content-between">
      <div class="vertical mb-4">
        <span>Veja e interaja com seus próximos eventos e responda a propostas de clientes</span>
      </div>
    </div>
    <div v-if="timeslots">
      <calendar
        ref="calendar"
        class="content"
        :timeslots="timeslots"
        @reload-events="reloadTimeslotsForYear"
        @event-click="handleEvent"
        @date-click="openUnavailable"
      ></calendar>
      <unavailable
        ref="unavailable"
        :default="selectedTimeslot"
        @save="saveUnavailableTimeslot"
      ></unavailable>
      <proposal
        v-if="!$utils.empty(proposal)"
        ref="proposal"
        :proposal="proposal"
        @accept="handleAcceptProposal"
        @reject="handleRejectProposal"
      ></proposal>
      <presentation
        v-if="!$utils.empty(presentation)"
        ref="presentation"
        :read-only="false"
        :presentation="presentation"
        @confirm="handleConfirmPresentation"
        @cancel="handleCancelPresentation"
      ></presentation>
    </div>
    <div class="horizontal middle center text-right">
      <div class="horizontal middle mr-4">
        <span class="event-subtitle proposal"></span>
        <h6>Proposta</h6>
      </div>
      <div class="horizontal middle">
        <span class="event-subtitle presentation"></span>
        <h6>Apresentação</h6>
      </div>
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
      id: app.$auth.user.id,
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
    ...mapState({ timeslots: (state) => state.schedule.timeslots }),
    ...mapState({ presentation: (state) => state.event.presentation }),
    ...mapState({ proposal: (state) => state.event.proposal })
  },
  methods: {
    ...mapActions('event', [
      'loadProposal',
      'loadPresentation',
      'acceptProposal',
      'rejectProposal',
      'confirmPresentation',
      'cancelPresentation'
    ]),
    ...mapActions('schedule', ['loadSchedule', 'saveTimeslot', 'removeTimeslot']),
    ...mapActions('app', ['setAlert']),
    async reloadTimeslotsForYear(year) {
      await this.loadSchedule({ id: this.$auth.user.id, year })
      this.$refs.calendar.loadCalendarEvents()
    },
    openUnavailable({ dateStr }) {
      if (this.haveEventsOnDate(dateStr)) {
        this.setAlert({
          message:
            'Existem apresentações ou propostas neste dia, cancele-as antes de marcar como indisponível',
          type: 'error'
        })

        return
      }

      this.selectedTimeslot = dateStr
      this.$refs.unavailable.openModal()
    },
    async handleEvent({ eventId, timeslotId, type }) {
      if (type === 'unavailable') {
        await this.removeTimeslot(timeslotId)
        this.$refs.calendar.removeEvent(eventId)
      }

      if (type === 'proposal') {
        await this.loadProposal(timeslotId)
        this.$refs.proposal.openModal()
      }

      if (type === 'presentation') {
        await this.loadPresentation(timeslotId)
        this.$refs.presentation.openModal()
      }
    },
    async saveUnavailableTimeslot(timeslot) {
      await this.saveTimeslot(timeslot)
      this.$refs.calendar.addEvent(timeslot)
      this.$refs.unavailable.closeModal()
    },
    async handleAcceptProposal(id) {
      await this.acceptProposal(id)
      this.$refs.calendar.refresh()
      this.$refs.proposal.closeModal()
    },
    async handleRejectProposal(id) {
      await this.rejectProposal(id)
      this.$refs.calendar.refresh()
      this.$refs.proposal.closeModal()
    },
    async handleConfirmPresentation(id) {
      await this.confirmPresentation(id)
      this.$refs.calendar.refresh()
      this.$refs.presentation.closeModal()
    },
    async handleCancelPresentation(id) {
      await this.cancelPresentation(id)
      this.$refs.calendar.refresh()
      this.$refs.presentation.closeModal()
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

<style lang="scss" scoped>
.event-subtitle {
  height: 30px;
  width: 30px;
  border-radius: $rounded;
  margin-right: $space;
  &.proposal {
    background: $proposalTimeslot;
  }

  &.presentation {
    background: $presentationTimeslot;
  }
}
</style>
