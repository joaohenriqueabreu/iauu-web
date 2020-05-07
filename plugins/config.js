const config = {
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  timeFormat: 'HH:mm',
  alertTimer: 3000
}

export default ({ app }, inject) => {
  inject('config', config)
}
