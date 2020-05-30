<template>
  <div>
    <div class="horizontal d-flex justify-content-between mb-4">
      <div class="intro">
        <h6>Escolha a data do seu evento:</h6>
        <small
          >Esta é a agenda do artista. Clique em uma data, selecione um horário de início e arraste
          para determinar a duração do seu evento.</small
        >
      </div>
      <div class="horizontal center middle">
        <font-awesome icon="times"></font-awesome>
        <h6>Data Indisponível</h6>
      </div>
    </div>
    <div>
      <calendar
        ref="calendar"
        week-mode
        :timeslots="timeslots"
        class="content"
        @event-click="removeProposingTimeslot"
        @selected="addTimeslot"
      ></calendar>
    </div>
    <input v-model="date" type="hidden" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Step from '@/components/proposal/steps/step'
export default {
  extends: Step,
  props: {
    timeslots: { type: Array, default: () => {} }
  },
  data() {
    return {
      date: '',
      proposingTimeslotId: 1
    }
  },
  methods: {
    ...mapActions('schedule', ['loadSchedule', 'appendTimeslot', 'removeTimeslot']),
    addTimeslot(selectedTimeslot) {
      // Assign timeslot as proposal
      selectedTimeslot.title = 'Proposta de data para o evento'
      selectedTimeslot.type = 'proposing'

      // assign some temp id
      selectedTimeslot.id = `proposing_${this.proposingTimeslotId}`
      this.proposingTimeslotId++

      this.editProposal({ prop: 'timeslot', value: selectedTimeslot })
      this.appendTimeslot(selectedTimeslot)

      // Complete step
      this.$emit('complete')
    },
    async removeProposingTimeslot({ eventId, timeslotId, type }) {
      if (type === 'proposing') {
        await this.removeTimeslot(timeslotId)
        // Fullcalendar will update itself due to watcher

        if (this.timeslots.length) {
          this.$emit('incomplete')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  max-width: 50vw;
}

[data-icon] {
  position: relative;
  display: block;
  width: 25px;
  height: 25px;
  font-size: $huge;
  background: $layer1;
  opacity: 0.5;
  padding: $space;
  border-radius: $rounded;
  color: $layer5;
  margin-right: 2 * $space;
}
</style>
