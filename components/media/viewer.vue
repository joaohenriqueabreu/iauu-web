<template>
  <div>
    <div v-if="!$utils.empty(media)">
      <link-preview :url="media.url">
        <template slot="loading">
          <div class="loading"></div>
        </template>
        <template slot-scope="props">
          <a :href="props.url" class="btn btn-primary" target="_blank">
            <div class="preview">
              <div class="preview-img">
                <div class="network-icon">
                  <avatar :src="networkIcon" :size="30" class="social"> </avatar>
                </div>
                <img :src="props.img" />
              </div>
              <div class="preview-text">{{ props.title }}</div>
            </div>
          </a>
        </template>
      </link-preview>
    </div>
    <div v-else>
      <img class="default" :src="$config.defaultBGImgUrl" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    media: { type: Object, default: () => {} },
    simple: { type: Boolean, default: false },
    avatar: { type: Boolean, default: false },
    removable: { type: Boolean, default: false }
  },
  computed: {
    networkIcon() {
      if (this.isSocialMatch(this.media.url, this.$config.youtubeSubstringMatch)) {
        return require('@/assets/imgs/social/youtube.png')
      }

      if (this.isSocialMatch(this.media.url, this.$config.tiktokSubstringMatch)) {
        return require('@/assets/imgs/social/tiktok.png')
      }

      if (this.isSocialMatch(this.media.url, this.$config.spotifySubstringMatch)) {
        return require('@/assets/imgs/social/spotify.png')
      }

      if (this.isSocialMatch(this.media.url, this.$config.instagramSubstringMatch)) {
        return require('@/assets/imgs/social/instagram.png')
      }

      if (this.isSocialMatch(this.media.url, this.$config.vimeoSubstringMatch)) {
        return require('@/assets/imgs/social/vimeo.png')
      }

      if (this.isSocialMatch(this.media.url, this.$config.facebookSubstringMatch)) {
        return require('@/assets/imgs/social/facebook.png')
      }

      return require('@/assets/imgs/music.png')
    }
  },
  methods: {
    isSocialMatch(url, matches) {
      const hasMatch = matches.filter((match) => {
        return url.includes(match)
      })

      return hasMatch.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.default {
  max-height: 100%;
  max-width: 100%;
}

.simple-container {
  @extend .horizontal, .middle, .full-width;
  border-radius: $rounded;
  padding: $space;
  transition: $transition;

  a {
    max-width: 85%;
  }

  &:hover {
    transition: $transition;
    box-shadow: $shadow;
  }
}
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
      bottom: 5px;
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