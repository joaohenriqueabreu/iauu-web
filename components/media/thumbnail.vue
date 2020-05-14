<template>
  <div>
    <div v-html="mediaThumb"></div>
  </div>
</template>

<script>
export default {
  props: {
    media: { type: Object, default: () => {} }
  },
  computed: {
    mediaThumb() {
      if (this.mediaSource === 'youtube') {
        return `<img src="https://img.youtube.com/vi/${this.mediaId}/default.jpg">`
      }

      if (this.mediaSource === 'spotify') {
        return `<iframe src="https://open.spotify.com/embed/track/${this.mediaId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
      }

      return ''
    },
    mediaSource() {
      if (this.media.url.includes(this.$config.youtubeSubstringMatch)) {
        return 'youtube'
      }

      if (this.media.url.includes(this.$config.vimeoSubstringMatch)) {
        return 'vimeo'
      }

      if (this.media.url.includes(this.$config.instagramSubstringMatch)) {
        return 'instagram'
      }

      if (this.media.url.includes(this.$config.tiktokSubstringMatch)) {
        return 'tiktok'
      }

      if (this.media.url.includes(this.$config.spotifySubstringMatch)) {
        return 'spotify'
      }

      return ''
    },
    mediaId() {
      return 'g4pQi3XCg7U'
    }
  }
}
</script>

<style></style>
