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
    :dates-destroy="datesDestroy"
    :valid-range="validRange"
    @dateClick="dateClick"
    @eventClick="eventClick"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    dateClickCallback: { type: Function, default: () => {} },
    eventClickCallback: { type: Function, default: () => {} },
    reloadCalendarCallback: { type: Function, default: () => {} }
  },
  data() {
    return {
      calendarPlugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        bootstrapPlugin
      ],
      calendarEvents: [],
      currentYear: 0 // store to fetch new events when user switches year
    }
  },
  computed: {
    ...mapState({
      timeslots: (state) => state.schedule.schedule.timeslots,
      removedId: (state) => state.schedule.lastRemovedTimeslotId,
      newTimeslot: (state) => state.schedule.newlyAddedTimeslot
    }),
    unavailableTimeslots() {
      return this.$collection.filter(
        this.timeslots,
        (timeslot) => timeslot.type === 'unavailable'
      )
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
    // TODO refactor op - We can move this to
    removedId(eventId) {
      this.fullcalendarApi.getEventById(eventId).remove()
    },
    newTimeslot(timeslot) {
      this.fullcalendarApi.addEvent(this.formatFullcalendarTimeslot(timeslot))
    }
  },
  mounted() {
    this.currentYear = this.moment(this.fullcalendarApi.getDate()).year()
    this.loadCalendarEvents()
  },
  methods: {
    ...mapActions('schedule', ['removeTimeslot']),
    ...mapActions('app', ['showMessage']),
    eventClick({ event }) {
      if (event.extendedProps.type === 'unavailable') {
        this.removeTimeslot(event.extendedProps)
        return
      }
      return this.eventClickCallback(event.extendedProps)
    },
    validRange(something) {},
    datesDestroy() {
      // This method is called right after every view switch on calendar,
      // when we switch years, append new events data
      if (
        this.moment(this.fullcalendarApi.getDate()).year() !== this.currentYear
      ) {
        this.reloadCalendarCallback(this.currentYear)
        this.currentYear = this.moment(this.fullcalendarApi.getDate()).year()
      }
    },
    dateClick(date) {
      return this.dateClickCallback(date)
    },
    formatFullcalendarTimeslot(timeslot) {
      const fullcalendarEvent = {
        id: `${timeslot.type}_${timeslot.id}`,
        title:
          timeslot.type === 'unavailable'
            ? 'Indisponibilidade'
            : timeslot.title,
        start:
          timeslot.type === 'unavailable'
            ? moment(timeslot.start_dt)
                .startOf('day')
                .toISOString()
            : moment(timeslot.start_dt).toISOString(),
        extendedProps: { id: timeslot.id, type: timeslot.type },
        // Layout settings
        classNames: ['event', timeslot.type]
      }

      fullcalendarEvent.allDay = timeslot.full_day
      if (!timeslot.full_day) {
        fullcalendarEvent.end = moment(timeslot.end_dt).toISOString()
      }

      return fullcalendarEvent
    },
    // Can be called by parent
    loadCalendarEvents() {
      // Convert provided timeslots into full-calender format
      this.timeslots.forEach((timeslot) => {
        this.calendarEvents.push(this.formatFullcalendarTimeslot(timeslot))
      })
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

  span {
    font-size: $small;
  }

  // Make events fill 100% of container
  margin-right: 5px;
  margin-bottom: 5px;
  left: 0% !important;
  right: 0% !important;
  &.proposal {
    background: rgb(249, 195, 34);
    span {
      color: $layer2;
    }
  }

  &.presentation {
    background: rgb(100, 200, 100);
  }

  &.blank {
    background: $layer3;
    color: $layer3;
  }

  &.unavailable {
    transition: $transition;
    background: transparent;
    span {
      color: $layer5;
    }

    .fc-time {
      display: none;
    }

    &::before {
      display: none;
      content: '';
    }

    &:hover {
      transition: $transition;
      background: red;
      span {
        color: $brand;
      }

      &::before {
        display: block;
        font-size: $small;
        content: 'Remover';
      }
    }
  }
}

// Overwrite buttons
.fc-button,
fc-button-primary {
  background: $brandLayer;
  border: none;

  &:disabled {
    background: transparentize($brandLayer, 0.5);
  }
}

.fc-day-grid-event {
  position: relative;
}

span.remove-event {
  @extend .vertical, .center, .middle;
  position: absolute;
  top: -5px;
  right: -10px;
  padding: 5px;
  width: 10px;
  height: 10px;
  border-radius: $rounded;
  color: $brand !important;
  font-size: $large;
  font-weight: $bold;
  box-shadow: $shadow;
  background: $layer5;
  z-index: $moveToTop;
}

// Full calendar overrides
td {
  cursor: pointer;
}

// .fc-event-container:has(.unavailable) {
//   background: red;
//   cursor: default;
// }

// .fc-day.unavailable {
//   border-top: 2px solid red !important;
//   border-bottom: 2px solid red !important;
//   border-left: 2px solid red !important;
//   border-right: 2px solid red !important;
//   z-index: $moveToTop;
//   opacity: 0.2;
//   span.fc-day-number {
//     color: $layer2;
//   }
// }

.fc-view-container {
  background: $layer3;
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

.fc-day.fc-disabled-day {
  background: $layer2;
  cursor: default;
}
</style>
