<template>
  <FullCalendar
    ref="fullcalendar"
    :events="calendarEvents"
    theme="bootstrap"
    default-view="dayGridMonth"
    locale="pt-br"
    :plugins="calendarPlugins"
    content-height="auto"
    height="parent"
    width="parent"
    :aspect-ratio="0.5"
    :select-long-press-delay="250"
    slot-duration="01:00:00"
    slot-label-interval="04:00:00"
    :selectable="true"
    :editable="true"
    :event-overlap="true"
    :now-indicator="false"
    :all-day-slot="false"
    :all-day-maintain-duration="true"
    :show-non-current-dates="false"
    :header="headerButtons"
    :button-text="buttonText"
    :column-header-format="columnHeaderFormat"
    :slot-label-format="slotLabelFormat"
    :event-time-format="eventTimeFormat"
    @dateClick="dateClickCallback"
    @eventClick="eventClickCallback"
  />
</template>

<script>
import { mapState } from 'vuex'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import moment from 'moment'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    // timeslots: { type: Array, default: () => [] },
    dateClickCallback: { type: Function, default: () => {} },
    eventClickCallback: { type: Function, default: () => {} }
  },
  data() {
    return {
      calendarPlugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        bootstrapPlugin
      ],
      calendarEvents: []
    }
  },
  computed: {
    ...mapState({
      timeslots: (state) => state.schedule.schedule.timeslots,
      removedId: (state) => state.schedule.lastRemovedTimeslotId,
      newTimeslot: (state) => state.schedule.newlyAddedTimeslot
    }),
    numOfTimeslots() {
      return this.timeslots.length
    },
    headerButtons: () => {
      return {
        left: 'title',
        center: '',
        right: 'timeWeekGrid, today, prev, next'
      }
    },
    buttonText: () => {
      return {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        timeWeekGrid: 'Ver semana'
      }
    },
    titleFormat: () => {
      return {}
    },
    slotLabelFormat: () => {
      return {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      }
    },
    eventTimeFormat: () => {
      return {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      }
    },
    columnHeaderFormat: () => {
      return {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric',
        omitCommas: 'false'
      }
    },
    fullcalendarApi() {
      return this.$refs.fullcalendar.getApi()
    }
  },
  watch: {
    removedId(eventId) {
      this.fullcalendarApi.getEventById(eventId).remove()
    },
    newTimeslot(timeslot) {
      this.fullcalendarApi.addEvent(this.formatFullcalendarTimeslot(timeslot))
    }
  },
  mounted() {
    // Convert provided timeslots into full-calender format
    this.timeslots.forEach((timeslot) => {
      this.calendarEvents.push(this.formatFullcalendarTimeslot(timeslot))
    })
  },
  methods: {
    formatFullcalendarTimeslot(timeslot) {
      const fullcalendarEvent = {
        id: `${timeslot.type}_${timeslot.id}`,
        title: 'some random event',
        start: moment(timeslot.start_dt).toISOString(),
        extendedProps: { id: timeslot.id, type: timeslot.type },
        // Layout settings
        classNames: ['event', timeslot.type]
      }

      fullcalendarEvent.allDay = timeslot.full_day
      if (!timeslot.full_day) {
        fullcalendarEvent.end = moment(timeslot.end_dt).toISOString()
      }

      return fullcalendarEvent
    }
  }
}
</script>

<style lang="scss">
.event {
  border: none;
  box-shadow: $lightShadow;
  border-radius: 5px;
  padding: 5px;
  background-clip: none;
  font-size: $small;

  // Make events fill 100% of container
  margin-right: 5px;
  margin-bottom: 5px;
  left: 0% !important;
  right: 0% !important;
  &.proposal {
    background: rgb(100, 100, 200);
  }

  &.presentation {
    background: rgb(100, 200, 100);
  }

  &.unavailable {
    background: $darkElevated;
    box-shadow: none;
    margin-right: 0;
    margin-bottom: 0;
    span {
      color: $darkElevated;
    }
  }
}

// Full calendar overrides
td {
  cursor: pointer;
}

.fc-event-container:has(.unavailable) {
  background: red;
  cursor: default;
}

.fc-view-container {
  background: $darkComponent;
  box-shadow: $higherShadow;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 3 * $space;
}

.fc-unthemed {
  .fc-content,
  .fc-divider,
  .fc-list-heading,
  .fc-list-heading td,
  .fc-list-view,
  .fc-popover,
  .fc-row,
  .fc-today,
  .fc-widget-header,
  .fc-axis,
  tbody,
  thead,
  th,
  tr,
  td {
    border: none;
    box-shadow: none;
  }
}

th.fc-axis,
.fc-axis.fc-time {
  font-weight: $bold;
}

.fc-time-grid .fc-slats {
  border: none;
}

.fc-time-grid .fc-slats .fc-minor td {
  // border-top: 0.5px solid rgba(100, 100, 100, 0.2);
  border: none;
}

// fc-axis fc-widget-header

td:not(.fc-minor) {
  border-top: 0.5px solid rgba(100, 100, 100, 0.2);
  // border: none;
}

.fc {
  .fc-day-header,
  td {
    &.fc-today {
      background: rgb(65, 65, 65);
      border: none;
    }
  }
}

.fc-unthemed .fc-disabled-day {
  background: transparent;
  cursor: default;
}
</style>
