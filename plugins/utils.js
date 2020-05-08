import pluralize from 'pluralize'

const utils = {
  pluralize: (value, count) => pluralize(value, count),
  genCalendarEventId: (timeslot) => `${timeslot.type}_${timeslot.id}`
}

export default ({ app }, inject) => {
  inject('utils', utils)
}
