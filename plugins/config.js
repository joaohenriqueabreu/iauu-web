const config = {
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  timeFormat: 'HH:mm',
  alertTimer: 3000,
  closePresentationDeadline: 15,
  defaultBGImgUrl: require('@/assets/imgs/concert.png'),
  defaultAvatarImgUrl: require('@/assets/imgs/music.png')
}

export default ({ app }, inject) => {
  inject('config', config)
}
