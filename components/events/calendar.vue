<template>
  <FullCalendar
    default-view="timeGridWeek"
    locale="pt-br"
    :plugins="calendarPlugins"
    content-height="auto"
    height="parent"
    width="parent"
    :selectable="true"
    :editable="true"
    :event-overlap="false"
    :select-long-press-delay="250"
    :events="calendarEvents"
    :event-time-format="eventTimeFormat"
    slot-duration="02:00:00"
    :now-indicator="true"
    @dateClick="clickCallback"
  />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    timeslots: { type: Array, default: () => [] },
    clickCallback: { type: Function, default: () => {} }
  },
  data() {
    return {
      calendarPlugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
      calendarEvents: []
    }
  },
  computed: {
    eventTimeFormat: () => {
      return {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: 'short'
      }
    }
  },
  mounted() {
    // Convert provided timeslots into full-calender format
    this.timeslots.forEach((timeslot) => {
      this.calendarEvents.push({
        title: 'some random event',
        start: moment(timeslot.start_dt).toISOString(),
        end: moment(timeslot.end_dt).toISOString(),
        extendedProps: { id: timeslot.id }
      })
    })
  }
}
</script>

<style lang="scss"></style>
