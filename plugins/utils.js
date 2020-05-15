import pluralize from 'pluralize'

const utils = {
  pluralize: (value, count) => pluralize(value, count),
  genCalendarEventId: (timeslot) => `${timeslot.type}_${timeslot.id}`,

  isEmpty: (variable) => {
    if (variable === undefined || variable === null) {
      return true
    }

    if (typeof variable === 'number') {
      return variable === 0
    }

    if (typeof variable === 'boolean') {
      return !variable
    }

    if (Array.isArray(variable) || typeof variable === 'string') {
      return variable.length === 0
    }

    if (typeof variable === 'object') {
      for (const key in variable) {
        if (Object.prototype.hasOwnProperty.call(variable, key)) return false
      }

      return true
    }

    return true
  }
}

export default ({ app }, inject) => {
  inject('utils', utils)
}
