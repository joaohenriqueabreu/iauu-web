<template>
  <div>
    <link-preview :url="media.url">
      <template slot-scope="props">
        <a :href="props.url" class="btn btn-primary" target="_blank">
          <div class="preview">
            <div class="preview-img">
              <div class="network-icon">
                <img :src="networkIcon" class="social" alt="" />
              </div>
              <img :src="props.img" />
            </div>
            <div class="preview-text">{{ props.title }}</div>
          </div>
        </a>
      </template>
    </link-preview>
  </div>
</template>

<script>
export default {
  props: {
    media: { type: Object, default: () => {} }
  },
  computed: {
    networkIcon() {
      if (this.media.url.includes(this.$config.youtubeSubstringMatch)) {
        return require('@/assets/imgs/social/youtube.png')
      }

      if (this.media.url.includes(this.$config.tiktokSubstringMatch)) {
        return require('@/assets/imgs/social/tiktok.png')
      }

      if (this.media.url.includes(this.$config.spotifySubstringMatch)) {
        return require('@/assets/imgs/social/spotify.png')
      }

      if (this.media.url.includes(this.$config.instagramSubstringMatch)) {
        return require('@/assets/imgs/social/instagram.png')
      }

      if (this.media.url.includes(this.$config.vimeoSubstringMatch)) {
        return require('@/assets/imgs/social/vimeo.png')
      }

      return require('@/assets/imgs/music.png')
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  background: transparent;
  outline: none;
  border: none;
  padding: 0;

  &:hover {
    background: transparent;
    outline: none;
    border: none;
  }

  &:focus {
    background: transparent;
    outline: none;
    border: none;
  }
}

.preview {
  @extend .horizontal;
  width: 100%;
  margin-bottom: 4 * $space;
  box-shadow: $shadow;
  position: relative;
  background: $layer4;

  .preview-img {
    position: relative;
    max-height: 100px;
    .network-icon {
      position: absolute;
      top: 5px;
      right: 5px;
      height: 30px;
      width: 30px;
    }
    width: 50%;
    img {
      width: 100%;
      max-height: 100px;
    }
  }

  .preview-text {
    width: 50%;
    padding: 0 2 * $space;
    max-height: 100px;

    text-align: left;
    font-size: $small;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: no-wrap;
  }
}
</style>
