const config = {
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  timeFormat: 'HH:mm',
  alertTimer: 3000,
  closePresentationDeadline: 15,
  defaultBGImgUrl: require('@/assets/imgs/concert.png'),
  defaultAvatarImgUrl: require('@/assets/imgs/music.png'),

  // Substrings to match url pattern and identify social media
  facebookSubstringMatch: 'facebook',
  youtubeSubstringMatch: 'youtu.be',
  vimeoSubstringMatch: 'vimeo',
  instagramSubstringMatch: 'instagram',
  tiktokSubstringMatch: 'vm.tiktok',
  spotifySubstringMatch: 'open.spotify',
  pdfSubstringMatch: 'pdf'
}

export default ({ app }, inject) => {
  inject('config', config)
}
