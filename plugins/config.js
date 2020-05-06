const config = {
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  timeFormat: 'HH:mm'
}

export default ({ app }, inject) => {
  inject('config', config)
}
